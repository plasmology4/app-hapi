
var mongoose = require("mongoose");
var db = require("../common.js");

var deptSchema = mongoose.Schema({
  deptId: String
  , name: String
  , desc: String
});

var orgSchema = mongoose.Schema({
  orgId: String
  , name: String
  , website: String
  , logoUrl: String
  , info: String
  , specialties: String
  , contactInfo: String
  , status: String
  , departments: [deptSchema]
});

var Organization = db.model('Organization', orgSchema);

exports.findAll = function(callback) {
  Organization.find({  }, callback);
};

exports.findById = function(id, callback) {
  Organization.findById(id, callback);
};

exports.create = function(doc, callback) {
  Organization.create(doc, callback);
};

exports.update = function(doc, callback) {
  
  console.log('Updating Organization:'+JSON.stringify(doc));
  var id = doc._id;

  // Check for null > this is a new object
  if (!id) {
    id = mongoose.Types.ObjectId();
    doc._id = id;
  }

  console.log("updating org data with id:"+id);
  delete doc._id;

  Organization.update({_id: id}, doc, {upsert: true}, function(err, numberAffected, rawResponse) {
    console.log('err: '+err);
    console.log('numberAffected: '+JSON.stringify(numberAffected));
    console.log('rawResponse: '+JSON.stringify(rawResponse));
    callback(err, numberAffected);
  });
};

exports.delete = function(id, callback) {
  var _id = mongoose.Types.ObjectId(id);
  Organization.findByIdAndRemove(id, callback);
};

