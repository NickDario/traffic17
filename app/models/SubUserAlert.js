var Waterline = require('waterline');

var SubUserAlert = Waterline.Collection.extend({
    identity:   'subuseralerts',
    tableName:  'sub_user_alert',
    connection: 'psql_traffic',
    autoPK: true,
    attributes: {
        user_id: {
            type: 'integer'
        },
        alert: {
            model: 'alerts',
            columnName: 'alert_id',
            type: 'integer',
        },
        user: {
            model: 'users',
            columnName: 'user_id',
            type: 'integer',
        },
        schedule_choice: {
            type: 'text',    //  cron format
            defaultsTo: null
        },
        schedule: function(){
            if(this.schedule_choice == null){
                return this.alert.schedule_default;
            } else {
                return this.schedule_choice;
            }
        }
    },
});

exports = module.exports = SubUserAlert;


