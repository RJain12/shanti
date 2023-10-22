const path = require('path');

module.exports = {
  entry: './src/site/stability.js',
  output: {
    filename: 'stability.js',
    path: path.resolve(__dirname, 'dist'),
  },
};