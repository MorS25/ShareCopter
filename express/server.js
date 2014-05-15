var express = require('express');
var app = express();
var CopterFactory = require('../server/copterFactory');
var concreteFactory = new CopterFactory();
var copterInstance = concreteFactory.getCopterInstance("copter");

var Validator = require('../express/CommandValidator').CommandValidator;
var validator = new Validator();

app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});

// Initiation
app.get('/takeoff', function(req, res){
    res.send('OK');
    copterInstance.takeOff();
});

app.get('/land', function(req, res){
    res.send('OK');
    copterInstance.land();
});

app.get('/stop', function(req, res){
    res.send('OK');
    copterInstance.stop();
});

app.get('/altitude/:altitude', function(req, res){
    var height = validator.validateAltitude(req, res);
    res.send('OK');
    copterInstance.altitude(height);
});

// Standard Moves
app.get('/up/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    res.send('OK');
    copterInstance.up(speed, 1000);
});

app.get('/up/speed/:speed/duration/:duration', function(req, res){
    var speed = validator.validateSpeed(req, res);
    var duration = validator.validateDuration(req, res);
    res.send('OK');
    copterInstance.up(speed, duration);
});

app.get('/down/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    res.send('OK');
    copterInstance.down(speed, 1000);
});

app.get('/down/speed/:speed/duration/:duration', function(req, res){
    var speed = validator.validateSpeed(req, res);
    var duration = validator.validateDuration(req, res);
    res.send('OK');
    copterInstance.down(speed, duration);
});

app.get('/left/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    res.send('OK');
    copterInstance.left(speed, 1000);
});

app.get('/left/speed/:speed/duration/:duration', function(req, res){
    var speed = validator.validateSpeed(req, res);
    var duration = validator.validateDuration(req, res);
    res.send('OK');
    copterInstance.left(speed, duration);
});

app.get('/right/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    res.send('OK');
    copterInstance.right(speed, 1000);
});

app.get('/right/speed/:speed/duration/:duration', function(req, res){
    var speed = validator.validateSpeed(req, res);
    var duration = validator.validateDuration(req, res);
    res.send('OK');
    copterInstance.right(speed, duration);
});

app.get('/front/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    res.send('OK');
    copterInstance.front(speed, 1000);
});

app.get('/front/speed/:speed/duration/:duration', function(req, res){
    var speed = validator.validateSpeed(req, res);
    var duration = validator.validateDuration(req, res);
    res.send('OK');
    copterInstance.front(speed, duration);
});

app.get('/back/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    res.send('OK');
    copterInstance.back(speed, 1000);
});

app.get('/back/speed/:speed/duration/:duration', function(req, res){
    var speed = validator.validateSpeed(req, res);
    var duration = validator.validateDuration(req, res);
    res.send('OK');
    copterInstance.back(speed, duration);
});


// Special Moves
app.get('/crane', function(req, res){
    res.send('OK');
    copterInstance.crane();
});

app.get('/square', function(req, res){
    res.send('OK');
    copterInstance.square();
});

app.get('/turn/direction/:direction/angle/:angle', function(req, res){
    var direction = validator.validateDirection(req, res);
    var angle = validator.validateAngle(req, res);
    res.send('OK');
    copterInstance.turn(direction, angle, 1);
});

app.get('/turn/direction/:direction/angle/:angle/altitude/:altitude', function(req, res){
    var direction = validator.validateDirection(req, res);
    var angle = validator.validateAngle(req, res);
    var altitude = validator.validateAltitude(req, res);
    res.send('OK');
    copterInstance.turn(direction, angle, altitude);
});

app.get('/animate/:animation/duration/:duration', function(req, res){
    var animation = validator.validateAnimation(req, res);
    var duration = validator.validateDuration(req, res);
    res.send('OK');
    copterInstance.animate(animation, duration);
});

var http = require("http"),
    droneStream = require("dronestream");

app.get('/video/', function(req, res){
    require("fs").createReadStream(__dirname + "/videoStream.html").pipe(res);
});

// Callback
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

droneStream.listen(server);
