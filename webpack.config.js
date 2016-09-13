var path = require('path');

module.exports = {
  entry: './_src/core/main.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  resolve: {
    root: path.resolve('./_src')
  },
};

