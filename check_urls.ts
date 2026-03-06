const urls = [
  'https://www.jellycat.com/images/products/large/BAS3B.jpg',
  'https://www.jellycat.com/images/products/large/RRW3F.jpg',
  'https://www.jellycat.com/images/products/large/A2CRO.jpg',
  'https://www.jellycat.com/images/products/large/OD2OC.jpg',
  'https://www.jellycat.com/images/products/large/BAR2BR.jpg',
  'https://www.jellycat.com/images/products/large/A2CL.jpg'
];

async function check() {
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(url, res.status);
    } catch (e) {
      console.log(url, e.message);
    }
  }
}
check();
