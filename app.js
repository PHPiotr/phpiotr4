var express = require('express');
var static = require('serve-static');
var path = require('path');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');

var app = express();
var server = require('http').Server(app);

app.set('superSecret', process.env.AUTH_SECRET);

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if (process.env.NODE_ENV !== 'production') {
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config');
    var compiler = webpack(webpackConfig);
    var webpackDevMiddleware = require('webpack-dev-middleware');
    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
    app.get('/*', (req,res) => {
        if (req.originalUrl === '/') {
            return res.sendFile(path.join(__dirname, 'index.html'));
        }
        res.redirect('/?d=' + req.originalUrl);
    })
} else {
    app.use('/js', static(path.join(__dirname, 'build/js')));
    app.use('/css', static(path.join(__dirname, 'build/css')));

    app.get('/*', (req, res) => {
        if (req.originalUrl === '/') {
            return res.sendFile(path.join(__dirname, 'build', 'index.html'));
        }
        res.redirect('/');
    });
}

module.exports = {app: app, server: server};
