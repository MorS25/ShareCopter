
var copterImplementation = function(){

    console.log("Creating new client...");

    var copterInterface = require('../copterInterface');
    var arDrone = require('ar-drone');

    var client = arDrone.createClient();

    copterImplementation.prototype = Object.create(copterInterface);

    copterImplementation.prototype.takeOff = function(){
        //actual add item code
    };

    copterImplementation.prototype.land = function(){
        //actual add item code
    };

    copterImplementation.prototype.turnAround = function(direction, speed){
        //actual add item code
    };

    console.log("New copter instantiated!");
}