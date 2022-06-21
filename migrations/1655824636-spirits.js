exports.up = async (sql) => {
  await sql`
    CREATE TABLE spirits (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      name varchar(30) NOT NULL
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE spirits
  `;
};
