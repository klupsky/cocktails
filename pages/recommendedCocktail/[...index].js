import Head from 'next/head';
import { useState } from 'react';
// import { useRouter } from 'next/router';
import {
  getRecommendationBasedOnUrlAndDatabase,
  getUserByValidSessionToken,
} from '../../util/database';

export default function RecommendedCocktail(props) {
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
        <h1>hey {props.user.username}, you should get a</h1> <br />
        {props.urlInfoQuery.id}
        {props.urlInfoQuery.name}
        {props.urlInfoQuery.level}
        {props.urlInfoQuery.flavour}
        {props.urlInfoQuery.spirit}
        {props.urlInfoQuery.description}
        {props.urlInfoQuery.glass}
        {props.urlInfoQuery.ice}
        {props.urlInfoQuery.garnish}
        {props.urlInfoQuery.category}
        {props.urlInfoQuery.image}
        {props.urlInfoQuery.size}
        <button>add this to favourites</button>
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

  // console.log(context.query.flavour, context.query.spirit, context.query.level);

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
