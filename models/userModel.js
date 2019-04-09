const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema({
	nameFirst: 	{type: String, required: true},
	nameLast: 	{type: String, required: true},
	company:  	{type: String, required: true},
	email: 	  	{type: String, required: true},
	password: 	{type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);