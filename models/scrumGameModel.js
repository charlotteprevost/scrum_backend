const mongoose = require ('mongoose');
const User 	   = require('./userModel');
const Round    = require('./roundModel');


const GameSchema = new mongoose.Schema({
	title: 		  {type: String, required: true},
	description:  {type: String, required: true},
	scrumMaster:  User.schema,
	estimators:   [User.schema],
	rounds: 	  [Round.schema],
	status: 	  String,
	roomId: 	  String,
	date: 		  Date
});

module.exports = mongoose.model('Game', GameSchema);