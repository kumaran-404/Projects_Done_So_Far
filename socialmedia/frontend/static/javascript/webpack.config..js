var path = require("path");

module.exports = {
  watch: true,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "static/javascript"),
    filename: "main.js",
    assetModuleFilename: "[name].[ext]"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }]
    }, {
      test: /\.(jpeg|jpg|png|gif|svg)$/i,
      type: 'asset/resource',
      loader: "file-loader",
      options: {
        outputPath: "../images",
        name: "[name].[ext]"
      }
    }]
  }
};