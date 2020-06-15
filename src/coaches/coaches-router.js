const path = require("path");
const express = require('express')
const xss = require('xss')
const CoachesService = require('./coaches-service')
const logger = require("../logger");

const coachesRouter = express.Router()
const jsonParser = express.json()

const serializeCoach = coach => ({
    coaches_id: coach.coaches_id,
    first_name: xss(coach.first_name),
    last_name: xss(coach.last_name),    
    image_url: xss(coach.image_url),
    birth_date: xss(coach.birth_date),
    birth_city: xss(coach.birth_city),
    birth_state: xss(coach.birth_state),
    birth_country: xss(coach.birth_country),
    current_club_id: xss(coach.current_club_id),
    year_hired: xss(coach.year_hired),
    club_name: xss(coach.club_name)    
  })

coachesRouter
.route('/')
.get((req, res, next) => {
    console.log('getting coaches')
    const knexInstance = req.app.get('db')
    CoachesService.getAllCoaches(knexInstance)
    .then(coaches => {
        res.json(coaches.map(serializeCoach))
    })
    .catch(next)
})
.post(jsonParser, (req, res, next) => {
  console.log("post", req.body);
  const {
    first_name,
    last_name,
    birth_date,
    birth_city,
    birth_state,
    birth_country,
    image_url,
    current_club_id,
    year_hired,
  } = req.body;

  const newCoach = {
    first_name,
    last_name,
    birth_date,
    birth_city,
    birth_state,
    birth_country,
    current_club_id,
    year_hired,
  };

  const numberOfValues = Object.values(newCoach).filter(Boolean).length;
  if (numberOfValues === 0) {
    return res.status(400).json({
      error: {
        message: `Request body must contain a coach name, birthplace, current club and year hired`,
      },
    });
  }

  newCoach.image_url = image_url;

  //const error = getCoachValidationError(newCoach);

  CoachesService.insertCoach(req.app.get("db"), newCoach)
    .then((coach) => {
      logger.info(`Coach withid ${coach.coach_id} created`);
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${coach.coach_id}`))
        .json(serializeCoach(coach));
    })
    .catch(next);
  });

module.exports = coachesRouter;