exports.up = async (sql) => {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      username varchar(90) NOT NULL UNIQUE,
			password_hash varchar (80) NOT NULL,
      email varchar(90) NOT NULL UNIQUE

    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE users
  `;
};
