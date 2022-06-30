import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFavourites } from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const favouritesId = Number(req.query.favouritesId);

  if (req.method === 'GET') {
    console.log(req.query.favouritesId);
    const userFavourites = await getUserFavourites(favouritesId);

    if (!userFavourites) {
      return res.status(400).json({ error: 'userId must be a valid id' });
    }

    return res.status(200).json(userFavourites);
  }

  // If we are using any method that is not allowed
  res.status(405).json({
    error: 'Method not allowed',
  });
}
