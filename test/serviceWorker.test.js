import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../public/sw.js', import.meta.url), 'utf8');

describe('service worker update policy', () => {
  it('uses a new cache generation and removes caches from older deployments', () => {
    expect(source).toContain("const CACHE_PREFIX = '2026-tie-point-card-'");
    expect(source).toContain('const CACHE = `${CACHE_PREFIX}v2`');
    expect(source).toContain('key.startsWith(CACHE_PREFIX)');
    expect(source).toContain('key !== CACHE');
    expect(source).toContain('caches.delete(key)');
  });

  it('fetches navigations before falling back to the cached app shell', () => {
    const navigationStart = source.indexOf("event.request.mode === 'navigate'");
    const navigationResponse = source.indexOf('event.respondWith((async () => {', navigationStart);
    const assetResponse = source.indexOf('event.respondWith((async () => {', navigationResponse + 1);
    const navigationPolicy = source.slice(navigationStart, assetResponse);
    expect(navigationPolicy.indexOf('await fetch(event.request)')).toBeGreaterThan(-1);
    expect(navigationPolicy.indexOf("cache.match('./index.html')")).toBeGreaterThan(navigationPolicy.indexOf('await fetch(event.request)'));
  });

  it('does not return the HTML app shell for a missing static asset', () => {
    const assetPolicy = source.slice(source.lastIndexOf('event.respondWith((async () => {'));
    expect(assetPolicy).not.toContain("cache.match('./index.html')");
    expect(assetPolicy).toContain('Response.error()');
  });
});
