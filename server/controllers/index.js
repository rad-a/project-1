const userController = require('./user-controller');
const petController = require('./pet-controller');
const msgController = require('./msg-controller');
const viewController = require('./view-controller');
const eventsController = require('./events-controller');
module.exports = {
	userController,
	petController,
	viewController,
	msgController,
	eventsController
}