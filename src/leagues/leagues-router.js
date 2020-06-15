const path = require("path");
const express = require("express");
const xss = require("xss");
const LeaguesService = require("./leagues-service");
const logger = require("../logger");

const leaguesRouter = express.Router();
const jsonParser = express.json();

const serializeLeague = (league) => ({
  league_id: league.league_id,
  league_name: xss(league.league_name),
  country: xss(league.country),
  inception: xss(league.inception),
});

leaguesRouter.route("/").get((req, res, next) => {
  console.log("getting leagues");
  const knexInstance = req.app.get("db");
  LeaguesService.getAllLeagues(knexInstance)
    .then((leagues) => {
      res.json(leagues.map(serializeLeague));
    })
    .catch(next);
});

module.exports = leaguesRouter;
