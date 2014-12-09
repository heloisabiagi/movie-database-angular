module.exports = function(app) {

	var Mongoose = require('Mongoose');

	var actorSchema = new Mongoose.Schema({
	  name: { 
	  	first: { type: String},
	  	last: { type: String } 
	  },
	  dateOfBirth: { type: Date },
	  placeOfBirth: { type: String }
	});

	var Actor = Mongoose.model('Actor', movieSchema);

	var methods = {
		getList : function(callback) {
	      Actor.find()
	      .exec(function (err, result) {
	        callback(err, result || []);
	      });
	    },
		new : function(data, callback) {
	      var actor = new Actor(data);

	      actor.save(function (err, result) {
	        callback(err, result || {});
	      });
	    },
	    remove : function(id, callback) {
	      if(!id) return callback({});

	      Actor.findByIdAndRemove(id, function (err, result) {
	        callback(err, result || {});
	      });
	    },
	    search : function(term, callback) {

	      if(!term || term == "") {
	      	Actor.find()
		      .exec(function (err, result) {
		        callback(err, result || []);
		      });

	      } else {
		      	Actor.find({ title: new RegExp(term, "gi") })
		      .exec(function (err, result) {
		        callback(err, result || []);
		      });
	  	  }
	    }
	}

	return methods;

}