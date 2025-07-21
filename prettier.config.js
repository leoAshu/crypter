const path = require('path');

module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 120,
  jsxSingleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: path.resolve(__dirname, 'apps/frontend/tailwind.config.js'),
};
