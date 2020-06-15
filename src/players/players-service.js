const PlayersService = {
  getAllPlayers(knex) {
    console.log("getallplayers");
    return knex.select("*").from("players");
  },
  getPlayersInfo(knex) {
    console.log("getplayersinfo");
    return knex
      .select(
        "p.player_id",
        "p.first_name",
        "p.last_name",
        "p.height",
        "c.club_name as club_name",
        "co.last_name as coachName",
        "p.image_url as image_url"
      )
      .from("players as p")
      .join("players_clubs AS pc", "pc.player_id", "=", "p.player_id")
      .join("clubs AS c", "c.club_id", "=", "pc.club_id")
      .join("players_coaches as plc", "plc.player_id", "=", "p.player_id")
      .join("coaches as co", "co.coach_id", "=", "plc.coach_id")
      .where("pc.current_club", "true");
  },
  getById(knex, id) {
    return knex
      .select('*')
      .from('players')
      .where('players.player_id', id)
      .first()
  },
  updatePlayer(knex, player_id, updatePlayerFields) {
    return knex('players')
      .where({ player_id: player_id })
      .update(updatePlayerFields)
  },
  insertPlayer(knex, newPlayer) {
    return knex
      .insert(newPlayer)
      .into("players")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  deletePlayer(knex, player_id) {
    console.log("deleteplayer",player_id);
    return knex('players')
      .where({ player_id })
      .delete()
  }
};

module.exports = PlayersService;
