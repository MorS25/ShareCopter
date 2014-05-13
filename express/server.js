var express = require('express');
var app = express();
var CopterFactory = require('../server/copterFactory');

var concreteFactory = new CopterFactory();
var copterInstance = concreteFactory.getCopterInstance("copter");

app.get('/takeoff', function(req, res){
    copterInstance.takeOff();
    res.send('OK');
})

app.get('/land', function(req, res){
    copterInstance.land();
    res.send('OK');
})

app.get('/turnaround', function(req, res){
    copterInstance.turnAround('left', 1);
    res.send('OK');
})

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});