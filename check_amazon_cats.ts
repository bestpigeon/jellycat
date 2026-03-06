const asins = {
  'Amphibians & Reptiles': 'B09RN4YCXG',
  'Birds': 'B0D4C7W885',
  'Bugs & Insects': 'B09QQJ9LMT',
  'Cats & Kittens': 'B098BPSR1V',
  'Dinosaurs': 'B08C56T28C',
  'Dogs & Puppies': 'B08L1FHQ31',
  'Farmyard': 'B0GGZ173VT',
  'Jungle & Safari': 'B0BW7C6F26',
  'Ocean': 'B01MS7CYPT',
  'Pets': 'B00163U4LK',
  'Woodland Animals': 'B00B5FEBEA',
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
