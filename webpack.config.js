const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  // entry can be string or object
  // entry: "./src/index.js",
  entry: {
    index: "./src/index.js",
    about: "./src/about.js",
    contact: "./src/contact.js",
  },
  mode: "production",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    minimizer: [new UglifyJsPlugin()],
    nodeEnv: "production",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist/"),
    port: 3000,
    publicPath: "http://localhost:3000",
    hotOnly: true,
  },
  // Allow imports of .jsx files to other .jsx files
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // test: /\.(js|jsx)$/, // same as line bove
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{ loader: "url-loader" }],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["index"],
      inject: true, // injects the bundle.js file in this index output
      template: "./public/index.html",
      minify: {
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      filename: "contact.html",
      chunks: ["contact"],
      inject: true, // injects the bundle.js file in this index output
      template: "./public/contact.html",
      minify: {
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      chunks: ["about"],
      inject: true, // injects the bundle.js file in this index output
      template: "./public/about.html",
      minify: {
        collapseWhitespace: false,
      },
    }),
  ],
};
