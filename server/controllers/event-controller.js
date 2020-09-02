// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// =============================================================
// Add Dependencies
const express = require("express");
const router = express.Router();
// Requiring our models
const db = require("../models");



// Routes
// =============================================================
    
  // GET route for getting all of the events
  router.get("/api/events", function(req, res) {
    let query = {};
    if (req.query.user_id) {
      query.userId = req.query.user_id;
    }
    db.Event.findAll({
      where: query
    }).then(function(dbevents) {
      res.json(dbevents);
    });
  });

  // Get route for retrieving a single event
  //functionality to search events by date later?
  router.get("/api/events/:date", function(req, res) {
    db.Events.findOne({
      where: {
        date: req.params.date
      }
    }).then(function(events) {
      console.log(events);
      res.json(events);
    });
  });

  // POST route for saving a new event
  router.post("/api/events", async (req, res) => {
    console.log("hey!");
    try{
    if (!req.user) {
      res.render("error", {
        code: "400",
        message: "No user logged in",
      });
      return;
    }
  
    const event = await db.Event.create({
      date: req.body.date,
      title: req.body.title,
      details: req.body.details
    });
  
    res.json(event);
  }catch(err){console.error("eventsPOST",err)}
  });

  // DELETE route for deleting posts
  router.delete("/api/events/:date", function(req, res) {
    db.Event.destroy({
      where: {
        date: req.params.date
      }
    }).then(function(events) {
      res.json(events);
    });
  });

  // PUT route for updating posts
  router.put("/api/events", function(req, res) {
    db.Event.update(
      req.body,
      {
        where: {
          date: req.body.date
        }
      }).then(function(events) {
      res.json(events);
    });
  });
module.exports = router;