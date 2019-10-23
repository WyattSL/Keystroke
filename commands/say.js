exports.run = function(n, c, msg) {
  var tosay = msg.content.slice(5, msg.content.length);
  msg.delete();
  msg.channel.send(tosay);
};
