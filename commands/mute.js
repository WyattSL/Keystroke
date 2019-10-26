//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');


exports.run = function(n, c, msg) {
   if (!perms.checkPerm("MUTE_MEMBERS", msg.member, msg.channel)) return;
    var tu = msg.mentions.members.first();
    if (!tu) {
      msg.channel.send(':x: Please specify an user.');
    }
    var ti = tu.id;
    var ii = msg.author.id;
    var tr = msg.guild.roles.find(r => r.name === "Muted");
    if (!tr) {
      msg.guild.createRole({ name: "Muted", hoist: false, mentionable: false, permissions: 68224000 }, "Mute Setup");
      msg.guild.owner.send('I have automatically created a role named "Muted". Muted players will have this role. It currently has basic permissions, you should verify these.');
      var tr = msg.guild.roles.find(r => r.name === "Muted");
    };
    tu.addRole(tr, "Muted by " + msg.member.displayName).catch();
    var e = new RichEmbed()
    .setTitle(`Punishment`)
    .setColor(0xFF0000)
    .setAuthor(msg.member.displayName, msg.author.avatarURL)
    .setFooter(process.env.FOOTER)
    .setDescription(`<@${ti}> has been muted!`);
    msg.channel.send(e);
};