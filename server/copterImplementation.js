// Copter Implementation
var CopterApplication = CopterApplication || {};

CopterApplication.NodeCopter = function(){
    console.log("Creating new client...");

    var copterInterface = require('../server/copterInterface')
        , ardrone = require('ar-drone')
        , autonomy = require('ardrone-autonomy')
        ;

    this.prototype = Object.create(copterInterface);
    this.client = ardrone.createClient(options);

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

        if(this.isInitialized === false){
            this.init();
        } else {
            this.createMission(this.client);
        }

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

/*    function navdata_option_mask(c) {
        return 1 << c;
    }*/

// From the SDK.
/*    var navdata_options = (
        navdata_option_mask(arDroneConstants.options.DEMO)
        | navdata_option_mask(arDroneConstants.options.VISION_DETECT)
        | navdata_option_mask(arDroneConstants.options.MAGNETO)
        | navdata_option_mask(arDroneConstants.options.WIFI)
        );*/

// Land on ctrl-c
/*    var exiting = false;
    var theMission = this.mission;
    process.on('SIGINT', function() {
        if (exiting) {
            process.exit(0);
        } else {
            console.log('Got SIGINT. Landing, press Control-C again to force exit.');
            exiting = true;
            theMission.control().disable();
            theMission.client().land(function() {
                process.exit(0);
            });
        }
    });*/

// Connect and configure the drone
/*    this.mission.client().config('general:navdata_demo', true);
    this.mission.client().config('general:navdata_options', navdata_options);
    this.mission.client().config('video:video_channel', 1);
    this.mission.client().config('detect:detect_type', 12);*/

// Log mission for debugging purposes
    //this.mission.log("mission-" + dateFormat(new Date(), "yyyy-mm-dd_hh-MM-ss") + ".txt");

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
        var client = this.client;
        setTimeout(function(){client.stop();}, duration);
    },
    down: function(speed, duration){
        console.log("down " + speed + ", duration " + duration);
        this.client.down(speed);
        var client = this.client;
        setTimeout(function(){client.stop();}, duration);
    },
    front: function(speed, duration){
        console.log("front " + speed + ", duration " + duration);
        this.client
            .after(100, function() {
                this.front(speed);
            })
            .after(duration, function() {
                this.stop();
            });
    },
    back: function(speed, duration){
        console.log("back " + speed + ", duration " + duration);
        this.client
            .after(100, function() {
                this.back(speed);
            })
            .after(duration, function() {
                this.stop();
            });
    },
    left: function(speed, duration){
        console.log("left " + speed + ", duration " + duration);
        this.client
            .after(100, function() {
                this.left(speed);
            })
            .after(duration, function() {
                this.stop();
            });
    },
    right: function(speed, duration){
        console.log("right " + speed + ", duration " + duration);
        this.client
            .after(100, function() {
                this.right(speed);
            })
            .after(duration, function() {
                this.stop();
            });
    },
    stop: function(){
        console.log("stop");
        this.client.stop();
    },
    turnAround : function(direction, speed){
        console.log("turnAround " + direction + ", " + speed);
        if(direction === 'left'){
            this.client.counterClockwise(speed);
        } else{
            this.client.clockwise(speed);
        }
    },
    crane : function() {

        console.log(new Date().toLocaleTimeString() + " : Configuring crane move...");

        this.mission
            .altitude(1.8)
            .hover(1000)
            .altitude(0.2)
            .hover(1000);
            //.land();

        this.startMission();
    },
    square : function() {

        console.log(new Date().toLocaleTimeString() + " : Configuring square move...");

        this.mission
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
    }
};

module.exports.Copter = CopterApplication.NodeCopter;