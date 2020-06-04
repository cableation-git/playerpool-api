const ClubsService = {
    getAllClubs(knex) {
        console.log('getallclubs')
        // return knex.select('*').from('clubs')
        return knex
        .select('c.club_id', 'c.club_name as clubName','c.icon_url as clubImage','c.stadium_name as stadiumName', 'c.inception','c.league_id as leagueID','c.city','c.country','p.first_name as playerFirstName', 'p.last_name as playerLastName', 'fl.league_name as leagueName')
        .from('clubs as c')
        .join('players_clubs AS pc', 'pc.club_id', '=', 'c.club_id' )
        .join('football_leagues AS fl', 'fl.football_league_id', '=', 'c.league_id')
        .leftJoin('players AS p', 'p.player_id', '=', 'pc.player_id')                
    }
}

module.exports = ClubsService