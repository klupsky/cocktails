const levels = [
  { id: '1', level: 1 },
  // { id: '2', level: 2 },
  // { id: '3', level: 3 },
  // { id: '4', level: 4 },
  // { id: '5', level: 5 },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO levels ${sql(levels, 'level')}
  `;
};

exports.down = async (sql) => {
  for (const level of levels) {
    await sql`
    DELETE FROM levels
    WHERE
name = ${level.level}`;
  }
};
