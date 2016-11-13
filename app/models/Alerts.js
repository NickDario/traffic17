var Waterline = require('waterline');

var Alerts = Waterline.Collection.extend({
    identity:   'alerts',
    tableName:  'alerts',
    connection: 'psql_traffic',
    autoPK: true,
    attributes: {
        name: {
            type:          'string',
            required:       true
        }, 
        schedule_default: {
            type:   'text'  //  cron format
        },
        script: {
            type:   'string'    //  path of alert script
        },
    
        //  RELATIONS
        usersubs: {
            collection: 'subuseralerts',
            via: 'alert'
        }
    },
});

exports = module.exports = Alerts;


