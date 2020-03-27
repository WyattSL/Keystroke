// start bots
require('./bots.js');

// proj start
const fs = require('fs');
var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser');
const request = require('request');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const sql = require('./mysql.js');
const sc = require('./functions/staffchat.js');
const global = require("./global.js");

const Discord = require('discord.js');
const Githook = new Discord.WebhookClient("684152365166624891", "mQfoqAQCb65Yfz1KMsxICE23vQgX3w1eLvWQteK5q0fKF5DB5cXsCFLZqbarB243dKJT")

app.use(express.static('public'));

const passport = require("passport")
var DiscordStrategy = require('passport-discord').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(session({
    secret: process.env.StaticSecret,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new DiscordStrategy({
    clientID: process.env.ID,
    clientSecret: process.env.SECRET,
    callbackURL: "https://keystroke.glitch.me/call",
    scope: ["guilds.join, bot"]
  },
  function(accessToken, refreshToken, profile, cb) {
    process.nextTick(function() {
        return cb(null, profile);
    });
  }
));

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.sendStatus(403);
}

app.get("/info", checkAuth, function(req, res) {
    res.json(req.user);
});

fs.readdir('./functions/', function(err, files) {
      if (err) throw err;
      if (!files) console.warn("No functions found");
      if (files) {
        var i;
        for (i=0;i<files.length;i++) {
          try {
            var func = require("./functions/" + files[i])
            if (func.webreserve) {
              app.get(`/functions/${func.webreserve}`, function(req, res) {
                func.web(req, res);
              });
            }
          } catch(err) {
            console.warn(`Error loading function: ${files[i]} [${err}]`)
          }
        }
      }
  });

/*
app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback', 
  passport.authenticate('discord', { failureRedirect: '/close' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/postMessage');
  }
);
*/

app.get('/call', function(req, res) {
    passport.authenticate('discord', { failureRedirect: '/failure'}),
    function(req, res) {
        res.redirect("/success")
    }
});

app.get("/postMessage", function(req, res) {
    res.end("<head><script defer>window.postMessage('authorized', '*');</script></head>")
});

app.get("/admin", function(req, res) {
    var code = req.query.code;
    if (code == process.env.ADMIN) {
        res.sendFile(__dirname + "/views/admin.html")
    } else {
        res.sendStatus(403);
    }
});

app.post("/notify", function(req, res) {
    var title = req.body.title;
    var color = req.body.color;
    var body = req.body.body;
    var footer = req.body.footer;
    var gl = global.guildList;
    var i;
    for (i=0;i<gl.length;i++) {
        var g = gl[i];
        console.log("Sending notification to guild " + g + ".")
        global["notify_" + g](title, body, color, footer);
    }
});

app.post("/github", function(req, res) {
  var type = req.headers["x-github-event"];
  var data = JSON.parse(req.body);
  switch (type) {
    case "ping":
      Githook.sendSlackMessage({
      'username': 'Githook',
      'attachments': [{
        'pretext': 'Ping!',
        'color': '#000000',
        'footer': 'Pong!',
        'ts': Date.now() / 1000
      }]
    }).catch(console.error);
    break;
    case "push":
      var message = ""
      Githook.sendSlackMessage({
        'username': data.sender.login,
        'attachments': [{
          'pretext': data.commits,
          'color': '#000000',
          'footer': 'Push',
          'ts': Date.now() / 1000
        }]
      })
    default:
      Githook.sendSlackMessage({
        'username': 'Githook',
        'attachments': [{
          'pretext': type,
          'color': '#000000',
          'footer': 'unknown type?',
          'ts': Date.now() / 1000
        }]
      }).catch(console.error);
  }
  res.sendStatus(200);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

exports.srv = function(client, config) {
  app.get('/srv', function(req, res) {
    var id = req.query.token
    var type = req.query.type
    var msg = req.query.msg
    res.end("OK");
    if (config.id == id) {
      if (type == "chat") {
        var ch = client.channels.find(ch => ch.type == "text" && ch.id == config.srvchat)
        if (!ch) return false;
        ch.send(msg)
      } else if (type == "console") {
        var ch = client.channels.find(ch => ch.type == "text" && ch.id == config.srvconsole)
        if (!ch) return false;
        ch.send(msg)
      }
    }
  });
};

app.get('/panel/*', function(req, res) {
    res.sendFile(__dirname + '/views/bots.html');
});

app.get("/newBot", function(req, res) {
    var duser = req.query.discord
    var user = req.query.username
    var avatar = req.query.avatar
    var prefix = req.query.prefix
    var status = req.query.status
    var mode = req.query.mode
    var game = req.query.game
    var commands = []
    var i;
    fs.readdir("./commands/", function(err, files) {
        if (err) throw err;
        if (!files) { console.error("failed to find commands in directory"); return; }
        for (i=0;i<files.length;i++) {
            var file = files[i]
            if (req.query[`cmd:${file.split(".")[0]}`]) {
                commands[file] = file.split(".")[0];
            }
        }
    });
    var config = {}
    config.name = user;
    config.owner = duser;
    config.prefix = prefix;
    config.mode = status;
    config.status = mode;
    var name = user.replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_");
    name=name.replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "");
    fs.writeFile(name, config.stringify(), 'utf8');
});

app.get('/web/*', function (req, res) {
    var site = req.url.split('/')[2];
    if (!site) {
        res.sendFile(__dirname + '/views/404.html');
    } else {
        res.sendFile(__dirname + `/views/${site}.html`);
    }
});

app.get('/apply/*', function (req, res) {
    res.sendFile(__dirname + '/views/apply.html');
});

app.get('/5249/db', function (req, res) {
    var code = req.query.code;
    sql.code(code);
});

app.get('/serv', function (req, res) {
    var id = app.get('/')
});

/*
app.get('/bot/*', function (req, res) {
    var bn = req.url.split('/')[2];
    console.log(bn);
    var rl = process.env["INV_" + bn];
    res.redirect(rl);
});
*/

app.get("/bot/*", function(req, res) {
  var bn = req.url.split("/")[2];
  if (!bn) {
    res.sendStatus(404);
  }
  var c = global.clientList[bn]
  if (!c || !c.invite) {
    res.sendStatus(404);
  }
  res.redirect(c.invite);
});

app.get("/close", function(req, res) {
    res.end("<html><head><script defer>window.close()</script></head></html>")
});

app.get("/panel/*", function(req, res) {
    res.sendFile(__dirname + "/views/panel.html")
});

app.get("/file", function(req, res) {
    var file = req.query.path
    res.sendFile(__dirname + "/" + file);
});

app.get("/img/*", function(req, res) {
    var target = req.path.split("/")[2];
    res.redirect(process.env["IMG_" + target])
});

app.get("/api/serv/*", function(req, res) {
    var target = req.path.split("/")[3];
    var data = JSON.stringify(global.guildList[target]);
    res.end(data);
});

app.get("/api/avatar/*", function(req, res) {
    var target = req.path.split("/")[3];
    var data = global.avatarList[target]
    res.redirect(data);
});

app.get("/api/config/*", function(req, res) { // this is my least favorite part
    var target = req.path.split("/")[3];
    var cf = require("./bots/" + target + ".json");
    var data = {}
    data["prefix"] = cf.prefix;
    data["mode"] = cf.status;
    data["status"] = cf.mode
    data["game"] = cf.game;
    data["username"] = global.clientList[target].user.username;
    data["discriminator"] = global.clientList[target].user.discriminator;
    res.end(JSON.stringify(data));
});

app.get("/api/commands", function(req, res) {
    var data = {};
    fs.readdir('./commands', function(err, files) { // Read all files in the bot directory
        if (err) throw err;
        if (!files) { // ensure files are in the directory
          console.error('Failed to find any files in the command directory.')
        } else {
          var i;
          res.end(JSON.stringify(files));
        };
    });
});

app.get("/api/cmdcheck/*", function(req, res) {
    var target = req.path.split("/")[3];
    var cmd = req.query.cmd;
    var cmds = require("./bots/" + target + ".json").commands;
    if (cmds.includes(cmd)) {
        res.end("true");
    } else {
        res.end("false")
    }
});

app.post("/updateBot", function(req, res) {
    console.log('[START BOT UPDATE]')
    console.log(__dirname + "/bots/" + req.body.id + ".json")
    var data = require(__dirname + "/bots/" + req.body.id + ".json")
    console.log(data);
    var username = req.body.username;
    var avatar = req.body.avatar;
    var prefix = req.body.prefix;
    var mode = req.body.status;
    var status = req.body.mode;
    var game = req.body.game;
    var cmdlist = [];
    var i;
    var ib = 0;
    fs.readdir('./commands', function(err, files) {
        if (err) throw err;
        if (!files) {
            console.error("Failed to find any commands in the command directory.");
        } else {
            for (i=0;i<files.length;i++) {
                if (req.body[files[i].split(".")[0]]) {
                    cmdlist.push(files[i].split(".")[0]);
                }
            }
        }
    })
    data.prefix = prefix;
    data.mode = mode;
    data.status = status;
    data.game = game;
    data.commands = cmdlist;
    console.log(data);
    fs.writeFile(__dirname + "/bots/" + req.body.id + ".json", JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log(JSON.stringify(data));
        console.log('writing to ' + `${__dirname}/bots/${req.body.id}.json`);
        console.log(require(`${__dirname}/bots/${req.body.id}.json`))
    });
    res.end("writing to " + `${__dirname}/bots/${req.body.id}.json`);
  console.log('[END BOT UPDATE]')
});

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/views/404.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});