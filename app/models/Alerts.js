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
    },
});

exports = module.exports = Alerts;


