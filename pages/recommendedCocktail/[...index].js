import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  getRecommendationBasedOnUrlAndDatabase,
  getUserByValidSessionToken,
} from '../../util/database';

export default function RecommendedCocktail(props) {
  const { query } = useRouter();

  return (
    <div>
      <Head>
        <title>Cocktails</title>
        <meta name="description" content="every hour is cocktail hour" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        coming from url query: <br />
        flavour: {query.flavour} spirit: {query.spirit} level: {query.level}
        <br /> <br />
        explained for checking: <br />
        flavour1 = bitter flavour2 = sour
        <br />
        spirit1 = gin spirit2 = whiskey
        <br /> <br />
        <h1>hey {props.user.username}, you should get a</h1> <br />
        coming from database <br />
        {/* {props.urlInfoQuery.name}*/}
        {/* level: {props.urlInfoQuery.level} */}
        <br />
        flavour: {props.urlInfoQuery.flavour}
        <br />
        {/* spirit: {props.urlInfoQuery.spirit} */}
        {/* {props.urlInfoQuery.description}
        {props.urlInfoQuery.glass}
        {props.urlInfoQuery.ice}
        {props.urlInfoQuery.garnish}
        {props.urlInfoQuery.category}
        {props.urlInfoQuery.image} */}
        {/* {props.urlInfoQuery.size} */}
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

  console.log(context.query.flavour, context.query.spirit, context.query.level);

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
