var split = require('split2');
var through = require('through2');
var splice = require('stream-splice');


var gcodeExp = /\W*([a-z])\W*([0-9\.\-]*)\W*/gi;


var stringify = function(spaces) {
  var keys = Object.keys(this);
  var ret = [];

  for (var i=0; i<keys.length; i++) {
    if (keys[i] === 'stringify') {
      continue;
    }

    ret.push(keys[i].toUpperCase() + this[keys[i]]);
  }

  return ret.join(spaces ? ' ' : '');
};

function gcodeLineParser(line) {
  var parts = line.match(gcodeExp);

  var ret = {};
  if (parts) {
    for (var i=0; i<parts.length; i++) {
      ret[parts[i][0].toLowerCase()] = parseFloat(parts[i].substr(1).trim());
    }
  }

  ret.stringify = stringify;

  return ret;
};

var gs = function gcodeStream(transform) {
  return splice(
    split(),
    through(function(line, enc, fn) {
      var obj = gcodeLineParser(line.toString());
      var res = transform(obj);
      fn(null, res);
    })
  );
};


gs.parse = gcodeLineParser;


if (typeof module !== "undefined" && typeof module.exports == "object") {
  module.exports = gs;
}

if (typeof window !== "undefined") {
  window.gcodeStream = window.gcodeStream || gcodeStream;
}
