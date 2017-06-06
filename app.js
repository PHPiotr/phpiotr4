var express = require('express');
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
        res.sendFile(path.resolve(__dirname, 'app/index.html'))
    })
} else {
    app.get('/js/*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'build/js/bundle.js'));
    })
    app.get('/css/*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'build/css/bundle.css'));
    })
    app.get('/*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'build/index.html'));
    })
}

module.exports = {app: app, server: server};
