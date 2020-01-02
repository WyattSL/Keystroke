const { Client, RichEmbed } = require('discord.js');
const filters = require('../filters.json');

exports.run = function (client, config) {
    if (!config.filter) return;
    client.on('message', (msg) => {
      var i;
      for (i=0; i<filters.length;i++) {
        var word = filters[i];
        if (msg.content.includes(word)) {
          msg.delete("violation of filter : " + word);
          return true;
        }
      }
    });
};