const categories = [
  { id: 1, name: 'Classic' },
  { id: 2, name: 'Highball' },
  { id: 3, name: 'Schaumwein' },
  { id: 4, name: 'Barrel-aged' },
  { id: 5, name: 'Tiki' },
  { id: 6, name: 'Sour' },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO categories ${sql(categories, 'name')}
  `;
};

exports.down = async (sql) => {
  for (const category of categories) {
    await sql`
    DELETE FROM categories
    WHERE
name = ${category.name}`;
  }
};
