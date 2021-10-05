const knex = require("../config/database")
module.exports = {
	insert: async (posts) => {
		return await knex("posts").insert(posts)
	},
    select:async(posts)=>{
        return await knex("posts").select()
    }
}
