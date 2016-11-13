/*
	This file configures express and applies the waterline orm wrapper found in database.js
*/

var fs          = require('fs');
var request     = require('request');
var http        = require('http');
var https       = require('https');
var express     = require('express');
var bodyParser  = require('body-parser');
var config      = require('config');
var database    = require('database');

//  Instantiate app
app = {};
////////////
//  Initialize ORM
////////////
database.init(function(err, models){
    app.models = models.collections;
    app.connections = models.connections;
})

console.log(app.models.alerts);



