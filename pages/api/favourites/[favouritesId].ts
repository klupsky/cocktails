import { NextApiRequest, NextApiResponse } from 'next';
import { deleteUserFavourite, getUserFavourites } from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const favouritesId = Number(req.query.favouritesId);

  if (req.method === 'GET') {
    // console.log(req.query.favouritesId);
    const userFavourites = await getUserFavourites(favouritesId);

    if (!userFavourites) {
      return res.status(400).json({ error: 'userId must be a valid id' });
    }

    // missing
    // 1. we get the csrfToken from the body
    // 2. we get the sessionToken from the cookies
    // 3. we get the session for this session Token

    return res.status(200).json(userFavourites);
  }

  // if method DELETE

  if (req.method === 'DELETE') {
    // console.log(req.query.favouritesId);
    const favouritesIdDelete = Number(req.query.favouritesId);

    const deletedFavourite = await deleteUserFavourite(
      favouritesIdDelete,
      req.body.cocktailId,
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
