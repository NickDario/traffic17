var notify = require('notify');
var database = require('database');
var convo = require('converse');
var config = require('config');
var PythonShell = require('python-shell');

MessageHandler = function() 
{   
    this.database = database;
    this.notify = notify;
    this.convo = convo;
  //  this.parse = parser;
}

//  Parse a message and respond
MessageHandler.prototype.handleEvent = function(messageEvent)
{
    var text = messageEvent.message.text;
    var uid  = messageEvent.sender.id;
    var user = this.database.models.users.find({where:{fuid:uid}}).then((user)=>{
        if(user.length == 0) {
            var user = this.database.models.users.create({fuid:uid}).exec((err, records) => {
                return records;
            });
        }
        console.log(user);
        return user;
    });
    var command = text.toLowerCase().split(' ');
    switch(command[0]){
        case 'echo': 
            if(command.length > 1){
                this.notify.simple(uid, command[1]);
            } else {
                this.notify.simple(uid, '');
            }
            break;
        case 'trigger':
            if(command.length < 2){
                this.notify.simple(uid, 'Trigger <alert>');
            } else {
                var alertname = command[1];
                var alerts = this.database.models.alerts.find({where:{name:alertname}, limit:1}).then((alerts) => { return alerts });    
                alerts.then((alerts)=> {
                    console.log(alerts[0]);
                    var scriptname = alerts[0].script;
                    var options = {
                        mode: 'text',
                        scriptPath: config.alerts.alertpath
                    };
                    var pythonscript = PythonShell.run.bind(this, scriptname, options, (err, response)=>{notify.simple(uid, response[0] +'\n'+ response[1]);});
                    pythonscript();
                    this.notify.simple(uid, 'triggered '+scriptname);
                });
            }
            break;
        case 'list':
            if(command.length < 2){
                var alerts = this.database.models.alerts.find()
                    .then((alerts) => {return alerts;});
                alerts.then((alertlist) => {
                    var message = 'The available alerts are\n';
                    for(var i=alertlist.length;i --;){
                        message += alertlist[i].name + '\n';
                    }
                    this.notify.simple(uid, message);
                });                
                //console.log(message);
            }
            break;
        default:
            this.notify.simple(uid, 'Not a valid command');
    }
}

MessageHandler.prototype.echo = function(string){
    return string;
}

//  Trigger an alert without waiting for its scheduled time
MessageHandler.prototype.trigger_alert = function(){}

//  Remove a sub_user_alerts row
MessageHandler.prototype.cancel_sub = function(){}

//  Add a sub_user_alerts row
MessageHandler.prototype.create_sub = function(){}


exports = module.exports = new MessageHandler()


