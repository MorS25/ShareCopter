var express = require('express');
var app = express();
var shareCopter = require('../SampleScripts/simpleTakeoff');

app.get('/hello', function(req, res){
    res.send('Hello World');
});

app.get('/takeoff', function(req, res){
    shareCopter.takeoff();
    res.send('OK');
})

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});