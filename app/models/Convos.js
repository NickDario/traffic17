var Waterline = require('waterline');

var Convos = Waterline.Collection.extend({
    identity:   'convos',
    tableName:  'convos',
    connection: 'psql_traffic',
    autoPK: true,
    attributes: {
        fuid: {
            type:   'integer',
            required: true
        },
        seqid: {
            type:   'integer',
            required: true
        },
        filepath: {
            type:          'text',
            required:       true
        }, 
        //  RELATIONS
        user: {
            model: 'users',
            columnName: 'users_id',
            type:'integer'
        }
    },
});

exports = module.exports = Convos;


