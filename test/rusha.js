(function () {
  'use strict';

  var assert = require('assert');
  var Rusha = require('../rusha');

  function assertBytesEqual(buffer1, buffer2) {
    var v1 = new Int8Array(buffer1);
    var v2 = new Int8Array(buffer2);
    assert.strictEqual(v1.length, v2.length, 'Buffers do not have the same length');
    for (var i = 0; i < v1.length; i++) {
      assert.strictEqual(v1[i], v2[i], 'Item at ' + i + ' differs: ' + v1[i] + ' vs ' + v2[i]);
    }
  }

  var r = new Rusha();

  var abcString = 'abc';
  var abcBuffer = new Buffer('abc', 'ascii');
  var abcArray = [97, 98, 99];
  var abcArrayBuffer = new Int8Array([97, 98, 99]).buffer;

  var abcHashedInt32Array = new Int32Array(new Int8Array([0xA9, 0x99, 0x3E, 0x36, 0x47, 0x06, 0x81, 0x6A, 0xBA, 0x3E, 0x25, 0x71, 0x78, 0x50, 0xC2, 0x6C, 0x9C, 0xD0, 0xD8, 0x9D]).buffer);

  describe('Rusha', function() {
    describe('digest', function() {
      it('returns hex string from string', function() {
        assert.equal('a9993e364706816aba3e25717850c26c9cd0d89d', r.digest(abcString));
      });
      it('returns hex string from buffer', function() {
        assert.equal('a9993e364706816aba3e25717850c26c9cd0d89d', r.digest(abcBuffer));
      });
      it('returns hex string from array', function() {
        assert.equal('a9993e364706816aba3e25717850c26c9cd0d89d', r.digest(abcArray));
      });
      it('returns hex string from ArrayBuffer', function() {
        assert.equal('a9993e364706816aba3e25717850c26c9cd0d89d', r.digest(abcArrayBuffer));
      });
    });

    describe('digestFromString', function() {
      it('returns hex string from string', function() {
        assert.equal('a9993e364706816aba3e25717850c26c9cd0d89d', (new Rusha()).digestFromString(abcString));
      });
      it('returns hex string from string with offset', function() {
        assert.equal('7288edd0fc3ffcbe93a0cf06e3568e28521687bc', (new Rusha()).digestFromString("foobartest123", 6));
      });
    });

    describe('digestFromBuffer', function() {
      it('returns hex string from buffer', function() {
        assert.equal('a9993e364706816aba3e25717850c26c9cd0d89d', r.digest(abcBuffer));
      });
      it('returns hex string from buffer with offset', function() {
        assert.equal('7288edd0fc3ffcbe93a0cf06e3568e28521687bc', (new Rusha()).digest(new Buffer("foobartest123"), 6));
      });
      it('returns hex string from array', function() {
        assert.equal('a9993e364706816aba3e25717850c26c9cd0d89d', r.digest(abcArray));
      });
    });

    describe('digestFromArrayBuffer', function() {
      it('returns hex string from ArrayBuffer', function() {
        assert.equal('a9993e364706816aba3e25717850c26c9cd0d89d', r.digest(abcArrayBuffer));
      });
    });

    describe('rawDigest', function() {
      it('returns a sliced Int32Array', function() {
        assert.equal(20, r.rawDigest(abcString).buffer.byteLength);
      });
      it('returns Int32Array from string', function() {
        assertBytesEqual(abcHashedInt32Array, r.rawDigest(abcString));
      });
      it('returns Int32Array from buffer', function() {
        assertBytesEqual(abcHashedInt32Array, r.rawDigest(abcBuffer));
      });
      it('returns Int32Array from array', function() {
        assertBytesEqual(abcHashedInt32Array, r.rawDigest(abcArray));
      });
      it('returns Int32Array from ArrayBuffer', function() {
        assertBytesEqual(abcHashedInt32Array, r.rawDigest(abcArrayBuffer));
      });
    });
  });
})();
