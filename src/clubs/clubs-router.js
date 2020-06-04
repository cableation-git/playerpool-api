const express = require('express')
const xss = require('xss')
const ClubsService = require('./clubs-service')

const clubsRouter = express.Router()
const jsonParser = express.json()

const serializeClub = club => ({
    id: club.club_id,
    clubName: xss(club.clubName),
    clubImage: xss(club.clubImage),    
    leagueID: xss(club.leagueID),
    stadiumName: xss(club.stadiumName),
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

module.exports = clubsRouter;