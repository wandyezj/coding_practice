const path = require('path');

module.exports = {
  entry: './out/index.js',
  target: 'node',
  output: {
    filename: './dist/main.js',
    path: path.resolve(__dirname, 'out')
  },
  mode:"production"
};