var org = require("../model/org");

exports.findAllOrgs = function (callback) {
  console.log("findAllOrgs");
  org.findAll(callback);
}

exports.findOrgByName = function (name, callback) {
  console.log("findOrgByName: "+ name);
  org.findByName(name, callback);
}

exports.deleteOrg = function (id, callback) {
  console.log("deleteOrg: "+ id);
  org.delete(id, callback);
}

exports.upsertOrg = function(object, callback) {
  console.log("upsertOrg:" + JSON.stringify(object));
  console.log("upsert object type:" + (typeof object));
  console.log("upsertOrg._id:" + object['_id']);
  org.update(object, callback);	
}


