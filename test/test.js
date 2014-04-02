
if (typeof require !== "undefined") {
  var gcodeStream = require("../gcode-stream.js");
  var split = require('split2');
} else {
  gcodeStream = window.gcodeStream;
}

var ok = function(a, msg) { if (!a) throw new Error(msg || "not ok"); };
var eq = function(a, b) { if (a!==b) throw new Error(a + " !== " + b); };

describe('gcode-stream', function() {
  describe('#parse', function() {
    it('should parse basic gcode', function() {
      var obj = gcodeStream.parse('G1 X10 Y100.1Z1.24F1000');

      eq(obj.g, 1);
      eq(obj.x, 10);
      eq(obj.y, 100.1);
      eq(obj.z, 1.24);
      eq(obj.f, 1000);

      eq(obj.stringify(false), 'G1X10Y100.1Z1.24F1000');
      eq(obj.stringify(true), 'G1 X10 Y100.1 Z1.24 F1000');
    });
  });


  describe('#streaming', function() {
    it('works like through', function(t) {
      var s = gcodeStream(function(state, cb) {

        if (state.f && state.f > 1000) {
          state.f = 1000;
        }

        return state.stringify(true) + '\n';
      });

      s.pipe(split()).once('data', function(line) {
        eq(line, 'G1 X100 Y100 Z10 F1000');
        t();
      });

      s.end('G1 X100 Y100 Z10 F5000');
    });
  });
});
