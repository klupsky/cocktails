import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  getUserById,
  getUserByValidSessionToken,
  getUserFavourites,
  User,
} from '../../util/database';
import { logo } from './login';

// TYPES

type Props = {
  user: User;
  favouriteCocktails: {
    id: number;
    userId: number;
    cocktailId: number;
    username: string;
    name: string;
  };
};

type Favourite = {
  id: number;
  name: string;
  userId: number;
  cocktailId: number;
  username: string;
};

export default function UserDetail(props: Props) {
  const [favouritesLists, setFavouritesLists] = useState(
    props.favouriteCocktails,
  );
  const [favouriteUserId, setFavouriteUserId] = useState<
    Favourite['userId'] | ''
  >('');
  const [favouriteCocktailId, setFavouriteCocktailId] = useState<
    Favourite['cocktailId'] | ''
  >('');
  const [favouriteId, setFavouriteId] = useState<Favourite['id'] | ''>('');

  // get the favourites

  // useEffect(() => {
  //   async function getUserFavourites() {
  //     const response = await fetch(`../api/favourites/${props.user.id}`);
  //     const favourites = await response.json();
  //     setFavouritesLists(favourites);
  //   }
  //   getUserFavourites().catch(() => {
  //     console.log('favourites request fails');
  //   });
  // }, [props]);

  // delete the favourite

  async function deleteFavouriteHandler(favouriteUserId: any) {
    const response = await fetch(`../api/favourites/${favouriteUserId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: favouriteUserId,
        id: favouriteId,
      }),
    });
    const deletedFavourite = await response.json();

    // copy state
    // update copy of the state
    const newState = favouritesLists.filter(
      (favourite: Favourite) => favourite.id !== deletedFavourite.id,
    );
    // use setState func

    setFavouritesLists(newState);
  }

  if (!props.user) {
    return (
      <>
        <Head>
          <title>user not found</title>
          <meta name="description" content="user not found" />
        </Head>
        <h1>404 - user not found</h1>
        better luck next time
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>{props.user.username}'s cocktail selection</title>
        <meta name="description" content="private user selection" />
      </Head>

      <main>
        <div css={logo}>
          <a href="/">
            <span>
              FANCY A <br />
              COCKTAIL?
            </span>
          </a>
        </div>
        <h1>
          User #{props.user.id} (username: {props.user.username})
        </h1>
        <div>id: {props.user.id}</div>
        <div>username: {props.user.username}</div>
        <br />
        <br />
        hey {favouriteUserId} {favouriteCocktailId} {favouriteId}
        {favouritesLists.map((favourite: Favourite) => {
          return (
            <div key={`cocktailName-${favourite.id}`}>
              <Link href={`/../collection/${favourite.cocktailId}`}>
                {favourite.name}
              </Link>{' '}
              {favourite.userId} {favourite.cocktailId}
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
                DELETE
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

  const favouriteCocktails = await getUserFavourites(context.query.userId);
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
      userSession,
    },
  };
}
