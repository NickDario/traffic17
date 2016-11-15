var Waterline = require('waterline');
//var Connection = require('./connection');
//var psqlAdapter = require('waterline-postgresql');    //  Doesn't seem to pass tests. No documentation.
var psqlAdapter = require('sails-postgresql');
var config = require('./config');
var fs = require('fs');
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
    this.models = {};
    this.initialized = false;
}

//  Initialization function.
//
//  callback = function(err,models){}
Database.prototype.start = function(callback)
{
    if(this.initialized){
        return true;
    }
    
    fs
      .readdirSync(__dirname + '/../models')
      .filter(function(file) {
        return (file.indexOf(".") !== 0);
      })
      .forEach(function(file) {
        var model = require(__dirname + '/../models/'+file);
        this.db.loadCollection(model);
      }.bind(this));
    
    this.db.initialize(this.options, (err, ontology) => {
        for(var model in ontology.collections){
            console.log(model);
            this.models[model] = ontology.collections[model];
        }
        callback(err, ontology);
    });
    this.initialized = true;
}


exports = module.exports = new Database();





