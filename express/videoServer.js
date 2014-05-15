var server = http.createServer(function(req, res) {

};
// note that the 'server' object points to a server instance and NOT an express app.
require("../lib/stream").listen(server);
// if your drone is on a different IP
require("dronestream").listen(server, {  ip: "192.168.2.155" });