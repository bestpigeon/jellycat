import * as fs from 'fs';

async function search(query) {
  try {
    const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`);
    const text = await res.text();
    const matches = [...text.matchAll(/<a class="result__url" href="([^"]+)">([^<]+)<\/a>/g)];
    for (const match of matches) {
      console.log(match[2].trim(), match[1]);
    }
  } catch (e) {
    console.log(query, e.message);
  }
}
search('site:us.jellycat.com/animals');
