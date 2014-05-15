var arDrone = require('ar-drone');
var http    = require('http');

console.log('Connecting png stream ...');

var pngStream = arDrone.createClient().getPngStream();

var lastPng;
pngStream
    .on('error', console.log)
    .on('data', function(pngBuffer) {
        lastPng = pngBuffer;
    });

var server = http.createServer(function(req, res) {
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

server.listen(8080, function() {
    console.log('Serving latest png on port 8080 ...');
});