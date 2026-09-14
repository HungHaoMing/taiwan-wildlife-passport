import { describe, expect, it, vi } from 'vitest';
import { SubmissionError, submissionErrorKey, submitStampCard } from '../src/submission.js';

const input = {
  apiBaseUrl: 'https://stamp-api.bbqhung.org',
  endpoint: '/api/v1/submissions',
  participantId: 'participant:550e8400-e29b-41d4-a716-446655440000',
  nickname: '測試者',
  stampCount: 5,
  submittedAt: '2026-09-14T16:30:00+08:00',
  imageBlob: new Blob(['image'], { type: 'image/jpeg' }),
  idempotencyKey: 'submission:550e8400-e29b-41d4-a716-446655440001',
};

describe('submission API client', () => {
  it('sends the documented multipart fields without setting Content-Type', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true, status: 201,
      json: async () => ({ submissionId: '550e8400-e29b-41d4-a716-446655440002', redemptionCode: '7K3M9Q', status: 'pending', updated: false }),
    });
    const result = await submitStampCard({ ...input, fetchImpl });
    expect(result.redemptionCode).toBe('7K3M9Q');
    const [url, options] = fetchImpl.mock.calls[0];
    expect(String(url)).toBe('https://stamp-api.bbqhung.org/api/v1/submissions');
    expect(options.method).toBe('POST');
    expect(options.headers).toEqual({ 'Idempotency-Key': input.idempotencyKey });
    expect(options.headers['Content-Type']).toBeUndefined();
    expect(options.body).toBeInstanceOf(FormData);
    expect(options.body.get('participantId')).toBe(input.participantId);
    expect(options.body.get('nickname')).toBe(input.nickname);
    expect(options.body.get('stampCount')).toBe('5');
    expect(options.body.get('submittedAt')).toBe(input.submittedAt);
    expect(options.body.get('image')).toBeInstanceOf(Blob);
  });

  it('preserves an HTTP error status for localized UI handling', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 429, json: async () => ({ error: { message: 'slow down' } }) });
    await expect(submitStampCard({ ...input, fetchImpl })).rejects.toMatchObject({ name: 'SubmissionError', status: 429, message: 'slow down' });
  });

  it.each([
    [400, 'submitError400'], [409, 'submitError409'], [413, 'submitError413'], [415, 'submitError415'],
    [422, 'submitError422'], [429, 'submitError429'], [503, 'submitError503'], [500, 'submitError'],
  ])('maps HTTP %i to the matching participant message', (status, key) => {
    expect(submissionErrorKey(new SubmissionError('failed', status))).toBe(key);
  });

  it('maps network failures to the retryable network message', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new TypeError('offline'));
    await expect(submitStampCard({ ...input, idempotencyKey: `${input.idempotencyKey}-network`, fetchImpl })).rejects.toMatchObject({ status: 0 });
    expect(submissionErrorKey(new SubmissionError('offline'))).toBe('submitErrorNetwork');
  });

  it('coalesces simultaneous clicks for the same idempotency key into one request', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true, status: 201,
      json: async () => ({ submissionId: '550e8400-e29b-41d4-a716-446655440002', redemptionCode: '7K3M9Q', status: 'pending', updated: false }),
    });
    await Promise.all([submitStampCard({ ...input, fetchImpl }), submitStampCard({ ...input, fetchImpl })]);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('rejects malformed successful responses', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 201, json: async () => ({ status: 'pending' }) });
    await expect(submitStampCard({ ...input, fetchImpl })).rejects.toBeInstanceOf(SubmissionError);
  });
});
