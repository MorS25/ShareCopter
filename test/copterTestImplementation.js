// Copter Implementation
var CopterApplication = CopterApplication || {};

CopterApplication.NodeCopter = function(){
    console.log("Creating new test client...");

    this.takeOffCalled = false;
    this.landCalled = false;
    this.turnCalledWith = undefined;

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
    up: function(speed, duration){
        console.log("up " + speed);
    },
    down: function(speed, duration){
        console.log("down " + speed);
    },
    front: function(speed, duration){
        console.log("front " + speed);
    },
    back: function(speed, duration){
        console.log("back " + speed);
    },
    left: function(speed, duration){
        console.log("left " + speed);
    },
    right: function(speed, duration){
        console.log("right " + speed);
    },
    stop: function(){
        console.log("stop");
    },
    crane: function(){
        console.log("crane");
    },
    square: function(){
        console.log("square");
    },
    turn : function(direction, angle, altitude){
        console.log("turn " + direction + ", " + angle + ", " + altitude);
        this.turnCalledWith = {direction: direction, angle: angle, altitude: altitude};
    },
    animate: function(animation, duration) {
        console.log("animate " + animation + ", " + duration + " ms");
    }
};

module.exports.Copter = CopterApplication.NodeCopter;
