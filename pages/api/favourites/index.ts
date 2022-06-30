import { NextApiRequest, NextApiResponse } from 'next';
import { addUserFavourite, getAllFavourites } from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const cocktails = await getAllFavourites();
    res.status(200).json(cocktails);
  }

  // if method POST
  if (req.method === 'POST') {
    if (!req.body.userId || !req.body.cocktailId) {
      return res.status(400).json({
        error:
          'you need to add a user id and a cocktail id and both have to be numbers',
      });
    }

    const newFavourite = await addUserFavourite(
      req.body.userId,
      req.body.cocktailId,
    );

    return res.status(200).json(newFavourite);
  }

  // If we are using any method that is not allowed
  res.status(405).json({
    error: 'Method not allowed',
  });
}
