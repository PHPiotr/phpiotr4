var express = require('express');
var static = require('serve-static');
var methodOverride = require('method-override');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config.js');

var app = express();
var server = require('http').Server(app);

// view engine setup
app.set('view engine', 'pug');
app.set('superSecret', process.env.AUTH_SECRET);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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
