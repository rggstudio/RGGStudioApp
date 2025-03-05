const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const optimizeImage = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .resize(1000, 500, {
        fit: 'cover',
        position: 'top'
      })
      .webp({ quality: 90 })
      .toFile(outputPath);
    
    console.log(`✓ Optimized: ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`✗ Error optimizing ${path.basename(inputPath)}:`, error.message);
  }
};

const processImages = async () => {
  // List of project images to optimize
  const images = [
    'portwatch-1', 'portwatch-2',
    'licdsf-1', 'licdsf-2',
    'climate-1',
    'sdg-1', 'sdg-2',
    'sme-1', 'sme-2',
    'pima-1', 'pima-2',
    'covid-1', 'covid-2',
    'lang-1', 'lang-2'
  ];

  for (const image of images) {
    const inputPath = path.join(inputDir, `${image}.png`);
    const outputPath = path.join(outputDir, `${image}.webp`);

    // Check if source image exists
    if (fs.existsSync(inputPath)) {
      await optimizeImage(inputPath, outputPath);
    } else {
      console.error(`✗ Source image not found: ${image}.png`);
    }
  }
};

processImages().catch(console.error); 