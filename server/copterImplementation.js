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
        console.log("Copter takes off...");
        this.client.takeoff();
    },
    land : function(){
        console.log("Copter takes off...");
        this.client.land();
    },
    turnAround : function(direction, speed){
        console.log("Copter turns around...");
        if(direction === 'left'){
            this.client.counterClockwise(speed);
        } else{
            this.client.clockwise(speed);
        }
    }
}

module.exports.Copter = CopterApplication.NodeCopter;