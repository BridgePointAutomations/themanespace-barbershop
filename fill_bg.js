const Jimp = require('jimp');

async function processImage(filename) {
  const image = await Jimp.read(filename);
  const bg = new Jimp(image.bitmap.width, image.bitmap.height, 0xF5F5F4FF);
  bg.composite(image, 0, 0);
  await bg.writeAsync(filename);
}

async function main() {
  await processImage('public/favicon.png');
  await processImage('public/logo-preview.png');
  console.log('Done!');
}
main().catch(console.error);
