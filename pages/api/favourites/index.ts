import { NextApiRequest, NextApiResponse } from 'next';
import { addUserFavourite, getAllFavourites } from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // missing
  // 1. we get the csrfToken from the body
  // 2. we get the sessionToken from the cookies
  // 3. we get the session for this session Token
  if (req.method === 'GET') {
    const cocktails = await getAllFavourites();
    return res.status(200).json(cocktails);
  }

  if (req.method === 'POST') {
    if (!req.body.userId || !req.body.cocktailId) {
      return res.status(400).json({
        error: 'Insert a userId and a cocktailId',
      });
    }

    const newFavourite = await addUserFavourite(
      req.body.userId,
      req.body.cocktailId,
    );
    console.log(newFavourite);

    return res.status(200).json(newFavourite);
  }

  // If we are using any method that is not allowed
  return res.status(405).json({
    error: 'Method not allowed',
  });
}
