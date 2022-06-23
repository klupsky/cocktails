exports.up = async (sql) => {
  await sql`
    CREATE TABLE alcohol_levels (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      grade integer NOT NULL
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE alcohol_levels
  `;
};
