var express = require('express');
var app = express();
var shareCopter = require('../server/copterFactory');

var CopterInstance = shareCopter.getCopterInstance("test");

app.get('/takeoff', function(req, res){
    CopterInstance.takeoff();
    res.send('OK');
})

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});