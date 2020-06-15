const ClubsService = {
  getAllClubs(knex) {
    console.log("getallclubs");
    // return knex.select('*').from('clubs')
    return knex
      .select(
        "c.club_id",
        "c.club_name as club_name",
        "c.icon_url as icon_url",
        "c.stadium_name as stadium_name",
        "c.inception",
        "c.league_id as leagueID",
        "c.city",
        "c.country",
        "p.first_name as playerFirstName",
        "p.last_name as playerLastName",
        "l.league_name as leagueName"
      )
      .from("clubs as c")
      .join("leagues AS l","l.league_id","=","c.league_id")
      .leftOuterJoin("players_clubs AS pc", "pc.club_id", "=", "c.club_id")
      .leftOuterJoin("players AS p", "p.player_id", "=", "pc.player_id");
  },
  insertClub(knex, newClub) {
    return knex
      .insert(newClub)
      .into("clubs")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = ClubsService;
