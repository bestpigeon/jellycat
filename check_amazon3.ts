const asins = {
  'B00163U4LK': 'Bashful Bunny',
  'B09RN4YCXG': 'Ricky Rain Frog',
  'B0866XSSM9': 'Amuseable Croissant',
  'B01MS7CYPT': 'Odell Octopus',
  'B00B5FEBEA': 'Bartholomew Bear',
  'B07GPFJL3P': 'Amuseable Cloud'
};

async function check() {
  for (const [asin, name] of Object.entries(asins)) {
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
