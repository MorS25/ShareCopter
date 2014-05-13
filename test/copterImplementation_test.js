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
  'turnAround': function(test) {
      test.expect(2);
      copterInstance.turnAround('right', 0.5);
      var calledParams = copterInstance.turnAroundCalledWith;
      test.equal(calledParams.direction, 'right');
      test.equal(calledParams.speed, 0.5);
      test.done();
    }
};
