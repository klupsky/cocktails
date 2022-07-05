const categories = [
  { id: 1, name: 'classic' },
  { id: 2, name: 'highball' },
  { id: 3, name: 'barrel-aged' },
  { id: 4, name: 'sour' },
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
