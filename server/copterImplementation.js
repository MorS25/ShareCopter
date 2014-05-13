// Copter Implementation
var CopterApplication = CopterApplication || {};

CopterApplication.NodeCopter = function(){
    console.log("Creating new client...");

    var copterInterface = require('../server/copterInterface');
    var arDrone = require('ar-drone');

    this.client = arDrone.createClient();
    this.prototype = Object.create(copterInterface);

    console.log("New copter instantiated!");
};

CopterApplication.NodeCopter.prototype = {
    takeOff :  function(){
        console.log("takeOff");
        this.client.takeoff();
    },
    land : function(){
        console.log("land");
        this.client.land();
    },
    turnAround : function(direction, speed){
        console.log("turnAround " + direction + ", " + speed);
        if(direction === 'left'){
            this.client.counterClockwise(speed);
        } else{
            this.client.clockwise(speed);
        }
    },
    up: function(speed){
        console.log("up " + speed);
        this.client.up(speed);
    },
    down: function(speed){
        console.log("down " + speed);
        this.client.down(speed);
    },
    front: function(speed){
        console.log("front " + speed);
        this.client.front(speed);
    },
    back: function(speed){
        console.log("back " + speed);
        this.client.back(speed);
    },
    left: function(speed){
        console.log("left " + speed);
        this.client.left(speed);
    },
    right: function(speed){
        console.log("right " + speed);
        this.client.right(speed);
    },
    stop: function(){
        console.log("stop");
        this.client.stop();
    },

    /* animation:
     ['phiM30Deg', 'phi30Deg', 'thetaM30Deg', 'theta30Deg', 'theta20degYaw200deg',
     'theta20degYawM200deg', 'turnaround', 'turnaroundGodown', 'yawShake',
     'yawDance', 'phiDance', 'thetaDance', 'vzDance', 'wave', 'phiThetaMixed',
     'doublePhiThetaMixed', 'flipAhead', 'flipBehind', 'flipLeft', 'flipRight']

     duration: milliseconds
     */
    animate: function(animation, duration) {
        console.log("animate " + animation + ", " + duration + " ms");
        this.client.animate(animation, duration);
    }
};

module.exports.Copter = CopterApplication.NodeCopter;