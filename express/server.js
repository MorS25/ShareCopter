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
    copterInstance.takeOff();
    res.send('OK');
});

app.get('/land', function(req, res){
    copterInstance.land();
    res.send('OK');
});

app.get('/stop', function(req, res){
    copterInstance.stop();
    res.send('OK');
});


// Standard Moves
app.get('/up/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    copterInstance.up(speed, 1000);
    res.send('OK');
});

app.get('/up/speed/:speed/duration/:duration', function(req, res){
    var speed = validator.validateSpeed(req, res);
    var duration = validator.validateDuration(req, res);
    copterInstance.up(speed, duration);
    res.send('OK');
});

app.get('/down/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    copterInstance.down(speed, 1000);
    res.send('OK');
});

app.get('/down/speed/:speed/duration/:duration', function(req, res){
    var speed = validator.validateSpeed(req, res);
    var duration = validator.validateDuration(req, res);
    copterInstance.down(speed, duration);
    res.send('OK');
});

app.get('/left/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    copterInstance.left(speed, 1000);
    res.send('OK');
});

app.get('/left/speed/:speed/duration/:duration', function(req, res){
    var speed = validator.validateSpeed(req, res);
    var duration = validator.validateDuration(req, res);
    copterInstance.left(speed, duration);
    res.send('OK');
});

app.get('/right/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    copterInstance.right(speed, 1000);
    res.send('OK');
});

app.get('/right/speed/:speed/duration/:duration', function(req, res){
    var speed = validator.validateSpeed(req, res);
    var duration = validator.validateDuration(req, res);
    copterInstance.right(speed, duration);
    res.send('OK');
});

app.get('/front/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    copterInstance.front(speed, 1000);
    res.send('OK');
});

app.get('/front/speed/:speed/duration/:duration', function(req, res){
    var speed = validator.validateSpeed(req, res);
    var duration = validator.validateDuration(req, res);
    copterInstance.front(speed, duration);
    res.send('OK');
});

app.get('/back/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    copterInstance.back(speed, 1000);
    res.send('OK');
});

app.get('/back/speed/:speed/duration/:duration', function(req, res){
    var speed = validator.validateSpeed(req, res);
    var duration = validator.validateDuration(req, res);
    copterInstance.back(speed, duration);
    res.send('OK');
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
    copterInstance.animate(animation, duration);
    res.send('OK');
});


// Callback
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
