// Copter Implementation
var copterImplementation = function(){

    console.log("Creating new client...");

    var copterInterface = require('../copterInterface');
    var arDrone = require('ar-drone');

    var client = arDrone.createClient();

    copterImplementation.prototype = Object.create(copterInterface);

    copterImplementation.prototype.takeOff = function(){
        client.takeoff();
    };

    copterImplementation.prototype.land = function(){
        client.land();
    };

    copterImplementation.prototype.turnAround = function(direction, speed){
        if(direction === 'left'){
            client.counterClockwise(speed);
        } else{
            client.clockwise(speed);
        }
    };

    console.log("New copter instantiated!");
};

module.exports.Copter = copterImplementation;