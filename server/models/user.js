'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
	  User.hasMany(models.AuthToken);
	  User.hasMany(models.Pet);
    }
  };
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  // Authentication method
  User.authenticate = async function(username, password){
	  // Create user object from request where matched in database
	  const user = await User.findOne({ where: { username } });

	  console.log('user.js LOG --------------------------' + user);

	  if(user){
		if(bcrypt.compareSync(password, user.password)) {
			return user.authorize();
		}
	  }

	  throw new Error('invalid password');
  }

  // Prototyped function due to instance method
  User.prototype.authorize = async function(){
	  // Create new AuthToken from this user and create temporary user object from this model
	  const { AuthToken } = sequelize.models;
	  const user = this;
	  const authToken = await AuthToken.generate(this.id);

	  // Use generated add function from hasMany
	  await user.addAuthToken(authToken);

	  return { user, authToken };
  };

  // Destroy authToken record when user logs out
  User.prototype.logout = async function(token){
	  sequelize.models.AuthToken.destroy({ where: { token } });
  };
  
  return User;
};