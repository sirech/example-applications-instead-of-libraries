const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin
const { DefinePlugin, EnvironmentPlugin } = webpack
const path = require('path')
const deps = require('./package.json').dependencies

module.exports = (env, argv) => {
  return {
    entry: './src/index',
    mode: 'development',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 3001,
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
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      new ModuleFederationPlugin({
        name: 'host',
        shared: [
          {
            react: { requiredVersion: deps.react, singleton: true },
            'react-dom': {
              requiredVersion: deps['react-dom'],
              singleton: true,
            },
            '@applications-instead-of-libraries/shared-library': {
              import: '@applications-instead-of-libraries/shared-library',
              requiredVersion: require('../shared-library/package.json')
                .version,
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
        OBJECTS_ORIGIN: argv['objects-origin'] ?? false,
      }),
    ],
    optimization: {
      runtimeChunk: {},
    },
  }
}
