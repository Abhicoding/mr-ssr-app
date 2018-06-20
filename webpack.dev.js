const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const nodeExternals = require('webpack-node-externals')

const browserConfig = {
  entry: './src/client/index.js',
  output: {
    path: __dirname,
    filename: './build/bundle.js'
  },
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.jpe?g$/, /\.png$/],
        loader: 'file-loader',
        options: {
          name: 'build/media/[name].[ext]',
          publicPath: url => url.replace(/public/, '')
        }
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {importLoaders: 1}
            },
            {
              loader: 'postcss-loader',
              options: {plugins: [autoprefixer()]}
            }
          ]
        })
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['react']
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'build/css/[name].css'
    })
  ]
}

const serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.jpe?g$/, /\.png$/, /\.ico$/],
        loader: 'file-loader',
        options: {
          name: '../build/media/[name].[ext]',
          publicPath: url => url.replace(/public/, ''),
          emit: false
        }
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'css-loader/locals'
          }
        ]
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {presets: ['react-app']}
      }
    ]
  }

}

module.exports = [browserConfig, serverConfig]
