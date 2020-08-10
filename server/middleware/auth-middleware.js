const { User, AuthToken, Pet } = require('../models');

module.exports = async function(req, res, next){
	// Set token from existing cookie
	const token = req.cookies.auth_token || req.headers.authorization;

	// If token exists, find matching user
	if(token){
		const authToken = await AuthToken.findOne({ where: { token }, include: User });

		// If token found, attach associated object to pass to routes
		if(authToken){
			req.user = authToken.User;
			const pets = await Pet.findAll({ where: {
				userId: authToken.User.id
				}
			});
			
			req.pets = pets;
		}
	}
	//console.log(req);
	next();
}