import { NextApiRequest, NextApiResponse } from 'next';
import {
  addUserFavourite,
  getAllFavourites,
  getUserByValidSessionToken,
} from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const cocktails = await getAllFavourites();
    return res.status(200).json(cocktails);
  }

  if (req.method === 'POST') {
    // 1. Get the cookie from the request
    const token = req.cookies.sessionToken;

    if (!token) {
      res
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    // 2. Get the user from the token
    const user = await getUserByValidSessionToken(token);

    if (!user) {
      res
        .status(400)
        .json({ errors: [{ message: 'Session token not valid' }] });
      return;
    }

    if (!req.body.userId || !req.body.cocktailId) {
      return res.status(400).json({
        error: 'Insert a userId and a cocktailId',
      });
    }

    const newFavourite = await addUserFavourite(user.id, req.body.cocktailId);

    return res.status(200).json(newFavourite);
  }

  // If we are using any method that is not allowed
  return res.status(405).json({
    error: 'Method not allowed',
  });
}
