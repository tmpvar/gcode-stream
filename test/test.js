var gcode-stream;
if (typeof require !== "undefined") {
  gcode-stream = require("../gcode-stream.js");
} else {
  gcode-stream = window.gcode-stream;
}

var ok = function(a, msg) { if (!a) throw new Error(msg || "not ok"); };
var eq = function(a, b) { if (a!==b) throw new Error(a + " !== " + b); };

describe('gcode-stream', function() {
  describe('#', function() {
    it('', function() {
      
    });
  });
});
