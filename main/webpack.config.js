const webpack = require('webpack');
const path = require('path');

const outputPath = path.join(__dirname, './app', 'shell');

module.exports = {
  mode: 'development',
  target: 'electron-main',
  entry: {
    index: './index.js',
  },
  output: {
    path: outputPath,
    filename: '[name].js',
  },
  externals(context, request, callback) {
    callback(null, request.charAt(0) === '.' ? false : `require("${request}")`);
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      $dirname: '__dirname',
    })
  ],
};