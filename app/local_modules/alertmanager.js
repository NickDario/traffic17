var config = require('./config');
var notify = require('./notify');
var database = require('./database');
var alerts = require('./alerts');
var PythonShell = require('python-shell');

//
//  AlertManager tracks additions and removals to the schedule, initializeing the schedule as is needed
//


function AlertManager()
{
    this.alerts   = alerts;
    this.database = database;
    this.database.start();
}

AlertManager.prototype.refresh = function()
{
    //  Cancel all jobs that are being run
    this.alerts.clearAll();
    
    //  Retrieve Alerts with SubUserAlerts
    var subs = this.database.models.subuseralerts.find()
        .populate('alert')
        .then((subs)=>{
            return subs;
        });
    
    //  Schedule new alerts
    subs.then((usersub) => {
        for(var i=usersub.length;i --;) {
            var scriptname = usersub[i].alert.script;
            var schedule   = usersub[i].schedule();
            var options = {
                mode: 'text',
                scriptPath: '/home/tsuga/traffic17/alerts'
            };
            var pythonscript = PythonShell.run.bind(this, 'test.py', options, (err, response)=>{notify.simple(config.test.userid, response[0]);});
            this.alerts.scheduleOne(pythonscript, schedule)
        }
    });
}


exports = module.exports = new AlertManager();


