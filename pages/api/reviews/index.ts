import { NextApiRequest, NextApiResponse } from 'next';
import {
  addReview,
  getAllReviews,
  getUserByValidSessionToken,
} from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const reviews = await getAllReviews();
    return res.status(200).json(reviews);
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

    if (!req.body.review || !req.body.rating) {
      return res.status(400).json({
        error: 'Please write a review and give a Rating',
      });
    }
    const newReview = await addReview(
      user.id,
      req.body.username,
      req.body.cocktailId,
      req.body.review,
      req.body.rating,
    );

    return res.status(200).json(newReview);
  }

  // If we are using any method that is not allowed
  return res.status(405).json({
    error: 'Method not allowed',
  });
}
