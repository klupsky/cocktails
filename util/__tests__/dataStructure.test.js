import { getFavouriteCocktails } from '../dataStructure';

test("Reduce user's watchlist ", () => {
  const favouriteList = [
    {
      userId: 1,
      userName: 'k',
      cocktailId: 2,
      cocktailName: 'Dry Martini',
    },
    {
      userId: 1,
      userName: 'k',
      cocktailId: 19,
      cocktailName: 'Old Cuban',
    },
    {
      userId: 1,
      userName: 'k',
      cocktailId: 24,
      cocktailName: 'Pisco Sour',
    },
  ];

  expect(getFavouriteCocktails(favouriteList)).toStrictEqual({
    id: 1,
    userName: 'k',
    cocktails: [
      { id: 2, name: 'Dry Martini' },
      { id: 19, name: 'Old Cuban' },
      { id: 24, name: 'Pisco Sour' },
    ],
  });
});
