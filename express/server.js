var http    = require('http');
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
    copterInstance.up(speed);
});

app.get('/down/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    res.send('OK');
    copterInstance.down(speed);
});

app.get('/left/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    res.send('OK');
    copterInstance.left(speed);
});

app.get('/right/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    res.send('OK');
    copterInstance.right(speed);
});

app.get('/front/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    res.send('OK');
    copterInstance.front(speed);
});

app.get('/back/speed/:speed', function(req, res){
    var speed = validator.validateSpeed(req, res);
    res.send('OK');
    copterInstance.back(speed);
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

app.get('/turn/direction/:direction/speed/:speed', function(req, res){
    var direction = validator.validateDirection(req, res);
    var speed = validator.validateSpeed(req, res);
    res.send('OK');
    copterInstance.turnAround(direction, speed);
});

app.get('/animate/:animation/duration/:duration', function(req, res){
    var animation = validator.validateAnimation(req, res);
    var duration = validator.validateDuration(req, res);
    res.send('OK');
    copterInstance.animate(animation, duration);
});

// Callback
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

var client = copterInstance.getClient();

// stream video from websocket ws://localhost:3000
var droneStream = require("dronestream");

// NOTE: need to give the existing video stream in the options, if there is one
var videoStream = client.getVideoStream();
var streamOptions = { tcpVideoStream: videoStream };
droneStream.listen(server, streamOptions);

// --- image server ---

var pngStream = client.getPngStream();

var lastPng;
pngStream
    .on('error', console.log)
    .on('data', function(pngBuffer) {
        lastPng = pngBuffer;
    });

var imageServer = http.createServer(function(req, res) {
    if (!lastPng) {
        res.writeHead(503, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Authorization',
            'Access-Control-Allow-Methods': 'GET,PUT,PATCH,POST,DELETE'
        });

        res.end('Did not receive any png data yet.');
        return;
    }

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'GET,PUT,PATCH,POST,DELETE'
    });

    res.end(lastPng);
});

imageServer.listen(8080, function() {
    console.log('Serving latest png on port 8080 ...');
});