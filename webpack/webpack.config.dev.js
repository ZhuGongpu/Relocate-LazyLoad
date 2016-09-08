const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = require('./webpack.config.base.js')({
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: [
            // necessary for hot reloading with IE:
            'eventsource-polyfill',
            // listen to code updates emitted by hot middleware:
            'webpack-hot-middleware/client'
        ]
    },
    output: {
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    babelQueryPresets: ['react-hmre'],
    scssLoader: 'style-loader!css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader!sass-loader'
});
