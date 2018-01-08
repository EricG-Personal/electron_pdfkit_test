var webpack = require('webpack');
var path = require( 'path' );

var ROOT_PATH = path.resolve( __dirname );

module.exports = {
  target: 'electron',

  entry: {
    app: [ './javascripts/entry.js' ]
  },

  output: {
    path:     path.resolve( ROOT_PATH + 'build' ),
    filename: 'bundle.js',
  },

  devtool: 'eval-source-map',

  devServer: {
    contentBase: './public',
  },

  module: {

    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      { test:   /\.json$/, loader: 'json-loader' },
      {
        // These are all pdfkit-related packages that need to be ran through browserify:
        test: /node_modules\/(pdfkit|unicode-properties|fontkit|png-js|linebreak|unicode-properties|brotli)\//,
        loader: 'transform-loader?brfs',
      }
    ]
  },

  plugins: [
  ]
}
