const spirits = [
  { id: 1, name: 'gin' },
  { id: 2, name: 'bourbon & rye' },
  { id: 3, name: 'scotch & whiskey' },
  { id: 4, name: 'rum' },
  { id: 5, name: 'tequila & mezcal' },
  { id: 6, name: 'herbal' },
  { id: 7, name: 'vodka' },
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
