var Waterline = require('waterline');

var Users = Waterline.Collection.extend({
    identity:   'users',
    tableName:  'users',
    connection: 'psql_traffic',
    autoPK: true,
    attributes: {
        fuid: {
            type:   'text',
            required: true
        },
        name: {
            type:          'string',
            defaultsTo:        '',
        }, 
        //  RELATIONS
        conversations: {
            collection: 'convos',
            via: 'user'
        },
        alertsubs: {
            collection: 'subuseralerts', 
            via: 'user'
        }
    },
});

exports = module.exports = Users;


