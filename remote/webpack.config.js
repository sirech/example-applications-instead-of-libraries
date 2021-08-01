const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin
const { EnvironmentPlugin } = webpack
const path = require('path')
const deps = require('./package.json').dependencies

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3002,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './Welcome': './src/Welcome',
        './WelcomeFrame': './src/WelcomeFrame',
      },
      shared: [
        {
          react: { requiredVersion: deps.react, singleton: true },
          'react-dom': { requiredVersion: deps['react-dom'], singleton: true },
          '@applications-instead-of-libraries/shared-library': {
            import: '@applications-instead-of-libraries/shared-library',
            requiredVersion: require('../shared-library/package.json').version,
          },
          '@material-ui/core': {
            requiredVersion: deps['@material-ui/core'],
            singleton: true,
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new EnvironmentPlugin({
      OBJECTS_ORIGIN: 'http://localhost:3002',
    }),
  ],
}
