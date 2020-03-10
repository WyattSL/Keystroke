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

exports.rmax = function(max) {
  var r = Math.floor(Math.random() * max) + 1;
  console.log(`[R.M] ${r}/${max}`);
  return r;
}