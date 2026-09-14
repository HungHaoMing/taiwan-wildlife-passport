export class SubmissionError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = 'SubmissionError';
    this.status = status;
  }
}

const pendingSubmissions = new Map();

export function submissionErrorKey(error) {
  if (!(error instanceof SubmissionError) || error.status === 0) return 'submitErrorNetwork';
  return ({ 400: 'submitError400', 409: 'submitError409', 413: 'submitError413', 415: 'submitError415', 422: 'submitError422', 429: 'submitError429', 503: 'submitError503' })[error.status] || 'submitError';
}

async function performSubmission({
  apiBaseUrl,
  endpoint,
  participantId,
  nickname,
  stampCount,
  submittedAt,
  imageBlob,
  idempotencyKey,
  fetchImpl = globalThis.fetch,
}) {
  if (!fetchImpl) throw new SubmissionError('Fetch is not available.');
  const form = new FormData();
  form.append('participantId', participantId);
  form.append('nickname', nickname);
  form.append('stampCount', String(stampCount));
  form.append('submittedAt', submittedAt);
  form.append('image', imageBlob, 'completed-card.jpg');

  let response;
  try {
    response = await fetchImpl(new URL(endpoint, apiBaseUrl), {
      method: 'POST',
      headers: { 'Idempotency-Key': idempotencyKey },
      body: form,
    });
  } catch (error) {
    throw new SubmissionError(error?.message || 'Network request failed.');
  }

  let result = null;
  try { result = await response.json(); } catch { /* Error responses are not guaranteed to be JSON. */ }
  if (!response.ok) throw new SubmissionError(result?.error?.message || `Submission failed (${response.status})`, response.status);
  if (!result?.submissionId || !result?.redemptionCode || result.status !== 'pending') {
    throw new SubmissionError('The server returned an invalid submission response.', response.status);
  }
  return result;
}

export function submitStampCard(options) {
  const requestKey = `${new URL(options.endpoint, options.apiBaseUrl)}\n${options.participantId}\n${options.idempotencyKey}`;
  const pending = pendingSubmissions.get(requestKey);
  if (pending) return pending;
  const request = performSubmission(options).finally(() => pendingSubmissions.delete(requestKey));
  pendingSubmissions.set(requestKey, request);
  return request;
}
