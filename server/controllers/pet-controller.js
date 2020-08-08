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


	// Set current user object
	const thisUser = req.user;

	const petArr = await Pet.findAll({
		where: {
			userId: thisUser.id
		}
	});


	if(petArr.length == 0){
		res.render('error', {
			code: 404,
			message: 'No pets found for this user!'
		});
	}
});

router.get('/add', async (req, res) => {
	res.render('petAdd',{
		welcomeMessage: `Welcome back ${req.user.username}!`,
		pageMsg: 'You know the drill'
	});
});

router.post('/add', async (req, res) => {

	if(!req.user){
		res.render('error', {
			code: '400',
			message: 'No user logged in'
		});
		return;
	}

	const thisUser = req.user;

	const pet = await Pet.create({
		petName: req.body.petName,
		petAge: req.body.petAge,
		petBreed: req.body.petBreed,
		petGender: req.body.petGender,
		UserId: req.user.id
	});

	res.send(pet);
});

router.delete('/', async (req, res) => {

	if(!req.user){
		res.render('error', {
			code: '400',
			message: 'No user logged in'
		});
		return;
	}

	console.log(req.body);

	const result = await Pet.destroy({
		where: {
			id: req.body.id
		}
	});

	res.json(result);
});

module.exports = router;