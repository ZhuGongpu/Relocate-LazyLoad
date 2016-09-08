const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
//Extract styles into seperate files.
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = require('./webpack.config.base.js')({
    entry: { app: ['babel-polyfill', "./src/index.js"] },
    output: {
        publicPath: '/'
    },
    scssLoader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css-loader?modules&importLoaders=1', 'postcss-loader', 'sass-loader'] }),
    plugins: [
        // Merge all duplicate modules
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            filename: 'index.html',
            inject: 'body', // Inject all scripts into the body
            hash: true, //if true then append a unique webpack compilation hash to all included scripts and css files. This is useful for cache busting.
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        })
    ]
});
