const knex = require("../config/database")

module.exports = {
  select: async () => {
    return await knex.column("email").select().from("users")
  },
  insert: async (users) => {
    return await knex("users").insert(users)
  },
}
