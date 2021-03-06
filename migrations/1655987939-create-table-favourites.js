exports.up = async (sql) => {
  await sql`
    CREATE TABLE favourites (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY UNIQUE,
      user_id integer NOT NULL,
      cocktail_id integer NOT NULL
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE favourites
  `;
};
