const express 	= require('express');
const router 	= express.Router();
const User 		= require('../models/userModel.js');


/**************************************************************************************
 *********************************** RESTFUL ROUTES *********************************** 
 **************************************************************************************/


// ************************* USER INDEX ROUTE ************************** Show all users?

router.get('/', async (req, res, next) => {
	try {
		// await User.deleteMany();

	    const users = await User.find({});
	    res.json({
		    status: 200,
	        data: users,
	        session: req.session
	    });
	} catch(err){
	    next(err);
	}
});


// ************************* USER SHOW ROUTE *************************** Logged or no logged shows a user's page

router.get('/:id', async (req, res, next) => {
	try {
	    const user = await User.findById(req.params.id);
	    const scrumGames = await Game.find({'scrum_master': req.session.userId});
	    const estimatorGames = await Game.find({'estimator': req.session.userId});

	    // userNotes.forEach(note => {note.populate('author')});

	    // console.log(`---------- user ----------\n`, user);

	    res.json('../views/userViews/show.ejs', {
	    	user,
	    	session: req.session
	    })
	} catch(err){
	    next(err);
	}
});


// ************************* USER NEW ROUTE ****************************

router.get('/new', (req, res) => {
	res.redirect('/auth/register');
});


// ************************* USER EDIT ROUTE ***************************

// User can access this route only if logged on (user _id will be kept in session?)
// Route can only be accessed through link on "My Profile" (which is their own show page)
router.get('/:id/edit', async (req, res, next) => {	

    const user = await User.findById(req.params.id);

	try {
		if (req.session.logged && req.session.username === user.username) {		// If CORRECT user logged on, lead to user's edit page
		    res.json('../views/userViews/edit.ejs', {
		    	user,
		    	session: req.session
		    })

		} else {												// If not lead to auth/login page
			res.redirect('/auth/login');
		}
	} catch(err){
	    next(err);
	}
});


// ************************* USER CREATE ROUTE *************************

router.post('/', async (req, res, next) => {
	try {
	    res.redirect('/auth/register');
	} catch(err){
	    next(err);
	}
});


// ************************* USER UPDATE ROUTE *************************

router.put('/:id', async (req, res, next) => {
	try {
	    const user = await User.findByIdAndUpdate(req.params.id, req.body);
	    res.redirect('/users/' + req.params.id);
	} catch(err){
	    next(err);
	}
});


// ************************* USER DESTROY ROUTE *************************
router.delete('/:id', async (req, res, next) => {
	try {
		// Find User
		const user 		= await User.findById(req.params.id);

		/* ---------- Delete User ---------- */

		await user.delete();
		res.redirect('/users');

	} catch(err){
	    next(err);
	}
});


module.exports = router;

// ***********************************************************************
// ******************************** END **********************************
// ***********************************************************************