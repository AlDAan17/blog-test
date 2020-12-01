async function request(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok && response.status !== 422) {
    throw new Error(`Could not fetch ${url}. Status: ${response.status}`);
  }
  const body = await response.json();
  return body;
}

export default request;