var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new ExtractTextPlugin("styles.css", {
		// 	disable: false,
		// 	allChunks: true
		// })
  ],
  module: {
    loaders: [
    {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.scss$/,
      //loader: ExtractTextPlugin.extract('css!sass')
      loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      //ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader")]

    },
    {
      test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
      loader: 'url-loader?limit=100000'
    },
    {
      test: /\.svg$/,
      loaders: ['svg-inline']
    }]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ]
};