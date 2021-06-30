const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: {
    app: ['./app.js'],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'app.js',
  },
  externals: [nodeExternals()],
  mode: 'production'
};