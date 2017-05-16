const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: '/dist'
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0','stage-2']
                    }
                }
            ]
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        },
        {
            test: /\.html$/,
            use: ['html-loader']
        },
        {
            test: /\.(ttf|eot|svg|woff)$/,
            use: [
            {
              loader: "file-loader",
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
              }
            }
            ]
        },
        {
            test: /\.(jpg|png|gif|svg)$/,
            use: [
                {
                      loader: 'file-loader',
                      options: {
                          name: '[name].[ext]',
                          outputPath: 'img/',
                          // publicPath: 'img/' 
                      }
                }
            ]
        }
    ]
  },
  devServer: {
        contentBase: path.join(__dirname, "src"),
        compress: true,
        stats: "errors-only",
        open: true
    },
  plugins: [
      new webpack.ProvidePlugin({
          $: 'zepto-webpack',
      }),
      new ExtractTextPlugin({
        filename: 'style.css'
      }),
      new HtmlWebpackPlugin({
          template: 'src/index.html'
      }),
      new CleanWebpackPlugin(['dist'])
  ]
};
