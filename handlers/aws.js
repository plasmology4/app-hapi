var AWS = require('aws-sdk');

var s3 = new AWS.S3();
var bucketName = "plaz4-bucket"

exports.initialize = function(callback) {
  // Get the list of buckets and check for the ones we need.
  //var s3bucket = new AWS.S3({params: {Bucket: 'users'}});
  
  s3.listBuckets(function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      console.log(data);           // successful response
    }     
  });


  // Try to create the plaz4-1 bucket to store app dat in
  var params = {Bucket: bucketName};
  var status = {title: 'Initialization Status', date: (new Date()).toString()};
  s3.createBucket(params, function(err, data) {
    if (err) {
      if(err.toString().indexOf("BucketAlreadyOwnedByYou") > -1) {
        status["bucketStatus"] = "BucketAlreadyOwnedByYou";
        console.log("Bucket " + bucketName + " already exists.");
      }
      else {
        console.log("Error: "+err, err.stack); // an error occurred
      }
      callback(null, status);
    }
    else {
      console.log("Complete: "+data); 
      status["bucketStatus"] = "BucketCreated";
      callback(err, status);          // successful response
    } 
  });

  var userIndexParams = { 
    Bucket: bucketname, 
    Key: 'userIndex',
    Body: {}
  };


  // s3bucket.createBucket(function() {
    
  //   var params = {Key: 'myKey', Body: 'Hello!'};
  //   s3bucket.upload(params, function(err, data) {
  //   if (err) {
  //     console.log("Error uploading data: ", err);
  //   } else {
  //     console.log("Successfully uploaded data to myBucket/myKey");
  //   }

  // });
//});




  

}


exports.getUser = function(userId) {

}

exports.createUser = function(user) {

}

exports.getDocumentStructure = function(id) {

}

exports.createDocumentStructure = function(structure) {

}

s3.createBucket({
  Bucket: 'myBucket'
}, function() {

  var params = {
    Bucket: 'myBucket',
    Key: 'myKey',
    Body: 'Hello!'
  };

  s3.putObject(params, function(err, data) {

    if (err)

      console.log(err)

    else console.log("Successfully uploaded data to myBucket/myKey");

  });

});