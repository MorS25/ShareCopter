var express = require('express');
var app = express();
var shareCopter = require('../SampleScripts/simpleTakeoff');

app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});

app.get('/hello', function(req, res){
    res.send('Hello World');
});

app.get('/takeoff', function(req, res){
    shareCopter.takeoff();
    res.send('OK');
    console.log('Received take off command');
})

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});