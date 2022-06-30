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
  favouriteCocktails: any;
};

export default function UserDetail(props: Props) {
  const [favouritesList, setFavouritesList] = useState(
    props.favouriteCocktails,
  );
  const [favouriteUserId, setFavouriteUserId] = useState('');
  const [favouriteCocktailId, setFavouriteCocktailId] = useState('');

  useEffect(() => {
    async function getUserFavourites() {
      const response = await fetch(`api/favourites/${id}`);
      const favourites = await response.json();

      setFavouritesList(favourites);
    }
    getUserFavourites().catch(() => {
      // console.log('favourites request fails');
    });
  }, []);

  // async function favouriteHandler(id: number) {
  //   const userFavouriteResponse = await fetch(`api/favourites/${id}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       userId: favouriteUserId,
  //       cocktailId: favouriteCocktailId,
  //     }),
  //   });

  //   const createdNewFavourite = await userFavouriteResponse.json();

  //   // copy state
  //   // update copy of the state
  //   const newState = [...favouritesList, createdNewFavourite];
  //   // use setState func
  //   setFavouritesList(newState);
  //   setFavouriteCocktailId('');
  //   setFavouriteUserId('');
  // }

  async function deleteFavouriteHandler(id: number) {
    const response = await fetch(`api/favourites/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: favouriteUserId,
        cocktailId: favouriteCocktailId,
      }),
    });
    const deletedFavourite = await response.json();
    // copy state
    // update copy of the state
    const newState = favouritesList.filter(
      (favourite: any) => favourite.id !== deletedFavourite.id,
    );
    // use setState func
    setFavouritesList(newState);
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
        hey {favouriteUserId} {favouriteCocktailId}
        {/* your favourite cocktail is #{props.favouriteCocktails.name} called{' '}
        {props.favouriteCocktails.id} {props.favouriteCocktails.username} */}
        {/* hier noch einbauen dass wenn die context id nicht die user id ist, das nicht geht! und auch dass man hier nur herkommt wenn man eingeloggt ist  */}
        {favouritesList.map((favourite: any) => {
          return (
            <div key={`cocktailName-${favourite.id}`}>
              {favourite.name} {favourite.id} {favourite.userId}{' '}
              <button
                onClick={() => {
                  setFavouriteCocktailId(favouriteCocktailId);
                  setFavouriteUserId(favouriteUserId);
                  deleteFavouriteHandler(favourite.userId).catch(() => {
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
