const path = require("path");
const express = require("express");
const xss = require("xss");
const PlayersService = require("./players-service");
const logger = require("../logger");

const playersRouter = express.Router();
const jsonParser = express.json();

const serializePlayer = (player) => ({
  player_id: player.player_id,
  first_name: xss(player.first_name),
  last_name: xss(player.last_name),
  birth_date: xss(player.birth_date),
  current_number: xss(player.current_number),
  height: xss(player.height),
  birth_city: xss(player.birth_city),
  birth_state: xss(player.birth_state),
  birth_country: xss(player.birth_country),
  image_url: xss(player.image_url),
});

const serializePlayersInfo = (player) => ({
  player_id: player.player_id,
  first_name: xss(player.first_name),
  last_name: xss(player.last_name),
  birth_date: xss(player.birth_date),
  club_name: xss(player.club_name),
  coachName: xss(player.coachName),
});

playersRouter
  .route("/playerInfo")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    PlayersService.getPlayersInfo(knexInstance)
      .then((players) => {
        res.json(players.map(serializePlayersInfo));
      })
      .catch(next);
  });

playersRouter
  .route("/")
  .get((req, res, next) => {
    console.log("getting players");
    const knexInstance = req.app.get("db");
    PlayersService.getAllPlayers(knexInstance)
      .then((players) => {
        res.json(players.map(serializePlayer));
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    console.log("post", req.body);
    const {
      first_name,
      last_name,
      birth_date,
      height,
      current_number,
      birth_city,
      birth_state,
      birth_country,
      image_url,
    } = req.body;

    const newPlayer = {
      first_name,
      last_name,
      birth_date,
      height,
      current_number,
      birth_city,
      birth_country,
    };

    const numberOfValues = Object.values(newPlayer).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain a first name, last name, birth date, current number, city, country`,
        },
      });
    }

    newPlayer.birth_state = birth_state;
    newPlayer.image_url = image_url;

    //const error = getPlayerValidationError(newPlayer);

    PlayersService.insertPlayer(req.app.get("db"), newPlayer)
      .then((player) => {
        logger.info(`Player withid ${player.player_id} created`);
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${player.player_id}`))
          .json(serializePlayer(player));
      })
      .catch(next);
  })

playersRouter
  .route("/:player_id")

  .all((req, res, next) => {
    PlayersService.getById(req.app.get("db"), req.params.player_id)
      .then((player) => {
        if (!player) {
          return res.status(404).json({
            error: { message: "Player Not Found" },
          });
        }
        res.player = player;
        next();
      })
      .catch();
  })

  .get((req, res) => {
    res.json(serializeBugs(res.player));
  })

  .delete((req, res, next) => {
    PlayersService.deletePlayer(req.app.get("db"), req.params.player_id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })

  .patch(jsonParser, (req, res, next) => {
    console.log("patch req", req.body);
    const {
      first_name,
      last_name,
      birth_date,
      current_number,
      height,
      birth_city,
      birth_state,
      birth_country,
      image_url,
      last_updated,
    } = req.body;

    const playerToUpdate = {
      first_name,
      last_name,
      birth_date,
      height,
      birth_city,
      birth_country,
    };

    const numberOfValues = Object.values(playerToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain a first and last name, birth date, birth city and country`,
        },
      });
    }

    playerToUpdate.current_number = current_number;
    playerToUpdate.birth_state = birth_state;
    playerToUpdate.image_url = image_url;
    playerToUpdate.last_updated = last_updated;

    // const error = getPlayerValidationError(playerToUpdate);

    // if (error) return res.status(400).send(error);

    PlayersService.updatePlayer(
      req.app.get("db"),
      req.params.player_id,
      playerToUpdate
    )
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })

module.exports = playersRouter;
