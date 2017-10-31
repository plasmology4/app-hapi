'use strict';

console.log("Loading user routes");

module.exports = function routes(options) {
  const Joi = require('joi');
  return [{
    method: 'GET',
    path: '/user',
    config: {
      handler: getAllUsers,
      notes: 'Returns all users',
      tags: ['api'], 
    }
  }, {
    method: 'GET',
    path: '/user/{id}',
    config: {
      handler: getUser,
      notes: 'Returns user for the given id',
      tags: ['api'], 
    }
  }, {
    method: 'POST',
    path: '/user',
    config: {
      handler: saveUser,
      notes: 'Saves the User',
      tags: ['api'], 
    }
  }, {
    method: 'DELETE',
    path: '/user/{id}',
    config: {
      handler: deleteUserById,
      notes: 'Deletes the User',
      tags: ['api'], 
    }
  }];
};

// User Routes
//var aws = require('./handlers/aws.js');
var user = require("../handlers/user");

function getAllUsers(request, reply) {
  console.log("Calling findAllUsers");
  user.findAllUsers(function(err, data) {
    return checkAndReply(err, data, reply);
  });
}

// Added this to exports so that it can be used by the authentication function
function getUsersByOrgId(request, reply) {
  if (request.params.id) {
    console.log("Calling getUsersByOrgId:" + request.params.orgId);
    user.findUsersByOrgId(request.params.orgId, function(err, data) {
      return checkAndReply(err, data, reply);
    });
  } else {
    reply({msg: "No id given"});
  }
}
// Added this to exports so that it can be used by the authentication function
function getUser(request, reply) {
  if (request.params.id) {
    console.log("Calling findUserById:" + request.params.id);
    user.findUserById(request.params.id, function(err, data) {
      return checkAndReply(err, data, reply);
    });
  } else {
    reply({msg: "No id given"});
  }
}
function deleteUserById(request, reply) {
  if (request.params.id) {
    console.log("Calling deleteUser:" + request.params.id);
    user.deleteUser(request.params.id, function(err, data) {
      return checkAndReply(err, data, reply);
    });
  } else {
    reply({msg: "No id given"});
  }
}

function saveUser(request, reply) {
  if (request.payload) {
    console.log("Calling upsertUser:" + JSON.stringify(request.payload.user));
    var object = request.payload.user;
    user.upsertUser(object, function(err, data) {
      return checkAndReply(err, data, reply);
    });
  } else {
    reply({msg: "No name given"});
  }
}

function checkAndReply(err, data, reply) {
  if (err) {
      return console.error(err);
    } else {
      if (!data) { 
        return reply({msg: "No data found"}); 
      }
      return reply(data);
    }
}

console.log("User routes loaded.");