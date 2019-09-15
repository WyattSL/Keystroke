exports.ready = function(b, c) {
  const d = require(`./${b}.json`);
  var s = d.status;
  var m = d.mode;
  var g = d.game;
  c.user.setPresence({ game: { name: g, type: s }, status: m });
  if (c.guilds.array().length < 1) {
    console.log(`Keystroke Bot Ready | Logged in as ${c.user.username}#${c.user.discriminator} with no servers.`);
  } else {
    console.log(`Keystroke Bot Ready | Logged in as ${c.user.username}#${c.user.discriminator} with ${c.guilds.array().length} the first one being ${c.guilds.first().name}`);
  };
};