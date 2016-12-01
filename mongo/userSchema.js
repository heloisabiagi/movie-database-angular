module.exports = function(app) {

	var Mongoose = require('Mongoose');

	var userSchema = new Mongoose.Schema({
	  username: { type: String },
	  password: { type: String },
	});

	var User = Mongoose.model('User', userSchema);

	var methods = {
		getList : function(callback) {
	      User.find()
	      .exec(function (err, result) {
	        callback(err, result || []);
	      });
	    },
	    get : function(id, callback) {
	      if(!id) return callback(null, {});

	      User.findById(id)
	      .exec(function (err, result) {
	        callback(err, result || {});
	      });
	    },
		new : function(data, callback) {
	      var user = new User(data);

	      user.save(function (err, result) {
	        callback(err, result || {});
	      });
	    },
	    remove : function(id, callback) {
	      if(!id) return callback({});

	      User.findByIdAndRemove(id, function (err, result) {
	        callback(err, result || {});
	      });
	    },
	    update : function(id, data, callback) {
	      if(!id) return callback({});

	      delete data._id;
	      delete data.created_at;
	      data.modified_at = new Date();

	      User.findByIdAndUpdate(id, { $set: data }, function (err, result) {
	        callback(err, result || {});
	      });
	    },
	    search : function(username, callback) {
	      if(!username) return callback({});

	      User.find({ username: new RegExp(username, "gi") })
	      .exec(function (err, result) {
	        callback(err, result || []);
	      });
	  	  
	    }
	}

	var Public = {};
	Public.User = User;
	Public.methods = methods;

	return Public;

}