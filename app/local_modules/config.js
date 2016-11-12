var ini = require('ini');
var fs = require('fs');
exports = module.exports = ini.parse(fs.readFileSync(__dirname+'/../config.ini', 'utf8'));


