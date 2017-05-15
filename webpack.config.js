var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = function makeWebpackConfig() {
  var config = {};

  config.devtool = 'eval';

  config.entry = './src/index';

  config.output = {
    path: __dirname + '/dist/',
    filename: 'bundle.js'
  };

  config.resolve = {
    extensions: ['', '.js', '.jsx', '.css']
  };

  config.module = {
    loaders: [
      // Support for .jsx files
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },

      // support for .scss files
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass'
      },

      // Support for .css files
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
      },

      // copy those assets to output
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=fonts/[name].[hash].[ext]?'
      }
    ]
  };
  config.postcss = [
    autoprefixer({
      browsers: ['last 2 version', '> 1%', 'IE > 8']
    })
  ];
  config.devServer = {
    contentBase: './src',
    historyApiFallback: true,
    port: 8080,
    stats: 'minimal'
  };

  return config;
}();
