// Add Dependencies and Required Consts
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
//changed bottom from require('./models/index')
const db = require('./models/index');
const authMiddleware = require('./middleware/auth-middleware');
const cors = require('cors');
const { userController, petController } = require('./controllers');
const clientDir = path.join(__dirname, '../client');


// Express App Setup
const app = express();
//changed bottom 2
let  http = require('http').createServer(app)
let io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;

// Socket.io Setup
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const socket = require('./socket')(io);

// Express JSON Middleware Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static File Serve Setup
app.use(express.static(clientDir));

// Pug Engine Setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine','pug');

// Express Cookie Middleware Setup
app.use(cookieParser());

// Custom Middleware Setup
app.use(authMiddleware);

// Custom Routing
app.use('/user', userController);
app.use('/pets', petController);

// CORS Setup
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//
// Routes
//
app.get('/', function(req, res){
	if(!req.user){
		res.render('login');
	} else{
		res.redirect('/home');
	}
});

// Home page
app.get('/home', function(req, res){

	let username = req.user.username;

	let allUsers = db.User.findAll();

	if(req.user){
		if(req.pets.length == 0){
			res.render('petAdd',{
				welcomeMessage: `Hi ${username}!`,
				pageMsg: "Looks like you dont have any pets on your account yet, let's add some!"
			});
		} else {
			res.render('home', { 
				pets: req.pets,
				allUsers: allUsers,
				username: username
			});
		}
	} else {
		res.render('error');
	}
	
});


// app.get('/', (req, res) => { 
//     res.render('index');
// });

app.get('/social', (req, res)=>{
    res.render('social');
    
});

app.get('/profile', (req, res)=>{
    res.render('profile');
});


app.get('/forecast', (req, res)=>{
    res.render('forecast');

});


// Register page
app.get('/register', function(req, res){
	if(!req.user){
		res.render('register');
	} else {
		res.redirect('/home');
	}
});


// Socket Route
app.get('/sms', async (req, res) => {
	res.sendFile(path.join(clientDir, '/sms/index.html'))
});


// Server Init
db.sequelize.sync().then(() => {
	http.listen(PORT, function () {
		console.log("App now listening at localhost:" + PORT);
	});
});

//added bottom 3
//calling socket.js imported file
// require("./socket")(io);
// require("./controllers/controller/msg-controller")(app)
// require("./controllers/controller/html-routes")(app)