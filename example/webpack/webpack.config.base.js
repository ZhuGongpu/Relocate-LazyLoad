const path = require('path');
const webpack = require('webpack');
//Extract styles into seperate files.
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// PostCSS plugins
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');
const postcssPxToRem = require('postcss-pxtorem');

module.exports = (options) => ({
    devtool: options.devtool,
    entry: Object.assign({}, {
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'react-router-redux',
            'redux',
            'redux-thunk',
            'history',
            'isomorphic-fetch'
        ]
    }, options.entry),
    output: Object.assign({}, {
        path: path.resolve(process.cwd(), 'dist'),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js",
        publicPath: '/dist/',
        hash: true
    }, options.output),
    resolve: {
        modules: ['src', 'node_modules'],
        // root: [
        //     path.resolve('../src'),
        //     path.resolve('../src/containers'),
        //     path.resolve('../src/components')
        // ],
        extensions: ['', '.js']
    },
    plugins: options.plugins.concat([
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common', 'vendor'],
            minChunks: 2
        }),
        // OccurrenceOrderPlugin is needed for long-term caching to work properly.
        // See http://mxs.is/googmv
        new webpack.optimize.OccurrenceOrderPlugin(true),
        // Extract the CSS into a seperate file
        new ExtractTextPlugin('[name].styles.bundle.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        })
    ]),
    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'html-loader',
        }, {
            test: /\.js(x?)$/,
            exclude: /node_modules/,
            loader: "babel"
        }, {
            test: /\.(scss|sass)$/,
            loader: options.scssLoader
        }, {
            // Do not transform vendor's CSS with CSS-modules
            // The point is that they remain in global scope.
            // Since we require these CSS files in our JS or CSS files,
            // they will be a part of our compilation either way.
            // So, no need for ExtractTextPlugin here.
            test: /\.css$/,
            include: /node_modules/,
            loaders: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: ['css-loader']}),
        }, {
            test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
            loader: 'url-loader?limit=10000',
        }, {
            test: /\.woff2?|ttf|eot(\?v=\d+\.\d+\.\d+)?$/,
            include: /node_modules/,
            loader: 'url?name=fonts/[name].[hash].[ext]',
        }, {
            test: /\.woff2?|ttf|eot(\?v=\d+\.\d+\.\d+)?$/,
            exclude: /node_modules/,
            loader: 'file?name=fonts/[name].[hash].[ext]',
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }]
    },
    // sassLoader: {
    //     includePaths: [path.join(__dirname, 'scss')]
    // },
    postcss: () => ([
        postcssFocus(), // Add a :focus to every :hover
        cssnext({ // Allow future CSS features to be used, also auto-prefixes the CSS...
            browsers: ['last 2 versions', 'not ie <= 8'], // ...based on this browser list
        }),
        postcssReporter({ // Posts messages from plugins to the terminal
            clearMessages: true,
        }),
        postcssPxToRem,
    ]),
    target: 'web', // Make web variables accessible to webpack, e.g. window
});
