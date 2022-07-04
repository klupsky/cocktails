import Head from 'next/head';
import { useState } from 'react';
import {
  getRecommendationBasedOnUrlAndDatabase,
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
          <meta name="description" content="this cocktail does not exist" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>this cocktail does not exist</main>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Cocktails</title>
        <meta name="description" content="every hour is cocktail hour" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          hey {props.user.username} user id: {props.user.id}, you should get a
        </h1>{' '}
        <br />
        <br />
        cocktail id = {props.urlInfoQuery.id}
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
          add this to favourites
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
          no i don't like this, give me another{' '}
        </button>
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

  // get the token from the cookies
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );

  if (user) {
    return {
      props: {
        user: user,
        urlInfoQuery: urlInfoQuery || null,
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
