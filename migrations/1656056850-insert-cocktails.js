const cocktails = [
  {
    id: '1',
    name: 'first drink',
    level_id: 3,
    flavour_id: 1,
    spirit_id: 2,
    description: 'yay this is the first drink and it tastes like alcohol',
    glass: 'tumbler',
    ice: 'crushed ice',
    garnish: 'lavender',
    category_id: 1,
    image: 1,
  },
];

// adding
exports.up = async (sql) => {
  await sql`
    INSERT INTO cocktails ${sql(
      cocktails,
      'name',
      'level_id',
      'flavour_id',
      'spirit_id',
      'description',
      'glass',
      'ice',
      'garnish',
      'category_id',
      'image',
    )}
  `;
};

exports.down = async (sql) => {
  for (const cocktail of cocktails) {
    await sql`
    DELETE FROM cocktails
    WHERE
name = ${cocktail.name} AND
level_id = ${cocktail.level_id} AND
flavour_id = ${cocktail.flavour_id} AND
spirit_id = ${cocktail.spirit_id} AND
description = ${cocktail.description} AND
glass = ${cocktail.glass} AND
ice = ${cocktail.ice} AND
garnish = ${cocktail.garnish} AND
category_id = ${cocktail.category_id} AND
image = ${cocktail.image}`;
  }
};
