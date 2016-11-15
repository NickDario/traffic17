/**
	Run notifications as per a schedule
    
    Follows cron schedule format.
    
    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    |
    │    │    │    │    │    └ day of week  (0 - 7) (0 or 7 is Sun)
    │    │    │    │    └───── month        (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour         (0 - 23)
    │    └──────────────────── minute       (0 - 59)
    └───────────────────────── second       (0 - 59, OPTIONAL)

*/
var schedule = require('node-schedule');
var notify    = require('./notify');
var config    = require('./config');
var db        = require('./database');

var rule = new schedule.RecurrenceRule();
rule.second = [0, 5, 10, 15, 20,25,30,35,40,45,50,55];

db.start();

schedule.scheduleJob(rule,function()
{   
    notify.simple(config.test.userid, 'one');
});
schedule.scheduleJob(rule,function()
{   
    notify.simple(config.test.userid, 'two');
});


