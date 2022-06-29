import { getUserFavourites } from '../../util/database';

export default async function handler(req, res) {
  const cocktails = await getUserFavourites();
  res.status(200).json(cocktails);
}
