async function search(query) {
  try {
    const res = await fetch(`https://duckduckgo.com/?q=${encodeURIComponent(query)}&t=h_&iax=images&ia=images`);
    const text = await res.text();
    const vqdMatch = text.match(/vqd=([\d-]+)/);
    if (!vqdMatch) return console.log(query, 'No vqd');
    const vqd = vqdMatch[1];
    
    const imgRes = await fetch(`https://duckduckgo.com/i.js?q=${encodeURIComponent(query)}&o=json&vqd=${vqd}`);
    const imgJson = await imgRes.json();
    console.log(query, imgJson.results[0].image);
  } catch (e) {
    console.log(query, e.message);
  }
}

async function run() {
  await search('jellycat bird');
  await search('jellycat bug');
  await search('jellycat cat');
  await search('jellycat dinosaur');
}
run();
