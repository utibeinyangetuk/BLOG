const connection = require("../knexfile")[process.env.NODE_ENV || "development"];
const knex = require("knex")(connection);

module.exports = {
    select: async (users) => {
        return await knex.column("email").select().from("users");
    },
    insert: async (users) => {
        return await knex("users").insert(users);
    },
};
