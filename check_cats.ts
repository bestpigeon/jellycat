async function check() {
  const categories = [
    'amphibians-reptiles',
    'birds',
    'bugs-insects',
    'cats-kittens',
    'dinosaurs',
    'dogs-puppies',
    'farmyard',
    'jungle-safari',
    'ocean',
    'pets',
    'woodland-animals'
  ];
  for (const cat of categories) {
    const url = `https://us.jellycat.com/animals/${cat}/`;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(url, res.status);
    } catch (e) {
      console.log(url, e.message);
    }
  }
}
check();
