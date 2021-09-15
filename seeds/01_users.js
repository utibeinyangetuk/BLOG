exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "utibe",
          email: "utibe@gmail.com",
          password: "admin",
        },
        {
          id: 2,
          username: "utibe2",
          email: "utibe2@gmail.com",
          password: "admin2",
        },
        {
          id: 3,
          username: "utibe3",
          email: "utibe3@gmail.com",
          password: "admin3",
        },
      ])
    })
}
