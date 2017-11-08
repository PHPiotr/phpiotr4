var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var sendgrid = require('sendgrid');
var bodyParser = require('body-parser');
require('es6-promise').polyfill();
require('isomorphic-fetch');

var app = express();
var server = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/activation/:id/:hash', (req, res) => {
    fetch(`${process.env.API_URL}${process.env.API_PREFIX}/users/${req.params.id}`, {
        method: 'put',
        body: JSON.stringify({
            active: true,
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${req.params.hash}`,
        },
    })
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
        });
    res.redirect('/');
});

app.post('/send_activation_link', (req, res) => {

    var helper = sendgrid.mail;
    var from_email = new helper.Email('no-reply@phpiotr.herokuapp.com', 'PHPiotr');
    var to_email = new helper.Email(req.body.email);
    var subject = '[PHPiotr] Activate your account';
    var link = `${req.protocol}://${req.get('host')}/activation/${req.body.id}/${req.body.hash}`;
    var content = new helper.Content(
        'text/html',
        `Hello ${req.body.username}! Click the following link in order to activate your account: <a href="${link}">${link}</a>`);
    var mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = sendgrid(process.env.SENDGRID_API_KEY);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });

    sg.API(request, function (error, response) {
        if (error) {
            throw new Error(error);
        }
        res.json(response);
    });
});

if (process.env.NODE_ENV !== 'production') {
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.dev');
    var compiler = webpack(webpackConfig);
    var webpackDevMiddleware = require('webpack-dev-middleware');
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
