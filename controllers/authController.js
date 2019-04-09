const express 	= require('express');
const router 	= express.Router();
const User 		= require('../models/userModel.js');
const cors 		= require('cors')
const bodyParser = require('body-parser')
// const ChatKit 	= require('@pusher/chatkit-server');


// /***Static***/
// const instanceLocator = 'v1:us1:1a9bd709-cbaf-4b9d-b48c-c1d84ce94ca3';
// const testToken = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/1a9bd709-cbaf-4b9d-b48c-c1d84ce94ca3/token';
// const key = '706e0a3a-c916-46ec-a12d-531051dd25ba:ZlWxtkrmCs/p0aE6rjjTgk4CGchqmKb9RLMig3CSjfw='

// const chatkit = new ChatKit.default({
// 	instanceLocator: instanceLocator,
// 	key: key
// })

// const bcrypt 	= require('bcrypt');

// **********************************************************************************
// ******************************** RESTFUL ROUTES **********************************
// **********************************************************************************


// ************************* REGISTER CREATE ROUTE ***************************

router.post('/register', async (req, res, next) => {

	try {
		// await User.deleteMany();

	    const user = await User.find({email: req.body.email}); // Check if user exists

	    console.log(`---------- user in /auth/register ----------\n`, user);

	    // const chatUserFind = await chatkit.findUser

	    if (user.length === 0){

	    	// const createChatUser = await chatkit.createUser({
				// 	id: req.body.username,
				// 	name: req.body.username
				// })

	    	// Hash password
				// const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

		    // Create object {} for database entry
		    const userDbEntry 		= {};

		    userDbEntry.nameFirst = req.body.nameFirst;
		    userDbEntry.nameLast 	= req.body.nameLast;
		    userDbEntry.company 	= req.body.company;
		    userDbEntry.email 		= req.body.email;
		    userDbEntry.password 	= req.body.password;
		    // userDbEntry.password = passwordHash;

		    const createdUser = await User.create(userDbEntry);

		    console.log(`---------- .post /register - createdUser: ----------\n`, createdUser);

	        // Initialize session (attach properties to session middleware, accessible through every route)
		    req.session.nameFirst = req.body.nameFirst;
		    req.session.nameLast  = req.body.nameLast;
		    req.session.email 	  = req.body.email;
		    req.session.logged    = true;
		    req.session.userId	  = createdUser.id;
		    // req.session.chatUser = createChatUser;

	    	console.log(`---------- .post /register - req.session: ----------\n`, req.session);

		    res.json({
		      status: 201,
		      data: 'Register Successful',
		      session: req.session
  		    });
	    
	    } else {
		    console.log('Sorry! This email has already been registered :(')
		    res.json({
		      status: 400,
		      data: 'Unable to Register (email already registered).',
		      session: req.session
		    });
	    }
	} catch(err){
		console.error(`---------- Error in /auth/register ----------\n`, err);
	    next(err);
	}
});


// ************************* LOGIN CREATE ROUTE ***************************

router.post('/login', async(req, res, next) => {

	try {
	    const user = await User.find({email: req.body.email})
	    // const authData = await chatkit.authenticate({ userId: req.query.user_id})

	    if (user.length !== 0 && user[0].password === req.body.password){

		    req.session.nameFirst = user[0].nameFirst;
		    req.session.nameLast  = user[0].nameLast;
		    req.session.email     = user[0].email;
		    req.session.company   = user[0].company;
		    req.session.logged    = true;
		    req.session.userId 	  = user[0]._id;
		    // req.session.authData = authData.body;

		    res.json({
		      status: 201,
		      data: 'Login Successful',
		      session: req.session
		    });

			console.log(`-------------------- User Entry --------------------\n`, req.session);

	    } else {
			console.log(`-------------------- User --------------------\n`, user);
			console.log(`-------------------- User Entry --------------------\n`, req.body);
	    console.log(`Invalid Username/Password`);

		    res.json({
		      status: 400,
		      data: 'Invalid Username/Password',
		      session: req.session
		    });
	    }
	} catch(err){
	    next(err);
	}
});

// ************************* LOGOUT INDEX ROUTE ***************************

router.get('/logout', (req, res) => {
	req.session.destroy((err)=>{ 
		if(err){
		    res.json({
		      status: 400,
		      data: 'Could Not Logout',
		      session: req.session
		    });
	  	} else {
		    res.json({
		      status: 201,
		      data: 'Logout Successful',
		      session: req.session
		    });
	  	}
  	});
});


module.exports = router;

// ***********************************************************************
// ******************************** END **********************************
// ***********************************************************************