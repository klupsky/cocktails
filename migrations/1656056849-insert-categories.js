const categories = [{ id: '1', name: 'tiki' }];

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
