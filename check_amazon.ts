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
    const url = `https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${asin}&Format=_SL500_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1`;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(asin, res.status, res.headers.get('content-type'));
    } catch (e) {
      console.log(asin, e.message);
    }
  }
}
check();
