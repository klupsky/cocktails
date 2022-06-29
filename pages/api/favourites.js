import { getAllFavourites } from '../../util/database';

export default async function handler(req, res) {
  const cocktails = await getAllFavourites();
  res.status(200).json(cocktails);
}
