const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  mode: process.env.NODE_ENV,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    // chunkFileName: '[id].chunk.js'
  },
  devServer: {
    publicPath: path.resolve(__dirname, '/build/'),
    compress: true,
    port: 8080,
    proxy: {
      '/signup': 'http://localhost:3000', // any front end element which fetches from express needs to be rerouted. it will by default try to fetch to 8080.
      '/login': 'http://localhost:3000', // any front end element which fetches from express needs to be rerouted. it will by default try to fetch to 8080.
      '/user/signin/callback': 'http://localhost:3000',
      '/user/': 'http://localhost:3000',
      '/login-with-facebook': 'http://localhost:3000'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'CLIENT_ID': JSON.stringify(process.env.CLIENT_ID)
    })
  ]
};