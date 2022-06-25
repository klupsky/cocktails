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
        <h1>hey {props.user.username}, you should get a</h1>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );

  const recommendedCocktail = await getRecommendationBasedOnCookiesAndDatabase(
    context.query,
  );
  console.log(recommendedCocktail);

  if (user) {
    return {
      props: {
        user: user,
        recommendedCocktail: recommendedCocktail,
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
