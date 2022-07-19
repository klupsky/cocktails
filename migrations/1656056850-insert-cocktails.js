const cocktails = [
  {
    id: 1,
    name: 'Corpse Reviver #2',
    level_id: 3,
    flavour_id: 1,
    spirit_id: 1,
    description:
      'Intended as a revitalizing measure after a boozy night out, which can sometimes backfire with the alcohol content.',
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
    description:
      'The classic of the classics. There was no more discussion about a drink than this one, so there are as many versions as there are opinions. Here is the current contemporary interpretation.',
    glass: 'martini-glass',
    method: 'stirred | shaken',
    garnish: 'olive | lemon zest',
    category_id: 1,
  },

  {
    id: 3,
    name: 'French 75',
    level_id: 2,
    flavour_id: 2,
    spirit_id: 1,
    description:
      'Named after a French cannon notorious for its power during World War 1. But this very pleasant and accessible drink is not to be feared that much - quite the opposite.',
    glass: 'longdrink-glass',
    method: 'shaken',
    garnish: 'kumquat slice',
    category_id: 1,
  },

  {
    id: 4,
    name: 'Gimlet',
    level_id: 3,
    flavour_id: 4,
    spirit_id: 1,
    description:
      'A drink that has its origins in the British Navy and owes its popularity to a fictional character. Done right, you know right away why this is a sour.',
    glass: 'tumbler',
    method: 'shaken',
    garnish: 'lime zest',
    category_id: 1,
  },

  {
    id: 5,
    name: 'Gin Fizz',
    level_id: 1,
    flavour_id: 2,
    spirit_id: 1,
    description:
      'A cocktail category in its own right, the demarcation of which has only been too much discussed. A dash of soda adds some life to a sour, making it more approachable and refreshing.',
    glass: 'longdrink-glass',
    method: 'shaken',
    garnish: 'straight',
    category_id: 1,
  },
  {
    id: 6,
    name: 'Last Word',
    level_id: 3,
    flavour_id: 4,
    spirit_id: 1,
    description:
      'Unbalanced at first glance, this harmonious drink convinces with its strength and intensity. True to its name, don`t enjoy too many of these if you still want to engage in conversation.',
    glass: 'small goblet',
    method: 'shaken',
    garnish: 'straight | amarena cherry',
    category_id: 1,
  },
  {
    id: 7,
    name: 'Martinez',
    level_id: 3,
    flavour_id: 1,
    spirit_id: 1,
    description:
      'Considered by many connoisseurs to be the grandfather of classic martini cocktails. Before it became trendy to drink everything dry, this drink convinced with its balanced sweetness.',
    glass: 'martini-glass',
    method: 'stirred',
    garnish: 'straight | lemon zest',
    category_id: 1,
  },
  {
    id: 8,
    name: 'Negroni',
    level_id: 3,
    flavour_id: 3,
    spirit_id: 1,
    description:
      'The epitome of classic aperitif drinks. If Italy was a cocktail, it would be a Negroni!',
    glass: 'tumbler',
    method: 'stirred',
    garnish: 'lemon zest',
    category_id: 1,
  },
  {
    id: 9,
    name: 'Queen Mum',
    level_id: 1,
    flavour_id: 2,
    spirit_id: 1,
    description:
      'The alleged favorite drink of the British "Queen Mom". A welcome version of Gin & Tonics with its fresh cucumber and spicy pepper notes.',
    glass: 'longdrink-glass',
    method: 'built-in',
    garnish: 'cucumber | black pepper',
    category_id: 2,
  },
  {
    id: 10,
    name: 'White Negroni',
    level_id: 3,
    flavour_id: 3,
    spirit_id: 1,
    description:
      'The more modern and lighter version of the classic Negroni. With its herbal and floral notes, it is particularly enjoyable in warmer temperatures.',
    glass: 'tumbler',
    method: 'stirred',
    garnish: 'lemon zest',
    category_id: 1,
  },
  {
    id: 11,
    name: 'Boulevardier',
    level_id: 3,
    flavour_id: 3,
    spirit_id: 2,
    description:
      'Another version of the Negroni, created entirely independently of it. Slightly stronger and fuller than its relative.',
    glass: 'small goblet',
    method: 'stirred',
    garnish: 'straight | lemon zest',
    category_id: 1,
  },
  {
    id: 12,
    name: 'Greenpoint',
    level_id: 3,
    flavour_id: 1,
    spirit_id: 2,
    description:
      'Named after a Brooklyn neighborhood, it`s a twist on the classic Brooklyn cocktail.',
    glass: 'small goblet',
    method: 'stirred',
    garnish: 'straight | lemon zest',
    category_id: 1,
  },
  {
    id: 13,
    name: 'Horse`s Neck',
    level_id: 1,
    flavour_id: 2,
    spirit_id: 2,
    description:
      'A really ancient drink that owes its name to the accompanying long and beautiful lemon zest, which resembles a horse`s neck.',
    glass: 'longdrink-glass',
    method: 'built-in',
    garnish: 'lemon zest',
    category_id: 2,
  },
  {
    id: 14,
    name: 'Manhattan perfect',
    level_id: 3,
    flavour_id: 1,
    spirit_id: 2,
    description:
      'It`s safe to say that the moment spirits and vermouth were first mixed, Manhattan and martinis were born.',
    glass: 'martini-glass',
    method: 'stirred',
    garnish: 'amarena cherry',
    category_id: 1,
  },
  {
    id: 15,
    name: 'Old Fashioned',
    level_id: 3,
    flavour_id: 1,
    spirit_id: 2,
    description:
      'What at first glance seems like a fancy way to make whiskey easier and more enjoyable has a story that cannot be summed up in a few words. There have been fights and even exchanges of fire over the correct method of preparation.',
    glass: 'tumbler',
    method: 'built-in | stirred',
    garnish: 'amarena cherry | orange zest',
    category_id: 1,
  },
  {
    id: 16,
    name: 'Whiskey Sour',
    level_id: 2,
    flavour_id: 4,
    spirit_id: 2,
    description:
      'The most popular representative of its kind and definitely a benchmark drink to measure the quality of a bar.',
    glass: 'tumbler',
    method: 'shaken',
    garnish: 'amarena cherry | orange slice',
    category_id: 1,
  },
  {
    id: 17,
    name: 'Penicillin',
    level_id: 2,
    flavour_id: 4,
    spirit_id: 3,
    description:
      'A modern classic of the New York bar renaissance, a Sour with smoky, malty but also spicy-hot notes is raised to new heights here.',
    glass: 'tumbler',
    method: 'shaken',
    garnish: 'sugar-coated ginger slice',
    category_id: 1,
  },
  {
    id: 18,
    name: 'Dark & Stormy',
    level_id: 1,
    flavour_id: 2,
    spirit_id: 4,
    description:
      'The national drink of Bermuda and one of the few drinks that is also a registered trademark.',
    glass: 'longdrink-glass',
    method: 'built-in',
    garnish: 'mint | lime slice',
    category_id: 2,
  },
  {
    id: 19,
    name: 'Old Cuban',
    level_id: 2,
    flavour_id: 2,
    spirit_id: 4,
    description:
      'The royal version of a mojito. A neo-classic from the early 2000s and how else could it be - New York.',
    glass: 'coupe',
    method: 'shaken',
    garnish: 'straight | mint',
    category_id: 1,
  },
  {
    id: 20,
    name: 'Classic Margarita',
    level_id: 2,
    flavour_id: 4,
    spirit_id: 5,
    description:
      'The supposedly best-selling cocktail in the world is not only famous, but also notorious. As many myths and legends surround the best-known representative of its category as there are different preparation methods and sizes.',
    glass: 'tumbler',
    method: 'shaken',
    garnish: 'lime and orange slices',
    category_id: 1,
  },
  {
    id: 21,
    name: 'El Presidente',
    level_id: 3,
    flavour_id: 1,
    spirit_id: 5,
    description:
      'This drink dates back to Cuba`s golden age, when Prohobition made it a Mecca for American drinking tourists.',
    glass: 'small goblet',
    method: 'stirred',
    garnish: 'straight | orange zest',
    category_id: 3,
  },
  {
    id: 22,
    name: 'La Paloma',
    level_id: 1,
    flavour_id: 2,
    spirit_id: 5,
    description:
      'An incredibly refreshing and popular drink from Mexico. Not just a bartender favorite anymore.',
    glass: 'longdrink-glass',
    method: 'built-in',
    garnish: 'grapefruit slice | salt rim',
    category_id: 2,
  },
  {
    id: 23,
    name: 'Pimm`s Cup',
    level_id: 1,
    flavour_id: 2,
    spirit_id: 6,
    description:
      'Originally invented by James Pimm as a refreshing accompaniment to his oysters at his London bar. This drink became a popular companion throughout the day and evening to this day.',
    glass: 'longdrink-glass',
    method: 'built-in',
    garnish: 'mint | cucumber | lemon and orange slices',
    category_id: 2,
  },
  {
    id: 24,
    name: 'Pisco Sour',
    level_id: 2,
    flavour_id: 4,
    spirit_id: 6,
    description:
      'With its typical foam crown and full mouthfeel, it is the epitome of a cocktail with protein. Probably the most popular of its kind.',
    glass: 'coupe',
    method: 'shaken',
    garnish: 'straight',
    category_id: 4,
  },
  {
    id: 25,
    name: 'Espresso Martini',
    level_id: 2,
    flavour_id: 3,
    spirit_id: 7,
    description:
      'Probably the most famous coffee cocktail. According to legend, a model once asked for a drink at a famous New York bar with the following requirements: "Wake me up, then fuck me up."',
    glass: 'coupe',
    method: 'shaken',
    garnish: 'straight | mint | coffeebeans',
    category_id: 1,
  },
  {
    id: 26,
    name: 'Moscow Mule',
    level_id: 1,
    flavour_id: 2,
    spirit_id: 7,
    description:
      'A marketing gimmick and stroke of genius. Started as an attempt to popularize vodka in the US and because they were stuck with tons of spicy ginger lemonade they mixed it with and served it in a copper mug to sell it better. The success that continues to this day exceeds the wildest expectations of the inventors!',
    glass: 'mule-cup',
    method: 'built-in',
    garnish: 'mint | cucumber',
    category_id: 1,
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
