const spirits = [
  { id: 1, name: 'Gin' },
  { id: 2, name: 'Bourbon & Rye' },
  { id: 3, name: 'Scotch & Whiskey' },
  { id: 4, name: 'Rum' },
  { id: 5, name: 'Tequila & Mezcal' },
  { id: 6, name: 'Herbal' },
  { id: 7, name: 'Vodka' },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO spirits ${sql(spirits, 'name')}
  `;
};

exports.down = async (sql) => {
  for (const spirit of spirits) {
    await sql`
    DELETE FROM spirits
    WHERE
name = ${spirit.name}`;
  }
};
