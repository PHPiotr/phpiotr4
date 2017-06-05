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

var webpack = require('webpack');

if (process.env.NODE_ENV !== 'production') {
    var webpackConfig = require('./webpack.config');
    var compiler = webpack(webpackConfig);
    var webpackDevMiddleware = require('webpack-dev-middleware');
    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
} else {
    var webpackConfig = require('./webpack.config.prod');
}

// view engine setup
app.set('view engine', 'pug');
app.set('superSecret', process.env.AUTH_SECRET);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'app/index.html'))
})

module.exports = {app: app, server: server};
