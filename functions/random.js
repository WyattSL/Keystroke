exports.run = function(o, t) {
  // silence monster
}

exports.chance = function(c) {
  if (c < 1) c = 1*100
  var r = Math.floor(Math.random() * c) + 1
  var b = Math.floor(Math.random() * c) + 1;
  if (r == b) {
    return true;
  } else {
    return false;
  }
}