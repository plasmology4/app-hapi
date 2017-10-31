var mongoose = require("mongoose");
var db = require("../common.js");

var docLinkSchema = mongoose.Schema({
  name: String,
  id: String,
  desc: String,
  type: String,
  url: String,
  tags: [String]
});
var DocLink = db.model('DocLink', docLinkSchema);

var sectionSchema = mongoose.Schema({
  name: String,
  number: String,
  index: Number,
  label: String,
  desc: String,
  type: String,
  docLinks: [docLinkSchema]
});
var Section = db.model('Section', sectionSchema);

var binderSchema = mongoose.Schema({
  name: String,
  label: String,
  desc: String,
  type: String,
  version: String,
  authors: String,
  updated: Date,
  sections: [sectionSchema],
  docLinks: [docLinkSchema]
});
var Binder = db.model('Binder', binderSchema);

exports.findAll = function(callback) {
  return Binder.find({}, callback);
};

exports.findByName = function(name, callback) {
  return Binder.findOne({name: name}, callback);
};

exports.create = function(doc, callback) {
  Binder.create(doc, callback);
};

exports.update = function(doc, callback) {
  var id = doc._id;
  console.log("updating binder data with id:"+id);
  delete doc._id;
  doc.updated = new Date();

  Binder.update({_id: id}, doc, {upsert: true}, function(err, numberAffected, rawResponse) {
    console.log('err: '+err);
    console.log('numberAffected: '+JSON.stringify(numberAffected));
    console.log('rawResponse: '+rawResponse);
    callback(err, numberAffected);
  });
};

exports.delete = function(id, callback) {
  Binder.findByIdAndRemove(id, callback);
};

exports.deleteByName = function(name, callback) {
  Binder.findByIdAndRemove(id, callback);
};