import { getFullCollectionOfCocktails } from '../../util/database';

export default async function handler(req, res) {
  const cocktails = await getFullCollectionOfCocktails();
  return res.status(200).json(cocktails);
}
