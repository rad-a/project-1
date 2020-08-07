// Add Dependencies
const express = require('express');
// Placeholder

const router = express.Router();

// Require Models
const { Pet } = require('../models');

//
// Routes ------------------------------------------------------------
//

router.get('/', async function(req, res){
	// Check if user is logged in, if not return 400 Not Authorised
	if(!req.user){
		res.json({
			code: '400',
			message: 'No user logged in'
		});
		return;
	}

	console.log(req.user);

	// Set current user object
	const thisUser = req.user;

	const petArr = await Pet.findAll({
		where: {
			userId: thisUser.id
		}
	});

	console.log(petArr);

	if(petArr.length == 0){
		res.render('error', {
			code: 404,
			message: 'No pets found for this user!'
		});
	}
});


module.exports = router;