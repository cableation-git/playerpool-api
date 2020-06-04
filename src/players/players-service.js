const PlayersService = {
    getAllPlayers(knex) {
        console.log('getallplayers')
        return knex.select('*').from('players')
    },
    getPlayersInfo(knex) {
        return knex
            .select('p.player_id' , 'p.first_name', 'p.last_name','p.height', 'c.club_name as clubName', 'co.last_name as coachName', 'p.image_url as playerImage')
            .from('players as p')
            .join('players_clubs AS pc', 'pc.player_id', '=', 'p.player_id' )
            .join('clubs AS c', 'c.club_id', '=', 'pc.club_id')
            .join('players_coaches as plc', 'plc.player_id', '=', 'p.player_id' )
            .join('coaches as co', 'co.coach_id','=','plc.coach_id')
            .where('pc.current_club', 'true')
    }
}

module.exports = PlayersService

