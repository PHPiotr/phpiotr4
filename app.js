const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const cookiesMiddleware = require('universal-cookie-express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpack = require('webpack');
require('es6-promise').polyfill();
require('isomorphic-fetch');

const app = express();
const server = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const isDevelopment = process.env.NODE_ENV !== 'production';
const root = isDevelopment ? 'app' : 'buildClient';
const stats = {entrypoints: true, usedExports: true, colors: true};

try {
    app.use(favicon(path.resolve(__dirname, root, 'static/img/favicon.ico')));
} catch(e) {
    //
}
app.use(express.static(path.resolve(__dirname, root, 'static')));
app.use(cookiesMiddleware());

if (isDevelopment) {
    const clientConfig = require('./webpack/client/webpack.client.dev');
    const serverConfig = require('./webpack/server/webpack.server.dev');
    const compiler = webpack([clientConfig, serverConfig]);
    const clientCompiler = compiler.compilers[0];
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const publicPath = clientConfig.output.publicPath;
    const options = {publicPath, stats};

    app.use(webpackDevMiddleware(compiler, options));
    app.use(webpackHotMiddleware(clientCompiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));
    app.use(webpackHotServerMiddleware(compiler));
} else {
    const clientConfig = require('./webpack/client/webpack.client.prod');
    const serverConfig = require('./webpack/server/webpack.server.prod');
    const compiler = webpack([clientConfig, serverConfig]);
    const publicPath = clientConfig.output.publicPath;
    const options = {publicPath, stats};

    app.use(webpackDevMiddleware(compiler, options));
    app.use(webpackHotServerMiddleware(compiler));
}

module.exports = {app: app, server: server};
