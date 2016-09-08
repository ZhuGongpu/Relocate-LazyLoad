const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = require('./webpack.config.base.js')({
    entry: {
        LazyLoad: [path.resolve(__dirname, "../src/higherOrderComponents/LazyLoad")],
        Relocate: [path.resolve(__dirname, "../src/higherOrderComponents/Relocate")],
        createReducer: [path.resolve(__dirname, "../src/reducers")]
    },
    output: {
        publicPath: '/',
        library: 'relocate-lazy-load',
        libraryTarget: 'umd',
        filename: "[name].js"
    },
    scssLoader: 'style-loader!css-loader?localIdentName=[local]__[name]__[hash:base64:5]&modules&importLoaders=1!postcss-loader!sass-loader',
    plugins: [],
    externals: {
        'react': 'umd react',
        "immutable": "umd immutable",
        "react-router-redux": "umd react-router-redux",
        "redux-immutable": "umd redux-immutable"
    }
})
;
