import * as fs from 'fs';

async function search(query) {
  try {
    const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`);
    const text = await res.text();
    const match = text.match(/dp\/([A-Z0-9]{10})/);
    if (match) {
      console.log(query, match[1]);
    } else {
      console.log(query, 'No ASIN found');
    }
  } catch (e) {
    console.log(query, e.message);
  }
}

async function run() {
  await search('jellycat kitten amazon');
}
run();
