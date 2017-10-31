'use strict';

console.log("Loading organization routes");

module.exports = function routes(options) {
  const Joi = require('joi');
  return [{
    method: 'GET',
    path: '/org/{orgId}',
    config: {
      handler: getOrgById,
      notes: 'Returns the Organization for the orgId',
      tags: ['api'], 
    }
  },{
    method: 'GET',
    path: '/org/{orgId}/user',
    config: {
      handler: getUsersByOrgId,
      notes: 'Returns the Organization users for the orgId',
      tags: ['api'], 
    }
  }, {
    method: 'GET',
    path: '/org',
    config: {
      handler: getAllOrgs,
      notes: 'Returns all Organizations',
      tags: ['api'], 
    }
  }, {
    method: 'POST',
    path: '/org',
    config: {
      handler: saveOrg,
      notes: 'Saves the Organization',
      tags: ['api'], 
    }
  }, {
    method: 'DELETE',
    path: '/org/{id}',
    config: {
      handler: deleteOrgById,
      notes: 'Deletes the Organization',
      tags: ['api'], 
    }
  }
  ];
};

// User Routes
//var aws = require('./handlers/aws.js');
var org = require("../handlers/org");
var user = require("../handlers/user");

function getAllOrgs(request, reply) {
  console.log("Calling findAllOrgs");
  org.findAllOrgs(function(err, data) {
    return checkAndReply(err, data, reply);
  });
}

function getOrgById(request, reply) {
  if (request.params.orgId) {
    console.log("Calling findOrgById:" + request.params.orgId);
    org.findOrgById(request.params.orgId, function(err, data) {
      return checkAndReply(err, data, reply);
    });
  } else {
    reply({msg: "No orgId given"});
  }
}

function getUsersByOrgId(request, reply) {
  if (request.params.orgId) {
    console.log("Calling getUsersByOrgId:" + request.params.orgId);
    user.findUsersByOrgId(request.params.orgId, function(err, data) {
      return checkAndReply(err, data, reply);
    });
  } else {
    reply({msg: "No id given"});
  }
}

function deleteOrgById(request, reply) {
  if (request.params.id) {
    console.log("Calling deleteOrg:" + request.params.id);
    org.deleteOrg(request.params.id, function(err, data) {
      return checkAndReply(err, data, reply);
    });
  } else {
    reply({msg: "No id given"});
  }
}

function saveOrg(request, reply) {
  if (request.payload) {
    console.log("Calling upsertOrg:" + JSON.stringify(request.payload.org));
    var object = request.payload.org;
    org.upsertOrg(object, function(err, data) {
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

console.log("Org routes loaded.");