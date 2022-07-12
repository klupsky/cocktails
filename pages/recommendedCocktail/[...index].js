import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import {
  checkFavourites,
  getRecommendationBasedOnUrlAndDatabase,
  getRecommendationBasedOnUrlAndDatabaseBackup,
  getUserByValidSessionToken,
} from '../../util/database';
import { logo, section, text } from '../login';
import { errorStyles } from '../register';

export const smallText = css`
  text-align: center;
  text-transform: uppercase;
  margin-top: 3%;
  margin-bottom: 10%;
  font-size: 0.6rem;
  line-height: 100%;
`;

const wrapper = css`
  margin-left: 15%;
  margin-right: 15%;
  margin-bottom: 15%;
  margin-top: 7%;

  // when smaller than 600
  @media (max-width: 600px) {
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 10%;
    margin-top: 13%;
  }
`;

const title = css`
  text-align: center;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  font-family: 'Messapia';
  letter-spacing: 0px;
  line-height: 100%;
  font-style: normal;
  font-weight: 700;
  font-size: 3rem;

  // when smaller than 500
  @media (max-width: 500px) {
    margin-top: 0rem;
    font-size: 0.6rem;
  }
`;

const drinkGrid = css`
  display: grid;
  grid-template-columns: 50% 25% 25%;
  text-align: left;
  gap: 0;
  border-bottom: 2px dotted #000;
  border-top: 2px dotted #000;

  .item1 {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }
  .item2 {
    grid-column: 2 / 2;
  }
  .item3 {
    grid-column: 3 / 3;
  }
`;

export default function RecommendedCocktail(props) {
  const [errors, setErrors] = useState([]);
  const [disable, setDisable] = useState(false);

  function refreshPage() {
    window.location.reload();
  }

  // get the user favourites

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
          <div css={logo}>
            <a href="/">
              <span>
                FANCY A <br />
                COCKTAIL?
              </span>
            </a>
          </div>
          <div css={section}>
            <div css={wrapper}>
              <div css={text}>
                sorry {props.user.username}, there is no cocktail matching all
                of your criteria!
              </div>
              <div css={smallText}>instead, maybe try a</div>
              <div css={title}>{props.urlInfoQueryBackup.name}</div>

              {/* {props.urlInfoQueryBackup.cocktailId} */}

              <div css={drinkGrid}>
                <div className="item1">
                  {props.urlInfoQueryBackup.cocktailId}
                </div>
                <div className="item2">{props.urlInfoQueryBackup.level}</div>
                <div className="item3">{props.urlInfoQueryBackup.spirit}</div>
                {/* {props.urlInfoQueryBackup.flavour}
                {props.urlInfoQueryBackup.description}
                {props.urlInfoQueryBackup.glass}
                {props.urlInfoQueryBackup.method}
                {props.urlInfoQueryBackup.garnish}
                {props.urlInfoQueryBackup.category} */}
              </div>
              {!props.favouritesCheckBackup ? (
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
                onClick={refreshPage}
              >
                GIVE ME ANOTHER!
              </button>
              <Link href="/recommendation">
                <button>GO BACK</button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>cocktail recommendation</title>
        <meta name="description" content="your cocktail recommendation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div css={section}>
          <div css={wrapper}>
            <div css={text}>{props.user.username}, you should order a</div>

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
            {!props.favouritesCheck ? (
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
                refreshPage().catch(() => {
                  console.log('reload failed');
                });
              }}
            >
              GIVE ME ANOTHER!{' '}
            </button>
            <Link href="/recommendation">
              <button>GO BACK</button>
            </Link>
          </div>
        </div>
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

  if (!user) {
    return {
      redirect: {
        destination: `/login?returnTo=/`,
        permanent: false,
      },
    };
  }

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
        favouritesCheck: favouritesCheck || null,
      },
    };
  } else {
    const favouritesCheckBackup = await checkFavourites(
      user.id,
      urlInfoQueryBackup.cocktailId,
    );

    return {
      props: {
        user: user,
        urlInfoQuery: urlInfoQuery || null,
        urlInfoQueryBackup: urlInfoQueryBackup || null,
        favouritesCheckBackup: favouritesCheckBackup || null,
      },
    };
  }
}
