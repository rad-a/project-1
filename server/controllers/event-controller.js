// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
    
  // GET route for getting all of the events
  app.get("/api/events", function(req, res) {
    var query = {};
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
  app.get("/api/posts/:date", function(req, res) {
    db.Event.findOne({
      where: {
        date: req.params.date
      }
    }).then(function(events) {
      console.log(events);
      res.json(events);
    });
  });

  // POST route for saving a new post
  app.post("/api/events", function(req, res) {
    db.Event.create(req.body).then(function(events) {
      res.json(events);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:date", function(req, res) {
    db.Event.destroy({
      where: {
        date: req.params.date
      }
    }).then(function(events) {
      res.json(events);
    });
  });

  // PUT route for updating posts
  app.put("/api/events", function(req, res) {
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
};