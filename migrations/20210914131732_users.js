exports.up = function (knex) {
  return (
    knex.schema
      // create the users table
      .createTable("users", (table) => {
        table.increments("id")
        table.string("name")
        table.string("email").unique()
        table.string("password")
        table.timestamps(true, true)
      })
      // create the posts table
      .createTable("posts", (table) => {
        table.increments("id")
        table
          .integer("author_id")
          .notNullable()
          .references("id")
          .inTable("users")
          .onDelete("CASCADE")
        table.string("title").notNullable()
        table.text("content")
        table.timestamps(true, true)
      })
      // create the comments table
      .createTable("comments", (table) => {
        table.increments("id")
        table
          .integer("post_id")
          .notNullable()
          .references("id")
          .inTable("posts")
          .index()
          .onDelete("CASCADE")
        table.string("name")
        table.text("content")
        table.timestamps(true, true)
      })
  )
}

exports.down = function (knex) {
  return knex.schema.dropTable("comments").dropTable("posts").dropTable("users")
}
