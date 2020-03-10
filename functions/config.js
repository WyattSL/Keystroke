const fs = require('fs');
const global = require("../global.js");

exports.run = function(o, t) {
  // silence!!!!! (spams errors if fails to load)
}

exports.rset = function(file, key, value) {
  var data = fs.readFileSync(file); // ensure data is overriden
  try { // notify if errors, below will not always work
    data = JSON.parse(data);
    data[key] = value;
    fs.writeFileSync(file, data);
    return true;
  } catch(error) {
    console.error("[config.js] rset : " + error);
    return false;
  }
}

exports.set = function(bot, key, value) {
  var file = `./config/${bot}.json`; // less change of error?
  if (!fs.existsSync(file)) {
    var data = fs.readFileSync(`./configdefaults.json`);
    var client = global.clientList[bot];
    var dc = require("./bots/" + bot + ".json");
    data = data.stringify(data);
    data = data.replace(/#user/g, client.user.username);
    data = data.replace(/#avatar/g, client.user.avatar);
    data = data.replace(/#prefix/g, dc.prefix);
    data = JSON.parse(data);
    fs.writeFileSync(file, JSON.stringify(data));
  }
  var data = fs.readFileSync(file); // ensure data is overriden
  try { // tell me of the errors, but don't stop!
    data = JSON.parse(data);
    data[key] = value;
    fs.writeFileSync(file, JSON.stringify(data));
    return true;
  } catch(err) {
    console.error("[config.js] set : " + err);
    return false;
  }
}

exports.get = function(bot, key) {
  if (!bot || !key) return true;
  var file = `./config/${bot}.json`;
  if (!fs.existsSync(file)) {
    var data = fs.readFileSync(`./configdefaults.json`);
    var client = global.clientList[bot];
    var dc = require("../bots/" + bot + ".json");
    data = JSON.stringify(data);
    data = data.replace(/#user/g, client.user.username);
    data = data.replace(/#avatar/g, client.user.avatar);
    data = data.replace(/#prefix/g, dc.prefix);
    data = JSON.parse(data);
    fs.writeFileSync(file, JSON.stringify(data));
  }
  try { // tell me of the errors, but don't stop (please) !
    var data = fs.readFileSync(file);
    data = JSON.parse(data);
    return data[key];
  } catch(err) {
    console.error(`[config.js] get : ${err}`);
    return false;
  }
}