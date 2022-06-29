const favourites = [
  { id: 1, user_id: 1, cocktail_id: 1 },
  { id: 2, user_id: 2, cocktail_id: 3 },
  { id: 2, user_id: 2, cocktail_id: 1 },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO favourites ${sql(favourites, 'user_id', 'cocktail_id')}
  `;
};

exports.down = async (sql) => {
  for (const favourite of favourites) {
    await sql`
    DELETE FROM favourites
    WHERE
id = ${favourite.id}
`;
  }
};
