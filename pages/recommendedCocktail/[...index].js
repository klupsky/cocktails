import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import {
  checkFavourites,
  getRecommendationBasedOnUrlAndDatabase,
  getRecommendationBasedOnUrlAndDatabaseBackup,
  getUserByValidSessionToken,
} from '../../util/database';
import { errorStyles } from '../register';

export default function RecommendedCocktail(props) {
  const [errors, setErrors] = useState([]);
  const [disable, setDisable] = useState(false);
  // const [favouriteCocktail, setFavouriteCocktail] = useState(
  //   props.urlInfoQuery,
  // );

  function refreshPage() {
    window.location.reload();
  }

  // get the user favourites

  // useEffect(() => {
  //   async function getUserFavourites() {
  //     const response = await fetch(`../api/favourites/${props.user.id}`);
  //     const favourites = await response.json();
  //     setFavouriteCocktail(favourites);
  //   }
  //   getUserFavourites().catch(() => {
  //     console.log('favourites request fails');
  //   });
  // }, [props]);

  async function addToFavouritesHandler() {
    const favouriteResponse = await fetch('../api/favourites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: props.user.id,
        cocktailId: props.urlInfoQuery.cocktailId,
      }),
    });
    const createdCocktail = await favouriteResponse.json();
    // if we have error show an error message
    if ('errors' in createdCocktail) {
      setErrors(createdCocktail.errors);
      return;
    }
  }

  async function addToFavouritesHandlerBackup() {
    const favouriteResponse = await fetch('../api/favourites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: props.user.id,
        cocktailId: props.urlInfoQueryBackup.cocktailId,
      }),
    });

    const createdCocktail = await favouriteResponse.json();
    // if we have error show an error message
    if ('errors' in createdCocktail) {
      setErrors(createdCocktail.errors);
      return;
    }
  }

  if (props.urlInfoQuery === null) {
    return (
      <div>
        {' '}
        <Head>
          <title>Cocktails</title>
          <meta name="description" content="your cocktail recommendation" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1>
            sorry {props.user.username}, we can't recommend any drink that
            matches all of your criteria. instead, maybe try a{' '}
          </h1>
          {props.urlInfoQueryBackup.cocktailId}
          {props.urlInfoQueryBackup.name}
          {props.urlInfoQueryBackup.level}
          {props.urlInfoQueryBackup.flavour}
          {props.urlInfoQueryBackup.spirit}
          {props.urlInfoQueryBackup.description}
          {props.urlInfoQueryBackup.glass}
          {props.urlInfoQueryBackup.method}
          {props.urlInfoQueryBackup.garnish}
          {props.urlInfoQueryBackup.category}
          {/* {console.log(props.favouritesCheckBackup)} */}
          {!props.favouritesCheckBackup ? (
            <button id="add to favourites" disabled>
              IS ALREADY FAVOURITE
            </button>
          ) : (
            <button
              id="add to favourites"
              disabled={disable}
              onClick={() => {
                setDisable(true);
                addToFavouritesHandlerBackup().catch(() => {
                  console.log('adding favourite failed');
                });
              }}
            >
              ADD TO FAVOURITES
            </button>
          )}
          {errors.map((error) => (
            <div css={errorStyles} key={`error-${error.message}`}>
              {error.message}
            </div>
          ))}
          <br />
          <button
            data-test-id="generate-recommendation-2"
            type="button"
            onClick={refreshPage}
          >
            GIVE ME ANOTHER!{' '}
          </button>
          <Link href="/recommendation">
            <button>GO BACK</button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Cocktails</title>
        <meta name="description" content="your cocktail recommendation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{props.user.username}, we recommend a</h1>
        <br />
        <br />
        {props.urlInfoQuery.cocktailId}
        {props.urlInfoQuery.name}
        {props.urlInfoQuery.level}
        {props.urlInfoQuery.flavour}
        {props.urlInfoQuery.spirit}
        {props.urlInfoQuery.description}
        {props.urlInfoQuery.glass}
        {props.urlInfoQuery.method}
        {props.urlInfoQuery.garnish}
        {props.urlInfoQuery.category}
        {/* {console.log(props.favouritesCheck)} */}
        {props.favouritesCheck.cocktailId ? (
          <button
            id="add to favourites"
            disabled={disable}
            onClick={() => {
              setDisable(true);
              addToFavouritesHandler().catch(() => {
                console.log('adding favourite failed');
              });
            }}
          >
            ADD TO FAVOURITES
          </button>
        ) : (
          <button id="add to favourites" disabled>
            IS ALREADY FAVOURITE
          </button>
        )}

        {errors.map((error) => (
          <div css={errorStyles} key={`error-${error.message}`}>
            {error.message}
          </div>
        ))}
        <br />
        <button
          data-test-id="generate-recommendation-2"
          type="button"
          onClick={() => {
            window.location.reload().catch(() => {
              console.log('reload failed');
            });
          }}
        >
          GIVE ME ANOTHER!{' '}
        </button>
        <Link href="/recommendation">
          <button>GO BACK</button>
        </Link>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // get the ids that were set in recommendation.js out of the url and pass them to the database query
  const urlInfoQuery = await getRecommendationBasedOnUrlAndDatabase(
    context.query.flavour,
    context.query.spirit,
    context.query.level,
  );
  // console.log(urlInfoQuery.cocktailId);

  const urlInfoQueryBackup = await getRecommendationBasedOnUrlAndDatabaseBackup(
    context.query.spirit,
  );
  // console.log(urlInfoQueryBackup.cocktailId);

  // get the token from the cookies
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );

  if (user && urlInfoQuery) {
    const favouritesCheck = await checkFavourites(
      user.id,
      urlInfoQuery.cocktailId,
    );

    return {
      props: {
        user: user,
        urlInfoQuery: urlInfoQuery || null,
        urlInfoQueryBackup: urlInfoQueryBackup || null,
        favouritesCheck: favouritesCheck,
      },
    };
  }

  if (user && urlInfoQueryBackup) {
    const favouritesCheckBackup = await checkFavourites(
      user.id,
      urlInfoQueryBackup.cocktailId,
    );
    // console.log(favouritesCheckBackup);
    return {
      props: {
        user: user,
        urlInfoQuery: urlInfoQuery || null,
        urlInfoQueryBackup: urlInfoQueryBackup || null,
        favouritesCheckBackup: favouritesCheckBackup,
      },
    };
  }

  return {
    redirect: {
      destination: `/login?returnTo=/`,
      permanent: false,
    },
  };
}
