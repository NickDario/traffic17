var config      = require('config');
var notify      = require('notify');
var database    = require('database');
var alerts      = require('alerts');
var PythonShell = require('python-shell');

//
//  AlertManager tracks additions and removals to the schedule, initializeing the schedule as is needed
//


function AlertManager()
{
    this.alerts   = alerts;
    this.database = database;
}

AlertManager.prototype.refresh = function()
{
    //  Cancel all jobs that are being run
    this.alerts.clearAll();
    
    //  Retrieve Alerts with SubUserAlerts
    var subs = this.database.models.subuseralerts.find()
        .populate('alert')
        .populate('user')
        .then((subs)=>{
            return subs;
        });
    
    //  Schedule new alerts
    subs.then((usersubs) => {
        for(var i=usersubs.length;i --;) {
            var subscription = usersubs[i];
            var scriptname = subscription.alert.script;
            var schedule   = subscription.schedule();
            var options = {
                mode: 'text',
                scriptPath: config.alerts.alertpath
            };
            console.log(scriptname +' scheduled at '+ schedule);
            var pythonscript = PythonShell.run.bind(this, scriptname, options, (err, response) => {
                notify.simple(subscription.user.fuid, response[0] + '\n' + response[1]);
            });
            this.alerts.scheduleOne(pythonscript, schedule)
        }
    });
}


exports = module.exports = new AlertManager();


