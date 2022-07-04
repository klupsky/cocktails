import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteUserFavourite,
  getUserByValidSessionToken,
  getUserFavourites,
} from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const favouritesId = Number(req.query.favouritesId);

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

    //

    const userFavourites = await getUserFavourites(favouritesId);

    if (!userFavourites) {
      return res.status(400).json({ error: 'userId must be a valid id' });
    }

    return res.status(200).json(userFavourites);
  }

  // if method DELETE

  if (req.method === 'DELETE') {
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

    // delete

    const deletedFavourite = await deleteUserFavourite(
      req.body.userId,
      user.id,
    );

    // TODO: add a fail case when id is not a valid favouriteId
    if (!deletedFavourite) {
      return res.status(400).json({ error: 'userId must be a valid id' });
    }

    return res.status(200).json(deletedFavourite);
  }

  // If we are using any method that is not allowed
  res.status(405).json({
    error: 'Method not allowed',
  });
}
