import { NextApiRequest, NextApiResponse } from 'next';
import {
  getReviewByCocktailId,
  getUserByValidSessionToken,
} from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const cocktailId = Number(req.query.cocktailId);
  if (req.method === 'GET') {
    //
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

    const cocktailReview = await getReviewByCocktailId(cocktailId);

    return res.status(200).json(cocktailReview);
  }
}
