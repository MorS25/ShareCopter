// Copter Implementation
var CopterApplication = CopterApplication || {};

CopterApplication.NodeCopter = function(){
    console.log("Creating new test client...");

    this.takeOffCalled = false;
    this.landCalled = false;
    this.turnAroundCalledWith = undefined;

    var copterInterface = require('../server/copterInterface');
    this.prototype = Object.create(copterInterface);

    console.log("New test copter instantiated!");
};

CopterApplication.NodeCopter.prototype = {
    takeOff :  function(){
        console.log("takeOff");
        this.takeOffCalled = true;
    },
    land : function(){
        console.log("land");
        this.landCalled = true;
    },
    turnAround : function(direction, speed){
        console.log("turnAround " + direction + ", " + speed);
        this.turnAroundCalledWith = {direction: direction, speed: speed};
    },
    up: function(speed){
        console.log("up " + speed);
    },
    down: function(speed){
        console.log("down " + speed);
    },
    front: function(speed){
        console.log("front " + speed);
    },
    back: function(speed){
        console.log("back " + speed);
    },
    left: function(speed){
        console.log("left " + speed);
    },
    right: function(speed){
        console.log("right " + speed);
    },
    stop: function(){
        console.log("stop");
    },
    animate: function(animation, duration) {
        console.log("animate " + animation + ", " + duration + " ms");
    }
};

module.exports.Copter = CopterApplication.NodeCopter;
