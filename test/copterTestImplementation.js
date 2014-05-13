var CopterTestImplementation = function(){
    this.takeOffCalled = false;
    this.landCalled = false;
    this.turnAroundCalledWith = undefined;
}

var copterInterface = require('../server/copterInterface');
CopterTestImplementation.prototype = Object.create(copterInterface);

CopterTestImplementation.prototype.takeOff = function(){
    console.log("takeOff()");
    this.takeOffCalled = true;
};

CopterTestImplementation.prototype.land = function(){
    console.log("land()");
    this.landCalled = true;
};

CopterTestImplementation.prototype.turnAround = function(direction, speed){
    console.log("turnAround(" + direction + ", " + speed + ")");
    this.turnAroundCalledWith = {direction: direction, speed: speed};
};

module.exports.Copter = CopterTestImplementation;
