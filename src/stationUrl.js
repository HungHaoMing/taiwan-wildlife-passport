export function stationUrl(baseUrl, animal) {
  const url = new URL(baseUrl);
  url.search = '';
  url.hash = '';
  url.searchParams.set('stamp', animal.id);
  url.searchParams.set('token', animal.token);
  return url.href;
}
