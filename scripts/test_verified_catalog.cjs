const https = require('https');
const http = require('http');
const { VERIFIED_LINKS } = require('./verified_links_catalog.cjs');

function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      resolve({ url, status: res.statusCode, location: res.headers.location });
    });
    req.on('error', (err) => resolve({ url, error: err.message }));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve({ url, error: 'Timeout' });
    });
  });
}

async function run() {
  const entries = Object.entries(VERIFIED_LINKS);
  console.log(`Testing ${entries.length} verified links...`);
  let errors = 0;
  for (const [key, item] of entries) {
    const res = await checkUrl(item.url);
    const ok = res.status >= 200 && res.status < 400;
    if (!ok) {
      errors++;
      console.error(`FAIL: [${key}] -> ${item.url} (${res.status || res.error})`);
    } else {
      console.log(`OK (${res.status}): [${key}] -> ${item.url}`);
    }
  }
  console.log(`\nFinished testing. ${entries.length - errors}/${entries.length} passed.`);
  if (errors > 0) process.exit(1);
}

run();
