const asins = {
  'Birds': 'B0D4C7W885',
  'Bugs & Insects': 'B09QQJ9LMT',
  'Cats & Kittens': 'B098BPSR1V',
  'Dinosaurs': 'B08C56T28C',
};

async function check() {
  for (const [name, asin] of Object.entries(asins)) {
    const url = `https://m.media-amazon.com/images/P/${asin}.01._SCRM_.jpg`;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(name, url, res.status, res.headers.get('content-type'));
    } catch (e) {
      console.log(name, url, e.message);
    }
  }
}
check();
