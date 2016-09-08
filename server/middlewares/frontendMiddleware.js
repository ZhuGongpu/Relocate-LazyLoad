const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');

// Dev middleware
const addDevMiddlewares = (app, options) => {
    const compiler = webpack(options);
    const middleware = webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: options.output.publicPath,
        silent: true,
        stats: 'errors-only',
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    app.use('/api', proxy({
        //TODO: YOUR SERVER
        target: 'http://example.com/api',
        changeOrigin: true,
        pathRewrite: {
            '^/api': "" // remove path
        }
    }));

    // Since webpackDevMiddleware uses memory-fs internally to store build
    // artifacts, we use it instead
    const fs = middleware.fileSystem;

    app.get('*', (req, res) => {
        const file = fs.readFileSync(path.join(compiler.outputPath, 'index.html'));
        res.send(file.toString());
    });
};

// Production middlewares
const addProdMiddlewares = (app, options) => {
    app.use(options.output.publicPath, express.static(options.output.path));

    app.use('/api', proxy({
        target: 'http://www.51zhiquan.com/api',
        changeOrigin: true,
        pathRewrite: {
            '^/api': "" // remove path
        }
    }));

    app.get('*', (req, res) => res.sendFile(path.join(options.output.path, 'index.html')));
};

/**
 * Front-end middleware
 */
module.exports = (options) => {
    const isProd = process.env.NODE_ENV === 'production';

    const app = express();

    if (isProd) {
        addProdMiddlewares(app, options);
    } else {
        addDevMiddlewares(app, options);
    }

    return app;
};