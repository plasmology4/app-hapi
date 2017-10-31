'use strict';

console.log("Loading binder routes");

module.exports = function routes(options) {
  const Joi = require('joi');
  return [{
    method: 'GET',
    path: '/binders',
    config: {
      handler: getAllBinders
    }
  }, {
    method: 'POST',
    path: '/binders',
    config: {
      handler: saveBinder
    }
  }, {
    method: 'GET',
    path: '/binders/{name}',
    config: {
      handler: getBinderByName
    }
  }, {
    method: 'DELETE',
    path: '/binders/{id}',
    config: {
      handler: deleteBinderById
    }
  }
  ];
};

// User Routes
//var aws = require('./handlers/aws.js');
var binders = require("../handlers/binder");

function getAllBinders(request, reply) {
  console.log("Calling findAllBinders");
  binders.findAllBinders(function(err, data) {
    return checkAndReply(err, data, reply);
  });
}

function getBinderByName(request, reply) {
  if (request.params.name) {
    console.log("Calling findBinderByName:" + request.params.name);
    binders.findBinderByName(request.params.name, function(err, data) {
      return checkAndReply(err, data, reply);
    });
  } else {
    reply({msg: "No name given"});
  }
}

function deleteBinderById(request, reply) {
  if (request.params.id) {
    console.log("Calling deleteBinder:" + request.params.id);
    binders.deleteBinder(request.params.id, function(err, data) {
      return checkAndReply(err, data, reply);
    });
  } else {
    reply({msg: "No name given"});
  }
}

function saveBinder(request, reply) {
  if (request.payload) {
    console.log("Calling upsertBinder:" + request.payload);
    var object = JSON.parse(request.payload);
    binders.upsertBinder(object, function(err, data) {
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

console.log("Binder routes loaded.");