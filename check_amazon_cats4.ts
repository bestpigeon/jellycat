const asins = {
  'Birds': 'B07P7N7Y5L',
  'Bugs & Insects': 'B09QQJ9LMT',
  'Cats & Kittens': 'B07B4V9W4R', // Jellycat Fuddlewuddle Cat? Let's try B00163U4LK is bunny. Let's try B01N0P1N17 for dino.
  'Dinosaurs': 'B01N0P1N17',
};

async function check() {
  for (const [name, asin] of Object.entries(asins)) {
    try {
      const res = await fetch(`https://www.amazon.com/dp/${asin}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        }
      });
      const text = await res.text();
      const match = text.match(/"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+\.jpg)"/);
      if (match) {
        console.log(name, match[1]);
      } else {
        console.log(name, 'No match');
      }
    } catch (e) {
      console.log(name, e.message);
    }
  }
}
check();
