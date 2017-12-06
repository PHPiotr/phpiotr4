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
    const webpackConfig = require('./webpack.config.dev');
    const compiler = webpack(webpackConfig);
    const webpackDevMiddleware = require('webpack-dev-middleware');
    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
    }));
    app.use(require('webpack-hot-middleware')(compiler));
    app.get('*', (req, res, next) => {
        const filename = path.join(compiler.outputPath, 'index.html');
        compiler.outputFileSystem.readFile(filename, function(err, result) {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    });
} else {
    app.use(serveStatic('build'));
    app.get('/*', (req, res) => {
        return res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

module.exports = {app: app, server: server};
