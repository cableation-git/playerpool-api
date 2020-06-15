const LeaguesService = {
  getAllLeagues(knex) {
    console.log("getallLeagues");
    return knex.select("*").from("leagues");
  },  
};

module.exports = LeaguesService;
