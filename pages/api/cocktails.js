import { getFullCollectionOfCocktails } from '../../util/database';

export default async function handler(req, res) {
  const cocktails = await getFullCollectionOfCocktails();
  res.status(200).json(cocktails);
}
