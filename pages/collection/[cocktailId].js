import { css } from '@emotion/react';
import Head from 'next/head';
import { getSingleCocktailFromCollection } from '../../util/database';
import { logo } from '../login';

// CSS

// FUNCTIONALITY STARTS HERE

export default function Cocktail(props) {
  if (props.collectionCocktail === null) {
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
        <title>{props.collectionCocktail.name}</title>
        <meta name="description" content="learn more about this cocktail" />
        <link rel="icon" href="/favicon.ico" />
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

        {props.collectionCocktail.id}
        {props.collectionCocktail.name}
        {props.collectionCocktail.level}
        {props.collectionCocktail.flavour}
        {props.collectionCocktail.spirit}
        {props.collectionCocktail.description}
        {props.collectionCocktail.glass}
        {props.collectionCocktail.method}
        {props.collectionCocktail.garnish}
        {props.collectionCocktail.category}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // get the ids that were set in recommendation.js out of the url and pass them to the database query
  const collectionCocktail = await getSingleCocktailFromCollection(
    context.query.cocktailId,
  );

  return {
    props: {
      collectionCocktail: collectionCocktail || null,
    },
  };
}
