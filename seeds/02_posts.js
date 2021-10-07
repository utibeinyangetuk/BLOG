exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("posts")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("posts").insert([
				{
					id: 1,
					author_id: 1,
					author_name: "utibe",
					title: "Test title",
					content:
						"This is a trial test Suscipit earum in aspernatur vel molestiae in voluptas nisi temporibus.",
				},
				{
					id: 2,
					author_id: 3,
					author_name: "utibe11",
					title: "Test title243546",
					content:
						"This is a trial test Suscipit earum in aspernatur vegretyrejtukyijhl molestiae in voluptas nisi temporibus.",
				},
				{
					id: 3,
					author_id: 3,
					author_name: "utibe21",
					title: "Test title34353",
					content:
						"This is a trial test Suscipit earum in aspernatur vel 3535353535353molestiae in voluptas nisi temporibus.",
				},
				{
					id: 4,
					author_id: 2,
					author_name: "utibe324",
					title: "Test title4244",
					content:
						"This is a trial test Suscipit earum in aspernatur vel m3535674y3tgcgbolestiae in voluptas nisi temporibus.",
				},
				{
					id: 5,
					author_id: 2,
					author_name: "utibe423",
					title: "Test title3523w",
					content:
						"This is a trial tghjklujhgfbvcbsrhyregest Suscipit earum in aspernatur vel molestiae in voluptas nisi temporibus.",
				},
			])
		})
}
