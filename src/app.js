require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const playersRouter = require('./players/players-router');
const clubsRouter = require('./clubs/clubs-router');
const leaguesRouter = require('./leagues/leagues-router');
const coachesRouter = require('./coaches/coaches-router');
const app = express()

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting));

app.use(helmet())

app.use(cors())

app.use('/players', playersRouter)
app.use('/clubs', clubsRouter)
app.use('/leagues', leaguesRouter)
app.use('/coaches', coachesRouter)

app.get('/', (req, res) => {
    res.send('Hello, US Soccer World!')
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
    })
    

module.exports = app