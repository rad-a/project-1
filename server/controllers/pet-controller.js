// Add Dependencies
const express = require("express");
// Placeholder

const router = express.Router();

// Require Models
const { Pet, User } = require("../models");
const { request } = require("express");
const { Op } = require("sequelize");

//
// Routes ------------------------------------------------------------
//

router.get("/", async function (req, res) {
	// Check if user is logged in, if not return 400 Not Authorised
	if (!req.user) {
		res.json({
			code: "400",
			message: "No user logged in",
		});
		return;
	}

	// Set current user object
	const thisUser = req.user;

	const petArr = await Pet.findAll({
		where: {
			userId: thisUser.id,
		},
	});

	if (petArr.length == 0) {
		res.render("error", {
			code: 404,
			message: "No pets found for this user!",
		});
	}
});

router.get("/add", async (req, res) => {
	res.render("petAdd", {
		welcomeMessage: `Welcome back ${req.user.username}!`,
		pageMsg: "You know the drill",
	});
});

router.post("/add", async (req, res) => {
	if (!req.user) {
		res.render("error", {
			code: "400",
			message: "No user logged in",
		});
		return;
	}

	const pet = await Pet.create({
		petName: req.body.petName,
		petAge: req.body.petAge,
		petBreed: req.body.petBreed,
		petGender: req.body.petGender,
		UserId: req.user.id,
	});

	const petCount = await Pet.count({
		where: {
			UserId: req.user.id,
		},
	});

	await User.update(
		{ numPets: petCount },
		{
			where: {
				id: req.user.id,
			},
		}
	);

	res.send(pet);
});

router.get("/search", async (req, res) => {
	let pAge = req.query.petAge;
	let pBreed = req.query.petBreed;
	let pGender = req.query.petGender;
	let ageRange;

	console.log(pAge);
	if (pAge == 0) {
		const result = await Pet.findAll({
			where: {
				petBreed: pBreed,
				petGender: pGender,
			},
		});
		res.send(result);
		return;
	} else if (pAge == 1) {
		console.log('yeet')
		ageRange = [0, 1];
	} else if (pAge == 2) {
		ageRange = [1, 3];
	} else if (pAge == 3) {
		 ageRange = [3, 7];
	} else if (pAge == 4) {
		ageRange = [7, 99];
	} else {
		res.send({
			code: 400,
			message: "An error occured",
		});
		return;
	}
	const result = await Pet.findAll({
		where: {
			petBreed: pBreed,
			petGender: pGender,
			petAge: {
				[Op.between]: ageRange,
			},
		},
	});
	res.send(result);
	return;
});
router.delete("/", async (req, res) => {
	if (!req.user) {
		res.render("error", {
			code: "400",
			message: "No user logged in",
		});
		return;
	}

	//console.log(req.body);

	const result = await Pet.destroy({
		where: {
			id: req.body.id,
		},
	});

	res.json(result);
});

module.exports = router;
