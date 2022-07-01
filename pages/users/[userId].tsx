import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
  getUserById,
  getUserByValidSessionToken,
  getUserFavourites,
  User,
} from '../../util/database';

type Props = {
  user?: User;
};

export default function UserDetail(props: Props) {
  const [favouritesLists, setFavouritesLists] = useState(
    props.favouriteCocktails,
  );
  const [favouriteUserId, setFavouriteUserId] = useState('');
  const [favouriteCocktailId, setFavouriteCocktailId] = useState('');
  const [favouriteId, setFavouriteId] = useState('');

  // get the favourites

  useEffect(() => {
    async function getUserFavourites(props) {
      const response = await fetch(`../api/favourites/${props.user.id}`);
      const favourites = await response.json();
      setFavouritesLists(favourites);
    }
    getUserFavourites().catch(() => {
      console.log('favourites request fails');
    });
  }, []);

  // delete the favourite

  async function deleteFavouriteHandler(id) {
    const response = await fetch(`../api/favourites/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const deletedFavourite = await response.json();

    // copy state
    // update copy of the state
    const newState = favouritesLists.filter(
      (favourite: any) => favourite.id !== deletedFavourite.id,
    );
    // use setState func
    console.log(newState);
    setFavouritesLists(newState);
  }

  if (!props.user) {
    return (
      <>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>404 - User not found</h1>
        Better luck next time
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>{props.user.username}</title>
        <meta name="description" content="About the app" />
      </Head>

      <main>
        <h1>
          User #{props.user.id} (username: {props.user.username})
        </h1>
        <div>id: {props.user.id}</div>
        <div>username: {props.user.username}</div>
        <br />
        <br />
        hey {favouriteUserId} {favouriteCocktailId} {favouriteId}
        {favouritesLists.map((favourite: any) => {
          return (
            <div key={`cocktailName-${favourite.id}`}>
              {favourite.id} {favourite.name} {favourite.userId}{' '}
              {favourite.cocktailId}{' '}
              <button
                onClick={() => {
                  setFavouriteUserId(favourite.userId);
                  setFavouriteCocktailId(favourite.cocktailId);
                  setFavouriteId(favourite.id);
                  deleteFavouriteHandler(favourite.id).catch(() => {
                    console.log('delete favourite request fails');
                  });
                }}
              >
                delete
              </button>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // if you want to use username in the URL name this variable properly
  const userIdFromUrl = context.query.userId;

  // make sure the query param is an string
  if (!userIdFromUrl || Array.isArray(userIdFromUrl)) {
    return { props: {} };
  }

  // if you want to use username in the URL call function getUserByUsername and don't use parse int
  const user = await getUserById(parseInt(userIdFromUrl));

  const userSession = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );
  // console.log(context.query);
  const favouriteCocktails = await getUserFavourites(context.query.userId);
  // console.log(favouriteCocktails);
  if (!user) {
    context.res.statusCode = 404;
    return { props: {} };
  } else if (!userSession) {
    return {
      redirect: {
        destination: `/login?returnTo=/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: user,
      favouriteCocktails: favouriteCocktails,
    },
  };
}
