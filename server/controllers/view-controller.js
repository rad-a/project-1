const express = require('express');
const { Router } = require('express');

const router = express.Router();


router.use(express.static(__dirname + '/client'));

router.get('/', (req, res) => { 
    res.render('index');
});

router.get('/social', (req, res)=>{
    res.render('social');
    
});

router.get('/profile', (req, res)=>{
    res.render('profile');
});


router.get('/forecast', (req, res)=>{
    res.render('forecast');

});

router.get('/planner', (req, res)=>{
    res.render('planner');

});


module.exports = router;