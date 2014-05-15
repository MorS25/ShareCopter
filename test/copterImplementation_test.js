'use strict';

var CopterFactory = require('../server/copterFactory');
var copterFactory = new CopterFactory();
var copterInstance = copterFactory.getCopterInstance("test");

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['copter'] = {
  setUp: function(done) {
    done();
  },
  'land': function(test) {
    test.expect(1);
    copterInstance.land();
    test.equal(copterInstance.landCalled, true);
    test.done();
  },
  'takeOff': function(test) {
      test.expect(1);
      copterInstance.takeOff();
      test.equal(copterInstance.takeOffCalled, true);
      test.done();
  },
  'turn': function(test) {
      test.expect(3);
      copterInstance.turn('right', 90, 1.0);
      var calledParams = copterInstance.turnCalledWith;
      test.equal(calledParams.direction, 'right');
      test.equal(calledParams.angle, 90);
      test.equal(calledParams.altitude, 1.0);
      test.done();
    }
};
