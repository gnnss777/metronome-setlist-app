# Ícones SVG

Este diretório contém os ícones SVG para o PWA.

Para converter SVGs para PNGs:
```bash
npm install -g @svgr/cli
npm install -g sharp

# Converter 192x192
npx @svgr/cli --out-dir public --replace-attr-values "fill=%231a1a1a" --template @svgr/plugin-svgo icon-192.svg

# Converter 512x512
npx @svgr/cli --out-dir public --replace-attr-values "fill=%231a1a1a" --template @svgr/plugin-svgo icon-512.svg
```

Ou usando ImageMagick:
```bash
convert icon-192.svg -resize 192x192 icon-192.png
convert icon-512.svg -resize 512x512 icon-512.png
```
