exports.up = async (sql) => {
  await sql`
    CREATE TABLE levels (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
			level integer NOT NULL
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE levels
  `;
};