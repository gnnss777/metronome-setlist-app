#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const sizes = [192, 512];

console.log('Convertendo ícones SVG para PNG...\n');

// Check if sharp is available
const sharp = require('sharp');

sizes.forEach(size => {
  const svgPath = path.join(__dirname, '..', 'public', `icon-${size}.svg`);
  const pngPath = path.join(__dirname, '..', 'public', `icon-${size}.png`);

  try {
    // Read SVG file
    const svgContent = fs.readFileSync(svgPath, 'utf-8');

    // Create SVG with specific size
    const svgWithSize = svgContent.replace(
      /<svg[^>]*>/,
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">`
    );

    // Convert SVG to PNG using sharp
    sharp(Buffer.from(svgWithSize))
      .png()
      .toFile(pngPath, (err) => {
        if (err) {
          console.error(`Erro ao criar ícone ${size}x${size} PNG:`, err.message);
          console.log(`Por favor instale sharp: npm install sharp`);
        } else {
          console.log(`✓ Criado ícone PNG ${size}x${size}`);
        }
      });
  } catch (error) {
    console.error(`Erro: ${error.message}`);
    console.log(`Por favor instale sharp: npm install sharp`);
  }
});

console.log('\nInstale sharp para converter ícones: npm install sharp`);
