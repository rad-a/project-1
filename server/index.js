// Add Dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./models/index');
const authMiddleware = require('./middleware/auth-middleware');
const cors = require('cors');
const { userController } = require('./controllers');

const clientDir = path.join(__dirname, '../client');

// Express App Setup
const app = express();
const PORT = process.env.PORT || 8080;

// Express JSON Middleware Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/user', userController);
app.use(express.static(clientDir));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine','pug');

// Express Cookie Middleware Setup
app.use(cookieParser());
app.use(authMiddleware);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res){
	console.log(req);
	if(!req.user){
		res.render('login');
	} else{
		let username = req.user.username;
		res.render('home', { message: `${username} is logged in`});
	}
});

app.get('/register', function(req, res){
	if(!req.user){
		res.render('register');
	} else {
		res.render('error');
	}
	
})


db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running, listening on port ${PORT}`);
	});
});
