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
        alert_id: {
            type:'integer'
        }
    },
});

exports = module.exports = SubUserAlert;


