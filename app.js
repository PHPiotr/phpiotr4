var express = require('express');
var socket_io = require('socket.io');
var methodOverride = require('method-override');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var express_session = require('express-session');
var index = require('./routes/index');
var users = require('./routes/users');
var buses = require('./routes/bookings/buses');
var planes = require('./routes/bookings/planes');
var trains = require('./routes/bookings/trains');
var hostels = require('./routes/bookings/hostels');
var report = require('./routes/report');
var session = require('./routes/session');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var config = require('./webpack.config');

var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    hot: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(function(req, res, next) {
    res.io = io;
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('my secret string'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express_session({
    secret: 'my secret string',
    cookie: {maxAge: 3600000},
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(function(req, res, next){
    res.locals.success_messages = req.flash('success_message');
    res.locals.error_messages = req.flash('error_message');
    res.locals.active = req.active;
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/bookings/planes', planes);
app.use('/bookings/hostels', hostels);
app.use('/bookings/buses', buses);
app.use('/bookings/trains', trains);
app.use('/session', session);
app.use('/report', report);

require('express-dynamic-helpers-patch')(app);
// and now You can use 2.x express dynamicHelpers
app.dynamicHelpers({
    session: function(req, res) {
        return req.session;
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

require('mongoose').connect('mongodb://localhost/phpiotr4');

module.exports = {app: app, server: server};
