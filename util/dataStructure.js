export function getFavouriteCocktails(cocktailList) {
  const favouriteList = {
    id: cocktailList[0].userId,
    userName: cocktailList[0].userName,
    cocktails: cocktailList.map((cocktail) => {
      return {
        id: cocktail.cocktailId,
        name: cocktail.cocktailName,
      };
    }),
  };
  return favouriteList;
}
