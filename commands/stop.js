exports.run = function(name, client, msg) {
  if (client.md) {
    client.md.end();
    msg.channel.send("Dispatch ended. VConnection should be disconnected.")
  } else {
    msg.channel.send("Dispatch is not playing. If VConnection did not automatically disconnect, please disconnect it from the channel manually. ")
  }
}

exports.usage = "stop";
exports.description = "Stop the current dispatch.";