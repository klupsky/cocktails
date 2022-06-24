import Head from 'next/head';
import {
  getRecommendationBasedOnCookiesAndDatabase,
  getUserByValidSessionToken,
} from '../util/database';

export default function RecommendedCocktail(props) {
  return (
    <div>
      <Head>
        <title>Cocktails</title>
        <meta name="description" content="every hour is cocktail hour" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>hey {props.user.username} drink this</h1>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );

  const recommendedCocktail = await getRecommendationBasedOnCookiesAndDatabase(
    context.query.cocktailId,
  );
  console.log(recommendedCocktail);

  if (user) {
    return {
      props: {
        user: user,
      },
    };
  }

  return {
    redirect: {
      destination: `/login?returnTo=/recommendedCocktail`,
      permanent: false,
    },
  };
}
