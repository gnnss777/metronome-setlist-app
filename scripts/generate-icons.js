const fs = require('fs');
const path = require('path');

const sizes = [192, 512];

console.log('Geração de ícones base64 para PWA...\n');

const generateIcons = () => {
  const icon192Base64 = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOTIgMTkyIj4KICA8cmVjdCB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgcm9sZT0icGF0aCIgZmlsbD0iIzFhMWEyYSIvPgogIDx0ZXh0IHg9IjE5MiIgeT0iMjQwIiB4LTF4PSI1IiB5MTE1PSIxMTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4MCIgZmlsbD0iI2ZmNmI2YiIgZm9udC13ZWlnaHQ9ImJvbGQiPuKNiTwvdGV4dD4KPC9zdmc+";

  const icon512Base64 = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICA8cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgcm9sZT0icGF0aCIgZmlsbD0iIzFhMWEyYSIvPgogIDx0ZXh0IHg9IjUxMiIgeT0iMTMwIiB4LTF4PSI1IiB5MTE1PSIxMzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNDAiIGZpbGw9IiNmZjZiNmIiIGZvbnQtd2VpZ2h0PSJib2xkIi8+PC9zdmc+";

  console.log('Ícones gerados com sucesso!\n');
  console.log('Para usar, baixe os arquivos SVG do diretório public/ ou use o arquivo SVG direto no manifest.\n');

  return { icon192: icon192Base64, icon512: icon512Base64 };
};

module.exports = { generateIcons };
