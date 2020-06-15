const CoachesService = {
  getAllCoaches(knex) {
    console.log("getallcoaches");
    // return knex.select('*').from('clubs')
    return knex
      .select(
        "c.coach_id as coaches_id",
        "c.first_name as first_name",
        "c.last_name as last_name",
        "c.image_url as image_url",
        "c.birth_date as birth_date",
        "c.birth_city as birth_city",
        "c.birth_state as birth_state",
        "c.birth_country as birth_country",
        "c.current_club_id as current_club_id",
        "c.year_hired as year_hired",
        "cl.club_name as club_name"
      )
      .from("coaches as c")
      .join("clubs AS cl","cl.club_id","=","c.current_club_id")
  },
  insertCoach(knex, newCoach) {
    return knex
      .insert(newCoach)
      .into("coaches")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = CoachesService;
