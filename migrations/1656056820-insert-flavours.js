const flavours = [
  { id: 1, name: 'bitter' },
  { id: 2, name: 'sour' },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO flavours ${sql(flavours, 'name')}
  `;
};

exports.down = async (sql) => {
  for (const flavour of flavours) {
    await sql`
    DELETE FROM flavours
    WHERE
name = ${flavour.name}`;
  }
};
