# Webpack 4 Basics

## Builds

- Build with `npm run build`
- `cd` into `dist` folder, run `serve -l 8080` to run on port 8080

## Dev Server

- Run with `npm run serve`, `npm run start`, `npm run dev`, `start:dev` or whatever you're used to

## Dev Dependencies

- @babel/core
- @babel/preset-env
- @babel/preset-react
- babel-loader
- css-loader
- html-webpack-plugin
- style-loader
- url-loader
- webpack
- webpack-cli
- webpack-dev-server
- uglifyjs-webpack-plugin

## Dependencies

- jquery@latest // yes, jQuery...
- react
- react-dom

## Project structure

### <root>

- Webpack config, .gitignore, node_modules, linters, build pipelines, editor config

### src

- for JS, preprocessed CSS

### dist

- Output builds of all HTML, CSS, JS, assets

### public

- Index html files, images, fonts

## Setup

### public/index.html

- Add a script tag for bundler to populate

\*\* This is not neededl with HtmlWebpackPlugin if flip `inject` to `true`...

```html
<script src="bundle.js"></script>
```

## Running Webpack

1. Globally
   `npm install -g webpack`

2. Locally
   A. From commandline, run './node_modules/.bin/webpack'

B. From commandline, run `npx webpack`

C. In package.json, can use a script

```
  "build": "./node_modules/.bin/webpack"
```

## package.json setup

- Remove `"main": "index.js"`
- Add `"private": true,`

## Webpack Defaults

NOTE - without a .webpackrc file, webpack will build a dist folder and main.js file

## Webpack Configuration

- webpack.config.js
  ** entry - entry/entries to the application
  ** mode - specify development, production
  ** output - place to output files, `/dist`
  ** module - add rules for transpiling ES6, React
  ** optimization -
  ** devServer - run project locally
  ** resolve - to allow imports without webpack barking
  ** plugins - for thing like handling index.html template

## Webpack Flags

- --verbose
- --progress
- --watch -w

## [Webpack Loaders](https://webpack.js.org/loaders/)

- Transform files
- Load files, images, assets
- Transpiling Sass, JSX, ES+

## CSS Loaders

- style-loader
- css-loader

## URL Loader for images

- url-loader // inlines an image to be an image bundle, returns from require

### Used Loaders in this Project

- babel-loader
- @babel/core
- @babel/preset-env
- @babel/preset-react

## Webpack Plugins

## - HtmlWebpackPlugins

```
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true, // injects the bundle.js file in this index output
      template: './public/index.html',
      minify: {
        collapseWhitespace: false,
      },
    }),
  ]
```

## Serving from /dist folder

- install serve package globally with `npm install -g serve`
- `cd dist` and `serve -l 8080`
- View contents of dist folder at `localhost:8080`

## Code Splitting

- Possible with multiple entry points
- Possible for vendor and app bundles

### multiple entries

```js
  /// define multiple entries and their entry js files
  entry: {
    index: "./src/index.js",
    about: "./src/about.js",
    contact: "./src/contact.js",
  },
  // Define output bundle with [name] of that entry
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
```

### injecting that entry js

```js
// define one HtmlWebpackPlugin per entry point for injection
plogins: [
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
];
```

- NOTE - HtmlWebpackPlugin can generate an html file, but missing some things like viewport metatag or any custom tags needed in a project

## Optimizing with Split Chunks

- Looks for any repeated code between bundles and creates a vendor bundle `about~contact~index.bundle.js` and `vendors~about~contact~index.bundle.js`

```js
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
```

Injects this into HTML:

```html
  // Example - about.html
  <script src="vendors~about~contact~index.bundle.js"></script>
  <script src="about~contact~index.bundle.js"></script>
  <script src="about.bundle.js"></script></body>
```

## Prepping for Production

- Use `uglifyjs-webpack-plugin` in `optimization`

```js
...
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
...
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    minimizer: [new UglifyJsPlugin()],
    nodeEnv: "production",
  },
```
