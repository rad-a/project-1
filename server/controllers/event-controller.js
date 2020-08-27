// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// =============================================================
const express = require("express");
const app = express.router();
// Requiring our models
const db = require("../models");
const { app } = require("express");

// Routes
// =============================================================
    
  // GET route for getting all of the events
  app.get("/api/events", function(req, res) {
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
  app.get("/api/events/:date", function(req, res) {
    db.Event.findOne({
      where: {
        date: req.params.date
      }
    }).then(function(events) {
      console.log(events);
      res.json(events);
    });
  });

  // POST route for saving a new event
  app.post("/addEvent", async (req, res) => {
    if (!req.user) {
      res.render("error", {
        code: "400",
        message: "No user logged in",
      });
      return;
    }
  
    const event = await Event.create({
      date: req.body.date,
      title: req.body.title,
      details: req.body.details,
      UserId: req.user.id,
    });
  
    res.send(event);
  });

  // DELETE route for deleting posts
  app.delete("/api/events/:date", function(req, res) {
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
