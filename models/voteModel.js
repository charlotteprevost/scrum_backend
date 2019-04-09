const mongoose = require('mongoose');
const User 	   = require('./userModel');


const VoteSchema = new mongoose.Schema({
	voter:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	choice: {type: Number, enum: [0, .5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]}
});


module.exports = mongoose.model('Vote', VoteSchema);