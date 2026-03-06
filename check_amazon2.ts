const asins = [
  'B00163U4LK',
  'B09RN4YCXG',
  'B0866XSSM9',
  'B01MS7CYPT',
  'B00B5FEBEA',
  'B07GPFJL3P'
];

async function check() {
  for (const asin of asins) {
    const url = `https://m.media-amazon.com/images/P/${asin}.01._SCRM_.jpg`;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(url, res.status, res.headers.get('content-type'));
    } catch (e) {
      console.log(url, e.message);
    }
  }
}
check();
