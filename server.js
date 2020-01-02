// start bots
require('./bots.js');

// peoj start
var express = require('express');
var bodyParser = require('body-parser');
const request = require('request');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const sql = require('./mysql.js');
const sc = require('./functions/staffchat.js');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/sc', function (req, res) {

});

app.get('/web/*', function (req, res) {
    var site = req.url.split('/')[2];
    if (!site) {
        res.sendFile('../views/404.html');
    } else {
        res.sendFile(`../views/${site}.html`);
    }
});

app.get('/apply/*', function (req, res) {
    res.sendFile('../views/apply.html');
});

app.get('/5249/db', function (req, res) {
    var code = req.query.code;
    sql.code(code);
});

app.get('/serv', function (req, res) {
    var id = app.get('/')
});

app.get('/bot/*', function (req, res) {
    var bn = req.url.split('/')[2];
    console.log(bn);
    var rl = process.env["INV_" + bn];
    res.redirect(rl);
});

app.post(`/importRepo`, function (req, res) {
    var auth = process.env.GlitchAuth;
    var url = `https://api.glitch.com/project/githubImport?projectId=b2d913ef-8ce5-41e3-ae1b-2ffafefa0d41&repo=GameFreako%2FKeystroke&path=Keystroke`;
    var options = {
        url: url,
        headers: {
            'Authorization': auth
        }
    };
    request.post(options, function (err, resp, body) {
        if (err) throw err;
        if (resp.statusCode !== 200) {
            console.warn(body);
        };
        res.sendStatus(resp.statusCode);
    });
});

app.get('/*', function (req, res) {
    res.sendFile('../views/404.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});