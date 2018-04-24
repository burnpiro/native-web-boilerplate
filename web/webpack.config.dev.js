const path = require('path');
const paths = require('../config/paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: [
    require.resolve('./polyfills'),
    paths.appIndexJs
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: paths.appBuild
  },
  plugins: [
    new CleanWebpackPlugin(['build/web']),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      // ** ADDING/UPDATING LOADERS **
      // The "url" loader handles all assets unless explicitly excluded.
      // The `exclude` list *must* be updated with every change to loader extensions.
      // When adding a new loader, you must add its `test`
      // as a new entry in the `exclude` list in the "url" loader.

      // First, run the linter.
      // It's important to do this before Babel processes the JS.

      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: paths.appSrc
      },
      // "url" loader embeds assets smaller than specified size as data URLs to avoid requests.
      // Otherwise, it acts like the "file" loader.
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        include: [
          paths.appSrc,
          path.resolve(paths.appNodeModules, 'native-base-shoutem-theme'),
          path.resolve(paths.appNodeModules, 'react-navigation'),
          path.resolve(paths.appNodeModules, 'react-native-easy-grid'),
          path.resolve(paths.appNodeModules, 'react-native-drawer'),
          path.resolve(paths.appNodeModules, 'react-native-safe-area-view'),
          path.resolve(paths.appNodeModules, 'react-native-vector-icons'),
          path.resolve(
            paths.appNodeModules,
            'react-native-keyboard-aware-scroll-view'
          ),
          path.resolve(paths.appNodeModules, 'react-native-web'),
          path.resolve(paths.appNodeModules, 'react-native-tab-view'),
          path.resolve(paths.appNodeModules, 'static-container')
        ],
        loader: 'babel-loader',

      },
      // The notation here is somewhat confusing.
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader normally turns CSS into JS modules injecting <style>,
      // but unlike in development configuration, we do something different.
      // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
      // (second argument), then grabs the result CSS and puts it into a
      // separate file in our build process. This way we actually ship
      // a single CSS file in production instead of JS code injecting <style>
      // tags. If you use code splitting, however, any async bundles will still
      // use the "style" loader inside the async code so CSS from them won't be
      // in the main CSS file.
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      },
      // JSON is not enabled by default in Webpack but both Node and Browserify
      // allow it implicitly so we also enable it.
      // {
      //   test: /\.json$/,
      //   loader: 'json'
      // },
      // "file" loader for svg
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
      // ** STOP ** Are you adding a new loader?
      // Remember to add the new extension(s) to the "url" loader exclusion list.
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: paths.appBuild
  },
  resolve: {
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native/Libraries/Renderer/shims/ReactNativePropRegistry': 'react-native-web/dist/modules/ReactNativePropRegistry',
      'react-native': 'react-native-web'
    }
  }
}