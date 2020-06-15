const path = require("path");
const express = require('express')
const xss = require('xss')
const ClubsService = require('./clubs-service')
const logger = require("../logger");

const clubsRouter = express.Router()
const jsonParser = express.json()

const serializeClub = club => ({
    club_id: club.club_id,
    club_name: xss(club.club_name),
    icon_url: xss(club.icon_url),    
    league_id: xss(club.league_id),
    stadium_name: xss(club.stadium_name),
    city: xss(club.city),
    country: xss(club.country),
    inception: xss(club.inception),
    playerFirstName: xss(club.playerFirstName),
    playerLastName: xss(club.playerLastName),
    leagueName: xss(club.leagueName)    
  })

clubsRouter
.route('/')
.get((req, res, next) => {
    console.log('getting clubs')
    const knexInstance = req.app.get('db')
    ClubsService.getAllClubs(knexInstance)
    .then(clubs => {
        res.json(clubs.map(serializeClub))
    })
    .catch(next)
})
.post(jsonParser, (req, res, next) => {
    console.log("post", req.body);
    const {
      club_name,
      icon_url,
      league_id,
      stadium_name,
      city,
      country,
      inception,
    } = req.body;

    const newClub = {
        club_name,
        league_id,
        stadium_name,
        city,
        country,
        inception,
    };

    const numberOfValues = Object.values(newClub).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain a club name, league id, stadium name, city, country, inception`,
        },
      });
    }

    newClub.icon_url = icon_url;

    //const error = getClubValidationError(newPlayer);

    ClubsService.insertClub(req.app.get("db"), newClub)
      .then((club) => {
        logger.info(`Club withid ${club.club_id} created`);
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${club.club_id}`))
          .json(serializeClub(club));
      })
      .catch(next);
    });

module.exports = clubsRouter;