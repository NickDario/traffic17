var tls = require('tls');
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync(__dirname + '/../cred/stormy.key', 'utf8')
var certificate = fs.readFileSync(__dirname + '/../cred/2_www.stormy.blue.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate, passphrase: '5unshine'};
var express = require('express');
var app = express();
var httpsServer = https.createServer(credentials, (req, res) => {
	res.writeHead(200);
	res.end('hello world\n');
}).listen(50344, function(){
	console.log('listening on *443');
});


