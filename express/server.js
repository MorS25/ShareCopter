var express = require('express');
var app = express();
var CopterFactory = require('../server/copterFactory');
var concreteFactory = new CopterFactory();
var copterInstance = concreteFactory.getCopterInstance("test");

var Validator = require('../express/CommandValidator').CommandValidator;
var validator = new Validator();

app.get('/takeoff', function(req, res){
    copterInstance.takeOff();
    res.send('OK');
});

app.get('/land', function(req, res){
    copterInstance.land();
    res.send('OK');
});

app.get('/turnaround/direction/:direction/speed/:speed', function(req, res){
    var direction = validator.validateDirection(req, res);
    var speed = validator.validateSpeed(req, res);
    copterInstance.turnAround(direction, speed);
    res.send('OK');
});

app.get('/up/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    copterInstance.up(speed);
    res.send('OK');
});

app.get('/down/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    copterInstance.down(speed);
    res.send('OK');
});

app.get('/left/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    copterInstance.left(speed);
    res.send('OK');
});

app.get('/right/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    copterInstance.right(speed);
    res.send('OK');
});

app.get('/front/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    copterInstance.front(speed);
    res.send('OK');
});

app.get('/back/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    copterInstance.back(speed);
    res.send('OK');
});

app.get('/animate/:animation/duration/:duration', function(req, res){
    var animation = validator.validateAnimation(req, res);
    var duration = validator.validateDuration(req, res);
    copterInstance.animate(animation, duration);
    res.send('OK');
});

app.get('/stop', function(req, res){
    copterInstance.stop();
    res.send('OK');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
