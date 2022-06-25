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
        {props.recommendedCocktail.name}
        {props.recommendedCocktail.level}
        {props.recommendedCocktail.flavour}
        {props.recommendedCocktail.spirit}
        {props.recommendedCocktail.description}
        {props.recommendedCocktail.glass}
        {props.recommendedCocktail.ice}
        {props.recommendedCocktail.garnish}
        {props.recommendedCocktail.category}
        {props.recommendedCocktail.image}
        {props.recommendedCocktail.size}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );

  const recommendedCocktails = await getRecommendationBasedOnCookiesAndDatabase(
    context.query,
  );
  // console.log(recommendedCocktails);

  const recommendedCocktail = {
    name: recommendedCocktails.name,
    level: recommendedCocktails.level,
    flavour: recommendedCocktails.flavour,
    spirit: recommendedCocktails.spirit,
    description: recommendedCocktails.description,
    glass: recommendedCocktails.glass,
    ice: recommendedCocktails.ice,
    garnish: recommendedCocktails.garnish,
    category: recommendedCocktails.category,
    image: recommendedCocktails.image,
    size: recommendedCocktails.size,
  };
  // console.log(recommendedCocktail);

  if (user) {
    return {
      props: {
        user: user,
        recommendedCocktail,
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
