var Waterline = require('waterline');
//var Connection = require('./connection');
//var psqlAdapter = require('waterline-postgresql');    //  Doesn't seem to pass tests. No documentation.
var psqlAdapter = require('sails-postgresql');
var config = require('./config');
/**
    @function Database(config){}
    This function acts as a wrapper for setting up the waterline ORM.
    It allows for:
    1.  Encapsulation
    2.  Selective model usage
**/
function Database()
{
    this.db = new Waterline();

    /////////////
    //  Config
    /////////////
    this.options = {
        adapters: {
            'default':  psqlAdapter,
            psql:       psqlAdapter
        },
        connections: {
            psql_traffic: config.database_conn
        }
    }

    /////////////
    //  Models
    /////////////   
    this.models = {
        "SubUserAlerts"  : require('../models/SubUserAlert'),
        "Alert"        : require('../models/Alerts')
    }
}

//  Initialization function.
//
//  callback = function(err,models){}
Database.prototype.init = function(callback, models)
{
    models = models || this.models;
    for(model in models){
        this.db.loadCollection(this.models[model]);
    }
    
    this.db.initialize(this.options, callback);
}

exports = module.exports = new Database();


