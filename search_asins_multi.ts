import * as fs from 'fs';

async function search(query) {
  try {
    const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`);
    const text = await res.text();
    const matches = [...text.matchAll(/dp\/([A-Z0-9]{10})/g)];
    if (matches.length > 0) {
      console.log(query, matches.map(m => m[1]).join(', '));
    } else {
      console.log(query, 'No ASIN found');
    }
  } catch (e) {
    console.log(query, e.message);
  }
}

async function run() {
  await search('jellycat bird amazon');
  await search('jellycat bug amazon');
  await search('jellycat cat amazon');
  await search('jellycat dinosaur amazon');
}
run();
