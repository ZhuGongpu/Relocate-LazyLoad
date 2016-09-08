const path = require('path');
const webpack = require('webpack');
// PostCSS plugins
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');
const postcssPxToRem = require('postcss-pxtorem');

module.exports = (options) => ({
    devtool: options.devtool,
    entry: options.entry,
    output: Object.assign({}, {
        path: path.resolve(process.cwd(), 'lib'),
        // filename: "[name].js",
        publicPath: '/lib/',
        hash: true
    }, options.output),
    plugins: options.plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        })
    ]),
    module: {
        noParse: [],
        loaders: [{
            test: /\.js(x?)$/,
            exclude: /node_modules/,
            loader: "babel"
        }, {
            test: /\.(scss|sass)$/,
            loader: options.scssLoader
        }, {
            test: /\.css$/,
            include: /node_modules/,
            loaders: 'style-loader!css-loader',
        }, {
            test: /\.less$/, loader: "style!css!less"
        }]
    },
    postcss: () => ([
        postcssFocus(), // Add a :focus to every :hover
        cssnext({
            browsers: ['last 2 versions', 'not ie <= 8'],
        }),
        postcssReporter({
            clearMessages: true,
        }),
        postcssPxToRem
    ]),
    externals: options.externals,
    // target: 'web', // Make web variables accessible to webpack, e.g. window
});
