const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
require('es6-promise').polyfill();
require('isomorphic-fetch');

const app = express();
const server = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const isDevelopment = process.env.NODE_ENV !== 'production';
const root = isDevelopment ? 'app' : 'build';

app.use(favicon(path.resolve(__dirname, root, 'static/img/favicon.ico')));
app.use(express.static(path.resolve(__dirname, root, 'static')));

if (isDevelopment) {
    const webpack = require('webpack');
    const clientConfig = require('./webpack.client.dev');
    const serverConfig = require('./webpack.server.dev');
    const compiler = webpack([clientConfig, serverConfig]);
    const clientCompiler = compiler.compilers[0];
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
    const publicPath = clientConfig.output.publicPath;
    const options = {publicPath, stats: {colors: true}};

    app.use(webpackDevMiddleware(compiler, options));
    app.use(webpackHotMiddleware(clientCompiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));
    app.use(webpackHotServerMiddleware(compiler));
} else {
    app.use(serveStatic('build'));
    app.get('/*', (req, res) => {
        return res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

module.exports = {app: app, server: server};
