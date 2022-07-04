exports.up = async (sql) => {
  await sql`
    CREATE TABLE cocktails (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      name varchar(50) NOT NULL,
			level_id integer NOT NULL,
			flavour_id integer NOT NULL,
			spirit_id integer NOT NULL,
			description varchar(500) NOT NULL,
			glass varchar(50) NOT NULL,
			method varchar(50) NOT NULL,
			garnish varchar(50) NOT NULL,
			category_id integer NOT NULL
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE cocktails
  `;
};
