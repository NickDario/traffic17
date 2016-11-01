var http = require('http');
var https = require('https');

//	Get Configuration
var config = require('config');

//	Generate SSL credentials
var credentials = require('credentials');

//	Generate App
var traffic = require('server');

//	Turn on server
var httpsServer = https.createServer(credentials, traffic.app).listen(config.port.https, function(){
	console.log('listening on *443');
});


