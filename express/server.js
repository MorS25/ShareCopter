var express = require('express');
var app = express();
var CopterFactory = require('../server/copterFactory');
var copterFactory = new CopterFactory();

var copterInstance = copterFactory.getCopterInstance("test");

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



var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});