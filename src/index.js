import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import {fileTypeFromBuffer} from 'file-type';

import {
  assetsFolderPath,
  exportedFileQuality, 
  containerHeight, 
  containerWidth,
  columns,
  htmlFile,
  jpegFile,
  gridGap,
  randomizePics, 
  saveCollageToFile 
  } from './config.js';
  
function repeatImages(images, targetCount) {
  const repeatedImages = [];
  while (repeatedImages.length < targetCount) {
    repeatedImages.push(...images);
  }
  return repeatedImages.slice(0, targetCount);
}

function randomizeOrder(images) {
  return images.sort(() => Math.random() - 0.5);
}

async function generateCollage(assetsFolderPath, targetColumns, containerWidth, containerHeight, randomizePics, enablePuppeteer) {
  try {
    let files = fs.readdirSync(assetsFolderPath);
    let images = [];
    for (let file of files) {
      const filePath = path.join(assetsFolderPath, file);
      const buffer = fs.readFileSync(filePath);
      const type = await fileTypeFromBuffer(buffer);
      if (type && type.mime.startsWith('image/')) {
        images.push(file);
      }
    }
    if (randomizePics) {
      images = randomizeOrder(images);
    }

    const imageSize = containerWidth / targetColumns;
    console.log(`Calculated tile size: ${imageSize}px`)
    const rowCount = Math.ceil(containerHeight / imageSize);
    console.log(`Calculated number of rows: ${rowCount}`)
    const targetCount = targetColumns * rowCount;
    console.log(`Calculated target count: ${targetCount}`)

    const repeatedImages = images.length >= targetCount ? images : repeatImages(images, targetCount);

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Image Collage</title>
        <style>
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, ${imageSize}px);
            grid-auto-rows: ${imageSize}px;
            gap: ${gridGap};
            width: ${containerWidth}px;
            height: ${containerHeight}px;
            margin: 0 auto;
          }
          .grid img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        </style>
      </head>
      <body>
        <div class="grid">
        ${repeatedImages.map(image => `<img src="${path.join(assetsFolderPath, image)}" alt="${image}">`).join('')}
        </div>
      </body>
      </html>
    `;

    fs.writeFileSync(htmlFile, html);

    if (enablePuppeteer) {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`file://${path.join(process.cwd(), htmlFile)}`); // navigate to the page
      const element = await page.$('.grid'); // get the element
      await element.screenshot({path: jpegFile, type: 'jpeg', quality: exportedFileQuality, omitBackground: false});    await browser.close();
    }
  } catch (error) {
    console.error(`Failed to generate collage: ${error}`);
  }
}

generateCollage(assetsFolderPath, columns, containerWidth, containerHeight, randomizePics, saveCollageToFile);
