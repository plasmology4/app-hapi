var user = require("../model/user");

exports.findAllUsers = function (callback) {
  console.log("findAllUsers");
  user.findAll(callback);
}

exports.findUserById = function (id, callback) {
  console.log("findUserById:"+id);
  user.findById(id, function(err, data){
  	console.log("User Found:"+JSON.stringify(data));
  	callback(null, data);
  });
}

exports.findUserByOrgId = function (orgId, callback) {
  console.log("findUserByOrgId:"+orgId);
  user.findByOrgId(orgId, function(err, data){
  	console.log("Users Found:"+JSON.stringify(data));
  	callback(null, data);
  });
}

exports.deleteUser = function (id, callback) {
  console.log("deleteUser: "+ id);
  user.delete(id, callback);
}

exports.upsertUser = function(object, callback) {
  console.log("upsertUser:" + JSON.stringify(object));
  console.log("upsert object type:" + (typeof object));
  console.log("upsertUser._id:" + object['_id']);
  user.update(object, callback);	
}