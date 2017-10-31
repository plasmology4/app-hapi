'use strict';
const userRoutes = require('./routes/user');
const orgRoutes = require('./routes/org');
const binderRoutes = require('./routes/binder');

// Set up MongoDB connection 
// var mongoConfig = require('./mongo.config.js');
// var mongoose = require('mongoose');

exports.register = function(server, options, next) {
  console.log("app-hapi Options: " + JSON.stringify(options));

  server.route(userRoutes(options));
  server.route(orgRoutes(options));
  server.route(binderRoutes(options));

  server.route({
    method: 'GET',
    path: '/status',
    handler: function(request, reply) {
      var rtnObj = { name: 'Plaz4 API', 
                     url: 'http://localhost:3030/app', 
                     version: '1.0', 
                     status: 'OK' };
      reply(rtnObj);
    }
  });


  console.log("app-hapi Routes Registered");

  next();

};

var users = require("./handlers/user");
exports.authenticate = function(username, password, callback) {
  var authenticated = false;
  var err;

  // TEST - Short Circuit
  //return callback(null, true);

  if (username) {
    if (password) {
      console.log("Calling findUserById:" + username);
      users.findUserById(username, function(err, data) {
        if (data.password == password) {
          authenticated = true;
          callback(err, authenticated, data);
        }
        else {
          callback("Password was not valid");
        }
        
      });
    }
    else {
      callback("No password given")
    }
  } else {
    callback("No username given");
  }
};

exports.register.attributes = {
  pkg: require('./package.json')
};