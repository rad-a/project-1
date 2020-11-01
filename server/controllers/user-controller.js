// Add Dependencies
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

// Require models
const { User } = require('../models');

//
// Routes ------------------------------------------------------------
//

// Registration
router.post('/register', async (req, res) => {

	try {
		const saltRounds = await bcrypt.genSalt(10);
		// Hash password
		const hash = await bcrypt.hash(req.body.password, saltRounds);

		let user;
		let created;

		console.log(req.body)

		// Create user object using hashed password
		User.findOrCreate({
			where: {
				username: req.body.username
			},
			defaults: {
				username: req.body.username,
				password: hash,
				email: req.body.email,
				profileImg: req.body.profileImg
			}
		}).then(async result => {
			user = result[0];
			created = result[1];

			if(created){
				// Create data object from user and auth token
				let data = await user.authorize();
	
				// Send back new user and auth token
				return res.json(data);
			} else if(!created) {
				return res.json({
					code: 400,
					message: "User already exists, please log in"
				});
			}
		});
		
		/*let user = await User.create(
			Object.assign(req.body, { password: hash })
		);*/

	} catch(err){
		console.log(err);
		return res.status(400).send(err);
	}
});

// Login
router.post('/login', async (req, res) => {
	// Create object from request
	const { username, password } = req.body;
	
	//console.log(req);

	// Check if valid request
	if(!username || !password){
		return res.status(400).send('Missing username or password');
	}

	try{
		// Try logging in the user, if valid create user object
		let user = await User.authenticate(username, password);

		//console.log(user);
		// Verify user object is valid
		// user = await user.authorize();

		// Return user object when logged in
		return res.json(user);
	} catch(err){
		console.log(err);
		return res.json({
			code: 400,
			message: "Invalid Password or User Does Not Exist"
		});
	}
});

// Logout
router.post('/logout', async (req, res) => {
	// See if user is present in request in cookies
	const { user, cookies: { auth_token: authToken } } = req;

	// If both exist, call user's logout method with authToken then return No Content
	if(user && authToken){
		await req.user.logout(authToken);
		return res.status(204).send();
	}

	// If user is not found in request, return error, Bad Request
	return res.status(400).send({ errors: [{ message: 'Not Authenticated ' }] });
});

// WhoAmI
router.get('/', (req, res) => {
	// Check if user exists in request, then return
	// console.log(req);
	
	
	if(req.user){
		return res.send(req.user);
	} else {
		res.status(404).send({ errors: [{ message: 'User Not Found or Missing Auth Token' }] });
	}
});

// get all users
router.get('/allUsers',async (req, res) => {
	
	try{
	
		const allUsers=await User.findAll({})
		// console.log(allUsers);
		res.send(allUsers)
	} catch(err){
		console.log(err);
	}
	
});


module.exports = router;