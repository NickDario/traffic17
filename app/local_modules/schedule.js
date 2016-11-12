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
var scheduler = require('node-schedule');
var notify    = require('./notify');

schedules.scheduleJob('5 * * * * *');


