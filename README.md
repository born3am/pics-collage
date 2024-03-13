# Image Collage Generator

This is a Node.js application that generates an image collage from a set of images and optionally saves the collage as a JPEG file using Puppeteer.

## Pre-requisites

- Node.js installed on your machine
- Images you want to include in the collage

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.

## Configuration

The configuration options for the collage are located in `src/config.js`. You can modify the following options:

- `containerWidth`: The width of the collage container in pixels (default is 1200).
- `containerHeight`: The height of the collage container in pixels (default is 800).
- `htmlFile`: The name of the HTML file to generate (default is 'collage.html').
- `jpegFile`: The name of the JPEG file to generate (default is 'collage.jpeg').
- `picsToDisplay`: The number of pictures to display in the collage (default is 638).
- `assetsFolderPath`: The path to the folder containing the images (default is './src/assets').
- `gridGap`: The gap between images in the collage (default is '2px').
- `randomizePics`: Whether to randomize the order of the images (default is true).
- `saveCollageToFile`: Whether to save the collage as a JPEG file (default is true).
- `exportedFileQuality`: The quality of the exported file. This option only applies if the exported file is in JPEG format. It's a value between 0 and 100. The higher the value, the better the image quality and the larger the file size (default is 100).

## Usage

To generate the collage, run the following command in the terminal:

```bash
npm run start
```

## Output

After running the script, you will find two output files in the project directory:

- `collage.html`: This is an HTML file that displays the image collage in your web browser. You can open this file directly in any web browser to view the collage.

- `collage.jpeg`: This is a JPEG file of the image collage. This file is only generated if `saveCollageToFile` is set to `true` in `config.js`. You can open this file in any image viewer to view the collage.

![Collage Image](collage.jpeg)

Please note that the output files will overwrite any existing files with the same names in the project directory.