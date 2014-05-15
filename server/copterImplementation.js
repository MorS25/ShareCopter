// Copter Implementation
var CopterApplication = CopterApplication || {
    _counter : 0
};

CopterApplication.NodeCopter = function(){
    console.log("Creating new client...");

    var copterInterface = require('../server/copterInterface')
        , ardrone = require('ar-drone')
        , autonomy = require('ardrone-autonomy')
        , fs = require('fs')
        ;

    this.prototype = Object.create(copterInterface);
    this.client = ardrone.createClient();

    this.isInitialized = false;
    this.isRunning = false;

    this.init = function() {

        console.log(new Date().toLocaleTimeString() + " : Initializing...");

        this.createMission(this.client);

        console.log(new Date().toLocaleTimeString() + " : Starting drone...");
        this.mission
            .takeoff()
            .zero()
            .hover(2000);

        this.isInitialized = true;

        console.log(new Date().toLocaleTimeString() + " : Drone ready!");
    };

    this.createMission = function(client, options){

        var control = new autonomy.Controller(client, options);
        this.mission = new autonomy.Mission(client, control, options);
    };

    this.startMission = function(){

        if(this.isRunning) {
            console.log('Mission already running, please wait until completed!')
        } else {
            this.isRunning = true;
            var theMission = this.mission;
            var runningFlag = this.isRunning;
            theMission.run(function (err, result) {
                if (err) {
                    console.trace("Oops, something bad happened: %s", err.message);
                    theMission.client().stop();
                    theMission.client().land();
                } else {
                    console.log("We are done!");
//                theMission.client().stop();
                }
                runningFlag = false;
            });

            console.log(new Date().toLocaleTimeString() + " : Running mission...");
        }
    };

    this.takePicture = function(callback){
        // First we disable the control to have the drone in stable
        // hover mode
        this.mission.control().disable();
        var self = this;

        // Wait for a new image
        setTimeout(function() {
            this.client.getPngStream().once('data', function(data) {
                var fileName = 'pano_' + self._counter++ + '.png';
                // Save the file
                fs.writeFile(fileName, data, function(err){
                    if (err) console.log(err);
                    console.log(fileName + ' Saved');

                    // Renable the control
                    callback();
                });
            });
        }, 1000);
    };
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
    up: function(speed, duration){
        console.log("up " + speed + ", duration " + duration);
        this.client.up(speed);
    },
    down: function(speed, duration){
        console.log("down " + speed + ", duration " + duration);
        this.client.down(speed);
    },
    front: function(speed, duration){
        console.log("front " + speed + ", duration " + duration);
        this.client.front(speed);
    },
    back: function(speed, duration){
        console.log("back " + speed + ", duration " + duration);
        this.client.back(speed);
    },
    left: function(speed, duration){
        console.log("left " + speed + ", duration " + duration);
        this.client.left(speed);
    },
    right: function(speed, duration){
        console.log("right " + speed + ", duration " + duration);
        this.client.right(speed);
    },
    stop: function(){
        console.log("stop");
        this.client.stop();
    },
    turn : function(direction, angle, altitude) {

        console.log(new Date().toLocaleTimeString() + " : Configuring turn move...");
        console.log(new Date().toLocaleTimeString() + " : direction: '" + direction + "', angle: '" + angle + "', altitude: '" + altitude + "'");

        if(this.isInitialized === false){
            this.init();
        } else {
            this.createMission(this.client);
        }

        this.mission
            .hover(500)
            .go({x:0, y:0})
            .altitude(altitude);

        if(direction === 'left') {
            this.mission.ccw(angle);
        } else {
            this.mission.cw(angle);
        }

        this.startMission();
    },
    crane : function() {

        console.log(new Date().toLocaleTimeString() + " : Configuring crane move...");

        if(this.isInitialized === false){
            this.init();
        } else {
            this.createMission(this.client);
        }

        this.mission
            .hover(500)
            .go({x:0, y:0})
            .altitude(1.8)
            .hover(1000)
            .altitude(0.2)
            .hover(1000);
            //.land();

        this.startMission();
    },
    square : function() {

        console.log(new Date().toLocaleTimeString() + " : Configuring square move...");

        if(this.isInitialized === false){
            this.init();
        } else {
            this.createMission(this.client);
        }

        this.mission
            .hover(500)
            .go({x:0, y:0})
            .altitude(1.0)
            .hover(1000)
            .forward(0.5)
            .left(0.5)
            .backward(0.5)
            .right(0.5)
            .hover(1000);
//            .land();

        this.startMission();
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
    },

    altitude: function(height) {
        if(this.isInitialized === false){
            this.init();
        } else {
            this.createMission(this.client);
        }

        console.log("altitude " + height + " m");

        this.mission.altitude(height);
    }
};

module.exports.Copter = CopterApplication.NodeCopter;