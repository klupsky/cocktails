const flavours = [
  { id: 1, name: 'dry', colour: '#BEEBF6' },
  { id: 2, name: 'fizzy', colour: '#FFC6DC' },
  { id: 3, name: 'bitter', colour: '#BBBAF9' },
  { id: 4, name: 'sour', colour: '#E0EA79' },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO flavours ${sql(flavours, 'name', 'colour')}
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
