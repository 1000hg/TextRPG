var mongoose = require('mongoose');

var CharacterSchema = new mongoose.Schema({
	id : {type: String, required: true},
	name : {type: String, required: true},
	level : {type: Number, required: true},
	hp : {type: Number, required: true},
	mp : {type: Number, required: true},
	atk : {type: Number, required: true},
	def : {type: Number, required: true},
	luk : {type: Number, required: true},
	exp : {type: Number, required: true},
});

module.exports = mongoose.model('Character', CharacterSchema); 