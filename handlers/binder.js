var binder = require("../model/binder");

exports.findAllBinders = function (callback) {
  console.log("findAllBinders");
  binder.findAll(callback);
}

exports.findBinderByName = function (name, callback) {
  console.log("findBinderByName: "+ name);
  binder.findByName(name, callback);
}

exports.deleteBinder = function (id, callback) {
  console.log("deleteBinder: "+ id);
  binder.delete(id, callback);
}

exports.upsertBinder = function(object, callback) {
  console.log("upsertBinder:" + object);
  console.log("upsert object type:" + (typeof object));
  console.log("upsertBinder._id:" + object['_id']);
  binder.update(object, callback);	
}


