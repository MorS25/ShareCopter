
var copterTestImplementation = function(){

    this.takeOffCalled = false;
    this.landCalled = false;
    this.turnAroundCalled = false;

    var copterInterface = require('../copterInterface');
    copterImplementation.prototype = Object.create(copterInterface);

    copterImplementation.prototype.takeOff = function(){
        this.takeOffCalled = true;
    };

    copterImplementation.prototype.land = function(){
        this.landCalled = true;
    };

    copterImplementation.prototype.turnAround = function(direction, speed){
        this.turnAroundCalled = true;
    };
}