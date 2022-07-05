import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import {
  getRecommendationBasedOnUrlAndDatabase,
  getRecommendationBasedOnUrlAndDatabaseBackup,
  getUserByValidSessionToken,
} from '../../util/database';
import { errorStyles } from '../register';

export default function RecommendedCocktail(props) {
  const [errors, setErrors] = useState([]);

  async function addToFavouritesHandler() {
    const favouriteResponse = await fetch('../api/favourites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: props.user.id,
        cocktailId: props.urlInfoQuery.id,
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
          {props.urlInfoQueryBackup.name}
          {props.urlInfoQueryBackup.level}
          {props.urlInfoQueryBackup.flavour}
          {props.urlInfoQueryBackup.spirit}
          {props.urlInfoQueryBackup.description}
          {props.urlInfoQueryBackup.glass}
          {props.urlInfoQueryBackup.method}
          {props.urlInfoQueryBackup.garnish}
          {props.urlInfoQueryBackup.category}
          <button
            onClick={() => {
              addToFavouritesHandler().catch(() => {
                console.log('adding favourite failed');
              });
            }}
          >
            ADD TO FAVOURITES
          </button>
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

  return (
    <div>
      <Head>
        <title>Cocktails</title>
        <meta name="description" content="your cocktail recommendatiomn" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{props.user.username}, we recommend a</h1>
        <br />
        <br />

        {props.urlInfoQuery.name}
        {props.urlInfoQuery.level}
        {props.urlInfoQuery.flavour}
        {props.urlInfoQuery.spirit}
        {props.urlInfoQuery.description}
        {props.urlInfoQuery.glass}
        {props.urlInfoQuery.method}
        {props.urlInfoQuery.garnish}
        {props.urlInfoQuery.category}
        <button
          onClick={() => {
            addToFavouritesHandler().catch(() => {
              console.log('adding favourite failed');
            });
          }}
        >
          ADD TO FAVOURITES
        </button>
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

  const urlInfoQueryBackup = await getRecommendationBasedOnUrlAndDatabaseBackup(
    context.query.spirit,
  );

  // get the token from the cookies
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );

  if (user) {
    return {
      props: {
        user: user,
        urlInfoQuery: urlInfoQuery || null,
        urlInfoQueryBackup: urlInfoQueryBackup || null,
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
