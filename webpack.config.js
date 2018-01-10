var webpack = require('webpack');
var path = require( 'path' );

var ROOT_PATH = path.resolve( __dirname );

module.exports = {
  target: 'electron',

  entry: {
    app:          './javascripts/entry.js',
    'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry'
  },

  output: {
    path:        path.resolve( ROOT_PATH, 'build' ),
    publicPath:  '../build/',
    filename:    '[name].bundle.js'
  },

  devtool: 'eval-source-map',

  devServer: {
    contentBase: './public'
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
      { test: /\.css$/,  loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      { test: /\.json$/, loader: 'json-loader' },

      { 
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader', {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // Specifying webp here will create a WEBP version of your JPG/PNG images
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
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
