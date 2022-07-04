const cocktails = [
  {
    id: 1,
    name: 'Corpse Reviver #2',
    level_id: 3,
    flavour_id: 1,
    spirit_id: 1,
    description: '',
    glass: 'small goblet',
    method: 'shaken',
    garnish: 'straight',
    category_id: 1,
  },
  {
    id: 2,
    name: 'Dry Martini',
    level_id: 3,
    flavour_id: 1,
    spirit_id: 1,
    description: '',
    glass: 'martini-glass',
    method: 'stirred/shaken',
    garnish: 'olive/cest of lemon',
    category_id: 1,
  },

  {
    id: 3,
    name: 'French 75',
    level_id: 2,
    flavour_id: 2,
    spirit_id: 1,
    description: '',
    glass: 'tumbler',
    method: 'shaken',
    garnish: 'slice of kumquat',
    category_id: 1,
  },

  {
    id: 4,
    name: 'Gimlet',
    level_id: 3,
    flavour_id: 3,
    spirit_id: 1,
    description: '',
    glass: 'tumbler',
    method: 'shaken',
    garnish: 'cest of lime',
    category_id: 1,
  },

  {
    id: 5,
    name: 'Gin Fizz',
    level_id: 1,
    flavour_id: 2,
    spirit_id: 1,
    description: '',
    glass: 'fizz-glass',
    method: 'shaken',
    garnish: 'straight',
    category_id: 1,
  },
  {
    id: 6,
    name: 'Last Word',
    level_id: 1,
    flavour_id: 2,
    spirit_id: 1,
    description: '',
    glass: 'small goblet',
    method: 'shaken',
    garnish: 'straight, amarena cherry',
    category_id: 1,
  },
  {
    id: 7,
    name: 'Martinez',
    level_id: 3,
    flavour_id: 1,
    spirit_id: 1,
    description: '',
    glass: 'martini-glass',
    method: 'stirred',
    garnish: 'straight, cest of lemon',
    category_id: 1,
  },
  {
    id: 8,
    name: 'Negroni',
    level_id: 3,
    flavour_id: 4,
    spirit_id: 1,
    description: '',
    glass: 'tumbler',
    method: 'stirred',
    garnish: 'cest of lemon',
    category_id: 1,
  },
  {
    id: 9,
    name: 'Queen Mum',
    level_id: 1,
    flavour_id: 2,
    spirit_id: 1,
    description: '',
    glass: 'tumbler',
    method: 'built-in',
    garnish: 'cucumber, black pepper',
    category_id: 2,
  },
  {
    id: 10,
    name: 'White Negroni',
    level_id: 3,
    flavour_id: 4,
    spirit_id: 1,
    description: '',
    glass: 'tumbler',
    method: 'stirred',
    garnish: 'cest of lemon',
    category_id: 1,
  },
  {
    id: 11,
    name: 'Boulevardier',
    level_id: 3,
    flavour_id: 4,
    spirit_id: 2,
    description: '',
    glass: 'small goblet',
    method: 'stirred',
    garnish: 'straight, cest of lemon',
    category_id: 1,
  },
  {
    id: 12,
    name: 'Greenpoint',
    level_id: 3,
    flavour_id: 1,
    spirit_id: 2,
    description: '',
    glass: 'small goblet',
    method: 'stirred',
    garnish: 'straight, cest of lemon',
    category_id: 1,
  },
  {
    id: 13,
    name: 'Horse`s Neck',
    level_id: 1,
    flavour_id: 2,
    spirit_id: 2,
    description: '',
    glass: 'longdrink-glass',
    method: 'built-in',
    garnish: 'long cest of lemon',
    category_id: 2,
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
      'method',
      'garnish',
      'category_id',
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
method = ${cocktail.method} AND
garnish = ${cocktail.garnish} AND
category_id = ${cocktail.category_id}
`;
  }
};
