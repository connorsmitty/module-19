const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Add and configure workbox plugins for a service worker and manifest file.
const workboxConfig = {
  swSrc: './src/sw.js',
  swDest: 'sw.js',
  include: [/\.js$/, /\.css$/],
  exclude: [/node_modules/],
  runtimeCaching: [
    {
      urlPattern: /\/api\//,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24,
        },
      },
    },
  ],
};

// Add CSS loaders and babel to webpack.
const cssLoaders = [
  'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [require('autoprefixer')],
    },
  },
];

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env'],
  },
};

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/index.js',
    install: './src/js/install.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new WebpackPwaManifest({
      name: 'My Progressive Web App',
      short_name: 'MyPWA',
      description: 'A progressive web app built with webpack',
      background_color: '#ffffff',
      theme_color: '#000000',
      icons: [
        {
          src: path.resolve('src/assets/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
    new InjectManifest(workboxConfig),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: babelLoader,
      },
    ],
  },
};