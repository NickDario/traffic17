/*
	This file loads in ssl credentials
*/

var fs = require('fs');
var config = require('./config');

var privateKey = fs.readFileSync(__dirname+'/../../cred/'+config.ssl.key, 'utf8')
var certificate = fs.readFileSync(__dirname+'/../../cred/'+config.ssl.crt, 'utf8');
var authority  = fs.readFileSync(__dirname+'/../../cred/'+config.ssl.pem, 'utf8');

exports = module.exports = {
        key: privateKey,
        cert: certificate,
        ca: authority,
        passphrase: '5unshine'
};


