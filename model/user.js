var mongoose = require("mongoose");
var db = require("../common.js");

var userSchema = new mongoose.Schema({
    id: String
    , orgId: String
    , locId: String
    , title: String
    , firstname: String
    , lastname: String
    , password: String
    , email: String
    , phone: String
    , status: String
    , role: String
    , twitter: String
    , facebook: String
    , videoStatus: String
});

var authSchema = new mongoose.Schema({
    email : String
    , userId : String
    , orgId : String
    , expires : Date
});

var User = db.model('User', userSchema);
exports.User = User;

exports.findAll = function(callback) {
  console.log("1");
  User.find({}, function (err, data) {
    console.log("2");
    if (err) 
      return console.error(err);
    else {
      console.log("3:"+data);
      return callback(err, data)
    }
  });
};

exports.findById = function(id, callback) {
  User.findOne({ id: id }, function(err, data) {
    if (err) { 
      return callback(err); 
    }
    console.log('findUserById:' + id + ' successful');
    return callback(null, data);
  });
};

exports.findByOrgId = function(orgId, callback) {
  console.log("findByOrgId");
    
  User.find({orgId: orgId}, function (err, data) {
    console.log("2");
    if (err) 
      return console.error(err);
    else {
      console.log("3:"+data);
      return callback(err, data)
    }
  });
};



// exports.findAll = function(callback) {
//   User.find({  }, callback);
// };

// exports.findById = function(id, callback) {
//   User.findById(id, callback);
// };

// exports.findByEmail = function(email, callback) {
//   User.findOne({ email: email }, function(err, user) {
//     if (err) { 
//       return callback(err); 
//     }
//     console.log('findUserByEmail:' + email + ' successful');
//     return callback(null, user);
//   });
// };

exports.create = function(doc, callback) {
  User.create(doc, callback);
};

exports.update = function(doc, callback) {

  console.log('Updating User:'+JSON.stringify(doc));
  var id = doc._id;

  // Check for null > this is a new object
  if (!id) {
    id = mongoose.Types.ObjectId();
    doc._id = id;
  }

  console.log("updating org data with id:"+id);
  delete doc._id;

  User.update({_id: id}, doc, {upsert: true}, function(err, numberAffected, rawResponse) {
    console.log('err: '+err);
    console.log('numberAffected: '+numberAffected);
    console.log('rawResponse: '+rawResponse);
    callback(err, numberAffected);
  });
};

exports.delete = function(id, callback) {
  User.findByIdAndRemove(id, callback);
};

// // Used for authorization
// exports.findByUsername = function(username, callback) {
//   console.log('Finding user: ' + username);
//   console.log('callback: ' + callback);
//   User.findOne({ email: username }, callback);
// };

// // Used for authorization
// exports.findOne = function(username, password, done) {
//   console.log('Finding user: ' + username + '/' + password);
//   console.log('done: ' + done);
//   User.findOne({ email: username }, function(err, user) {
//     if (err) { return done(err); }
//     if (!user) {
//       console.log('Incorrect username.');
//       return done('Incorrect username.', null, { message: 'Incorrect username.' });
//     }
//     if (password != user.password) {
//       console.log('Incorrect password.');
//       return done('Incorrect password.', null, { message: 'Incorrect password.' });
//     }
//     console.log('Authenticated.');
//     return done(null, user,  { message: 'User Information Authenticated.' });
//   });
// };






