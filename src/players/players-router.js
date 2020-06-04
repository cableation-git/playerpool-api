const express = require('express')
const xss = require('xss')
const PlayersService = require('./players-service')

const playersRouter = express.Router()
const jsonParser = express.json()

const serializePlayer = player => ({
    id: player.player_id,
    firstName: xss(player.first_name),
    lastName: xss(player.last_name),
    birthDate: xss(player.birth_date),
    currentNumber: xss(player.current_number),
    height: xss(player.height),
    birthCity: xss(player.birth_city),
    birthState: xss(player.birth_state),
    birthCountry: xss(player.birth_country),
    playerImage: xss(player.image_url)    
  })

const serializePlayersInfo = player => ({
id: player.player_id,
firstName: xss(player.first_name),
lastName: xss(player.last_name),
birthdate: xss(player.birth_date),
club: xss(player.clubName),
coach: xss(player.coachName) 
})
  
playersRouter
.route('/')
.get((req, res, next) => {
    console.log('getting players')
    const knexInstance = req.app.get('db')
    PlayersService.getAllPlayers(knexInstance)
    .then(players => {
        res.json(players.map(serializePlayer))
    })
    .catch(next)
})

playersRouter
.route('/playerInfo')
.get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PlayersService.getPlayersInfo(knexInstance)
    .then(players => {
        res.json(players.map(serializePlayersInfo))
    })
    .catch(next)
})


module.exports = playersRouter;