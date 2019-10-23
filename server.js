require('./bots.js');

// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const sql = require('./mysql.js');
const sc = require('./functions/staffchat.js');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/sc', function(req, res) {
  
});

app.get('/apply/*', function(req, res) {
  res.sendFile(__dirname + '/views/apply.html');
});

app.get('/5249/db', function(req, res) {
  var code = req.query.code;
  sql.code(code);
});

app.get('/bot/*', function(req, res) {
  var bn = req.url.split('/')[2];
  console.log(bn);
  var rl = process.env["INV_"+bn];
  res.redirect(rl);
});

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/views/404.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
