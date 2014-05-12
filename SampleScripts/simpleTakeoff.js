var arDrone = require('ar-drone');
var client = arDrone.createClient();

function doSomething(){
    client.takeoff();

client
    .after(5000, function () {
        this.clockwise(0.5);
    })
    .after(1000, function () {
        this.stop();
        this.land();
    });
}

module.exports = {
    takeoff: function () {
        console.log("Received takeoff function call!");
        doSomething();
    }
};