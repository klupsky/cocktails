import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
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
  font-size: 2.8rem;

  // when smaller than 500
  @media (max-width: 500px) {
    margin-top: 0rem;
    font-size: 2rem;
  }
`;

const headline = css`
  text-transform: uppercase;
  line-height: 100%;
  margin-top: 0.5rem;
  font-size: 0.4rem;
  margin-left: 0.5rem;
`;
const word = css`
  line-height: 100%;
  margin-top: 0.3rem;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
`;

const description = css`
  line-height: 100%;
  margin-top: 3rem;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
`;

const buttonBox = css`
  margin-top: 0.5rem;
  align-items: center;
  text-align: center;
  margin-bottom: 0.8rem;

  button {
    color: black;
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
    margin-top: 0.4rem;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Messapia';
    letter-spacing: 0px;
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
  }
`;

const imageStyleSmall = css`
  position: relative;
  top: -0.4rem;
  left: -0.5rem;

  text-align: center;
  margin: 0;
`;

const imageStyle = css`
  text-align: center;
  align-items: center;
  margin-top: 10%;
  margin-bottom: 5%;
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
    grid-row: 1 / 5;
  }
  .item2 {
    grid-column: 2 / 2;
    border-left: 2px dotted #000;
  }
  .item3 {
    grid-column: 3 / 3;
    border-left: 2px dotted #000;
  }
  .item4 {
    grid-column: 2 / 2;
    grid-row: 2 / 4;
    border-left: 2px dotted #000;
    border-top: 2px dotted #000;
    border-bottom: 2px dotted #000;
  }
  .item5 {
    grid-column: 3 / 3;
    grid-row: 2;
    border-top: 2px dotted #000;
    border-bottom: 2px dotted #000;
    border-left: 2px dotted #000;
  }

  .item9 {
    grid-column: 3 / 3;
    grid-row: 3;
    border-bottom: 2px dotted #000;
    border-left: 2px dotted #000;
  }

  .item6 {
    grid-column: 2 / 4;
    grid-row: 4;
    border-left: 2px dotted #000;
  }

  .item7 {
    grid-column: 1 / 2;
    grid-row: 5;
    border-top: 2px dotted #000;
  }
  .item8 {
    grid-column: 2 / 4;
    grid-row: 5;
    border-top: 2px dotted #000;
    border-left: 2px dotted #000;
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
              {/* {props.urlInfoQueryBackup.level} */}
              {/* {props.urlInfoQueryBackup.flavour}
                {props.urlInfoQueryBackup.description}
                {props.urlInfoQueryBackup.glass}
                {props.urlInfoQueryBackup.method}
                {props.urlInfoQueryBackup.garnish}
                {props.urlInfoQueryBackup.category} */}
              <div css={drinkGrid}>
                <div className="item1">
                  <div css={imageStyle}>
                    <Image
                      src={`/../../images/cocktail/${props.urlInfoQueryBackup.cocktailId}.svg`}
                      alt="{props.urlInfoQueryBackup.glass}"
                      width="400px"
                      height="400px"
                    />
                  </div>
                </div>
                <div className="item2">
                  <div css={headline}>Category</div>
                  <div css={word}>{props.urlInfoQueryBackup.category}</div>
                </div>
                <div className="item3">
                  <div css={headline}>Spirit</div>
                  <div css={word}>{props.urlInfoQueryBackup.spirit}</div>
                </div>
                <div className="item4">
                  <div css={headline}>Glass</div>
                  <div css={word}>{props.urlInfoQueryBackup.glass}</div>
                  <div css={imageStyleSmall}>
                    <Image
                      src={`/../../images/glass/${props.urlInfoQueryBackup.glass}.svg`}
                      alt="{props.urlInfoQueryBackup.glass}"
                      width="150px"
                      height="150px"
                    />
                  </div>
                </div>
                <div className="item5">
                  <div css={headline}>Garnish</div>
                  <div css={word}>{props.urlInfoQueryBackup.garnish}</div>
                </div>
                <div className="item9">
                  <div css={headline}>Method</div>
                  <div css={word}>{props.urlInfoQueryBackup.method}</div>
                </div>
                <div className="item6">
                  <div css={description}>
                    {props.urlInfoQueryBackup.description} blah blah blah blah
                    blah blah blah blah blah blah blah blah blah
                  </div>
                </div>

                <div className="item7">
                  <div css={buttonBox}>
                    <button
                      data-test-id="generate-recommendation-2"
                      type="button"
                      onClick={refreshPage}
                    >
                      ANOTHER ONE!
                    </button>
                  </div>
                </div>
                <div className="item8">
                  <div css={buttonBox}>
                    <Link href="/recommendation">
                      <button>GO BACK!</button>
                    </Link>
                  </div>
                </div>
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
              )}{' '}
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
