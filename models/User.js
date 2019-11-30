var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name : {type: String, required: true},
	id : {type: String, required: true, unique: true},
	password : {type: String, required: true, unique: true},
	update_ad : {type: Date, default : Date.now},
});

module.exports = mongoose.model('User', UserSchema); 