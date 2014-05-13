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
    up: function(speed, duration){
        console.log("up " + speed + ", duration " + duration);
        this.client
            .after(100, function() { this.up(speed) })
            .after(duration, function() {
                this.stop();
            });
    },
    down: function(speed, duration){
        console.log("down " + speed + ", duration " + duration);
        this.client
            .after(100, function() { this.down(speed) })
            .after(duration, function() {
                    this.stop();
        });
    },
    front: function(speed, duration){
        console.log("front " + speed + ", duration " + duration);
        this.client
            .after(100, function() { this.front(speed) })
            .after(duration, function() {
                this.stop();
            });
    },
    back: function(speed, duration){
        console.log("back " + speed + ", duration " + duration);
        this.client
            .after(100, function() { this.back(speed) })
            .after(duration, function() {
                this.stop();
            });
    },
    left: function(speed, duration){
        console.log("left " + speed + ", duration " + duration);
        this.client
            .after(100, function() { this.left(speed) })
            .after(duration, function() {
                this.stop();
            });
    },
    right: function(speed, duration){
        console.log("right " + speed + ", duration " + duration);
        this.client
            .after(100, function() { this.right(speed) })
            .after(duration, function() {
                this.stop();
            });
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