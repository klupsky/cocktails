import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  checkFavourites,
  getRecommendationBasedOnUrlAndDatabase,
  getRecommendationBasedOnUrlAndDatabaseBackup,
  getUserByValidSessionToken,
} from '../../util/database';
import { text } from '../login';

// CSS

export const smallText = css`
  text-align: center;
  text-transform: uppercase;
  margin-top: 3%;
  font-size: 0.6rem;
  line-height: 100%;
`;

export const wrapper = css`
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 200px;
  margin-bottom: 10%;

  @media (max-width: 1500px) {
    margin-left: 15%;
    margin-right: 15%;
  }

  // when smaller than 800
  @media (max-width: 800px) {
    margin-bottom: 10%;
    margin-left: 5%;
    margin-right: 5%;
  }
`;

const logo = css`
  text-align: center;
  font-size: 1rem;
  line-height: 100%;
  font-family: 'Messapia';
  letter-spacing: 0px;
  text-transform: uppercase;
  position: relative;
  top: 70px;
  margin-bottom: 110px;
  color: #000000;
  z-index: 2;

  // when smaller than 600
  @media (max-width: 600px) {
    font-size: 0.7rem;
    line-height: 100%;
  }
`;

const title = css`
  text-align: center;
  margin-bottom: 2.5rem;
  margin-top: 2rem;
  text-transform: uppercase;
  font-family: 'Messapia';
  letter-spacing: 0px;
  line-height: 100%;
  font-style: normal;
  font-weight: 700;
  font-size: 2.8rem;

  // when smaller than 1000
  @media (max-width: 1000px) {
    font-size: 2rem;
    margin-top: 1.8rem;
    margin-bottom: 2rem;
  }

  // when smaller than 600
  @media (max-width: 600px) {
    font-size: 1.3rem;
    margin-top: 2.2rem;
    margin-bottom: 1.8rem;
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
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
`;

const errorStyles = css`
  color: #e75c3c;
  margin-top: 3%;
  text-align: center;
  font-size: 0.8rem;
  line-height: 100%;
  font-family: 'Messapia';
  letter-spacing: 0px;
  text-transform: uppercase;
`;

export const ellipse = css`
  border-radius: 50%;
  height: 2.2rem;
  width: 7rem;
  background-color: white;
  font-size: 0.7rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 0;
`;

const ellipsePosition = css`
  position: relative;
  top: 3.9rem;
  left: 1.5rem;
  transform: rotate(15deg);
  // when smaller than 1200
  @media (max-width: 1200px) {
    top: 3rem;
    left: -1.5rem;
    // when smaller than 600
    @media (max-width: 600px) {
      top: -29.5rem;
      left: 0rem;
    }
  }
`;

const description = css`
  margin-top: 5rem;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  // when smaller than 600
  @media (max-width: 600px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const buttonBox = css`
  margin-top: 0.5rem;
  align-items: center;
  text-align: center;
  margin-bottom: 0.6rem;

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
    // when smaller than 600
    @media (max-width: 600px) {
      font-size: 0.6rem;
    }
  }
`;

const imageStyleSmall = css`
  text-align: center;
  margin: 0;
`;

const imageStyle = css`
  text-align: center;
  align-items: center;
  margin-top: 1%;
  margin-bottom: 5%;
`;

const addFavouriteStyle = css`
  margin-top: 0.1rem;
  button {
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
    margin-top: 0.4rem;
    text-align: center;
  }
`;

const drinkGrid = css`
  display: grid;
  grid-template-columns: 50% 25% 25%;
  text-align: left;
  gap: 0;
  border-bottom: 2px dotted #000;
  border-top: 2px dotted #000;

  .item10 {
    grid-column: 1 / 1;
    grid-row: 1;
  }

  .item1 {
    grid-column: 1 / 2;
    grid-row: 2 / 5;
    // when smaller than 600px
    @media (max-width: 600px) {
      grid-column: 1 / 4;
    }
  }
  .item2 {
    grid-column: 2 / 2;
    border-left: 2px dotted #000;
    // when smaller than 600px
    @media (max-width: 600px) {
      grid-column: 1 / 2;
      grid-row: 6;
      border-left: none;
      border-right: 2px dotted #000;
    }
  }
  .item3 {
    grid-column: 3 / 3;
    border-left: 2px dotted #000;
    // when smaller than 600px

    @media (max-width: 600px) {
      grid-column: 2 / 4;
      grid-row: 6;
      border-left: none;
    }
  }
  .item4 {
    grid-column: 2 / 2;
    grid-row: 2 / 4;
    border-left: 2px dotted #000;
    border-top: 2px dotted #000;
    border-bottom: 2px dotted #000;
    // when smaller than 600px

    @media (max-width: 600px) {
      grid-column: 1 / 2;
      grid-row: 7 / 9;
      border-left: none;
      border-right: 2px dotted #000;
      border-bottom: none;
    }
  }
  .item5 {
    grid-column: 3 / 3;
    grid-row: 2;
    border-top: 2px dotted #000;
    border-bottom: 2px dotted #000;
    border-left: 2px dotted #000;
    // when smaller than 600px

    @media (max-width: 600px) {
      grid-column: 2 / 4;
      grid-row: 7;
      border-left: none;
    }
  }

  .item9 {
    grid-column: 3 / 3;
    grid-row: 3;
    border-bottom: 2px dotted #000;
    border-left: 2px dotted #000;
    // when smaller than 600px
    @media (max-width: 600px) {
      grid-column: 2 / 4;
      grid-row: 8;
      border-left: none;
      border-bottom: none;
    }
  }

  .item6 {
    grid-column: 2 / 4;
    grid-row: 4;
    border-left: 2px dotted #000;
    // when smaller than 600px
    @media (max-width: 600px) {
      grid-column: 1 / 4;
      grid-row: 5;
      border-left: none;
      border-top: 2px dotted #000;
      border-bottom: 2px dotted #000;
    }
  }

  .item7 {
    grid-column: 1 / 2;
    grid-row: 5;
    border-top: 2px dotted #000;
    // when smaller than 600px

    @media (max-width: 600px) {
      grid-column: 1 / 2;
      grid-row: 9;
      border-right: 2px dotted #000;
    }
  }
  .item8 {
    grid-column: 2 / 4;
    grid-row: 5;
    border-top: 2px dotted #000;
    border-left: 2px dotted #000;
    // when smaller than 600px

    @media (max-width: 600px) {
      grid-column: 2 / 4;
      grid-row: 9;
      border-left: none;
    }
  }
`;

// FUNCTIONALITY STARTS HERE

export default function RecommendedCocktail(props) {
  const [errors, setErrors] = useState([]);
  const [disable, setDisable] = useState(false);

  const router = useRouter();

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

  // if there is no matching cocktail, return this backup version:

  if (props.urlInfoQuery === null) {
    return (
      <div>
        <Head>
          <title>Cocktails</title>
          <meta name="description" content="your cocktail recommendation" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div css={logo}>
            <Link href="/">
              <span>
                FANCY A <br />
                COCKTAIL?
              </span>
            </Link>
          </div>

          <div
            css={css`
              width: 100vw;
              overflow: hidden;
              z-index: 1;
              background-color: ${props.urlInfoQueryBackup.flavourcolour};
              position: relative;
              margin-top: -170px;
              // when smaller than 600
              @media (max-width: 600px) {
              }
            `}
          >
            <div css={wrapper}>
              <div css={text}>
                sorry {props.user.username}, there is no cocktail matching all
                of your criteria!
              </div>
              <div css={smallText}>instead, maybe try a</div>
              <div css={title}>{props.urlInfoQueryBackup.name}</div>
              <div css={drinkGrid}>
                <div className="item10">
                  {!props.favouritesCheckBackup ? (
                    <div css={addFavouriteStyle}>
                      {disable === false ? (
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
                          <Image
                            src="/../../images/components/heart1.svg"
                            width="35px"
                            height="35px"
                            alt="add to favourites"
                          />
                        </button>
                      ) : (
                        <button id="add to favourites" disabled>
                          <Link href={`/users/${props.user.id}`}>
                            <Image
                              src="/../../images/components/heart2.svg"
                              width="35px"
                              height="35px"
                              alt="go to favourites"
                            />
                          </Link>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div css={addFavouriteStyle}>
                      <button id="add to favourites" disabled>
                        <Link href={`/users/${props.user.id}`}>
                          <Image
                            src="/../../images/components/heart2.svg"
                            width="35px"
                            height="35px"
                            alt="go to favourites"
                          />
                        </Link>
                      </button>
                    </div>
                  )}
                </div>
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

                  <div css={word}>
                    {props.urlInfoQueryBackup.method}

                    <div css={ellipsePosition}>
                      <div css={ellipse}>
                        <div>
                          {props.urlInfoQueryBackup.level === 1
                            ? 'LIIIIIGHT'
                            : props.urlInfoQueryBackup.level === 2
                            ? 'NIIIIICE'
                            : 'STROOOOONG'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="item6">
                  <div css={description}>
                    {props.urlInfoQueryBackup.description.toLowerCase()}
                  </div>
                </div>

                <div className="item7">
                  <div css={buttonBox}>
                    <button
                      data-test-id="generate-recommendation-2"
                      type="button"
                      onClick={() => {
                        router
                          .push(
                            `/recommendedCocktail/recommendation?flavour=${props.urlInfoQueryBackup.flavourid}&spirit=${props.urlInfoQueryBackup.spiritid}&level=${props.urlInfoQueryBackup.levelid}`,
                          )
                          .catch(console.log('error'));
                      }}
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
            </div>
          </div>
        </main>
      </div>
    );
  }

  // if there is a matching cocktail, return this version:

  return (
    <div>
      <Head>
        <title>cocktail recommendation</title>
        <meta name="description" content="your cocktail recommendation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div css={logo}>
          <Link href="/">
            <span>
              FANCY A <br />
              COCKTAIL?
            </span>
          </Link>
        </div>
        <div
          css={css`
            width: 100vw;
            overflow: hidden;
            z-index: 1;
            background-color: ${props.urlInfoQuery.flavourcolour};
            position: relative;
            margin-top: -150px;
            // when smaller than 600
            @media (max-width: 600px) {
            }
          `}
        >
          <div css={wrapper}>
            <div css={text}>{props.user.username}, you should order a</div>
            <div css={title}>{props.urlInfoQuery.name}</div>

            <div css={drinkGrid}>
              <div className="item10">
                {!props.favouritesCheck ? (
                  <div css={addFavouriteStyle}>
                    {disable === false ? (
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
                        <Image
                          src="/../../images/components/heart1.svg"
                          width="35px"
                          height="35px"
                          alt="add to favourites"
                        />
                      </button>
                    ) : (
                      <button id="add to favourites" disabled>
                        <Link href={`/users/${props.user.id}`}>
                          <Image
                            src="/../../images/components/heart2.svg"
                            width="35px"
                            height="35px"
                            alt="go to favourites"
                          />
                        </Link>
                      </button>
                    )}
                  </div>
                ) : (
                  <div css={addFavouriteStyle}>
                    <button id="add to favourites" disabled>
                      <Link href={`/users/${props.user.id}`}>
                        <Image
                          src="/../../images/components/heart2.svg"
                          width="35px"
                          height="35px"
                          alt="go to favourites"
                        />
                      </Link>
                    </button>
                  </div>
                )}
              </div>
              <div className="item1">
                <div css={imageStyle}>
                  <Image
                    src={`/../../images/cocktail/${props.urlInfoQuery.cocktailId}.svg`}
                    alt="{props.urlInfoQuery.glass}"
                    width="400px"
                    height="400px"
                  />
                </div>
              </div>
              <div className="item2">
                <div css={headline}>Category</div>
                <div css={word}>{props.urlInfoQuery.category}</div>
              </div>
              <div className="item3">
                <div css={headline}>Spirit</div>
                <div css={word}>{props.urlInfoQuery.spirit}</div>
              </div>
              <div className="item4">
                <div css={headline}>Glass</div>
                <div css={word}>{props.urlInfoQuery.glass}</div>
                <div css={imageStyleSmall}>
                  <Image
                    src={`/../../images/glass/${props.urlInfoQuery.glass}.svg`}
                    alt="{props.urlInfoQuery.glass}"
                    width="150px"
                    height="150px"
                  />
                </div>{' '}
              </div>
              <div className="item5">
                <div css={headline}>Garnish</div>
                <div css={word}>{props.urlInfoQuery.garnish}</div>
              </div>
              <div className="item9">
                <div css={headline}>Method</div>
                <div css={word}>
                  {props.urlInfoQuery.method}

                  <div css={ellipsePosition}>
                    <div css={ellipse}>
                      <div>
                        {props.urlInfoQuery.level === 1
                          ? 'LIIIIIGHT'
                          : props.urlInfoQuery.level === 2
                          ? 'NIIIIICE'
                          : 'STROOOOONG'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item6">
                <div css={description}>
                  {props.urlInfoQuery.description.toLowerCase()}
                </div>
              </div>

              <div className="item7">
                <div css={buttonBox}>
                  <button
                    data-test-id="generate-recommendation-2"
                    type="button"
                    onClick={() => {
                      router
                        .push(
                          `/recommendedCocktail/recommendation?flavour=${props.urlInfoQuery.flavourid}&spirit=${props.urlInfoQuery.spiritid}&level=${props.urlInfoQuery.levelid}`,
                        )
                        .catch(console.log('error'));
                    }}
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
                  {errors.map((error) => (
                    <div css={errorStyles} key={`error-${error.message}`}>
                      {error.message}
                    </div>
                  ))}

                  {/* {props.urlInfoQuery.cocktailId}
            {props.urlInfoQuery.name}
            {props.urlInfoQuery.level}
            {props.urlInfoQuery.flavour}
            {props.urlInfoQuery.flavourColour}

            {props.urlInfoQuery.spirit}
            {props.urlInfoQuery.description}
            {props.urlInfoQuery.glass}
            {props.urlInfoQuery.method}
            {props.urlInfoQuery.garnish}
            {props.urlInfoQuery.category} */}
                  {/* {!props.favouritesCheck ? (
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
            )} */}
                  {/*
            {errors.map((error) => (
              <div css={errorStyles} key={`error-${error.message}`}>
                {error.message}
              </div>
            ))}
            <br /> */}
                  {/* <button
              data-test-id="generate-recommendation-2"
              type="button"
              onClick={() => {
                refreshPage().catch(() => {
                  console.log('reload failed');
                });
              }}
            >
              GIVE ME ANOTHER!{' '}
            </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
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

  // get the ids that were set in recommendation.js out of the url and pass them to the database query
  const urlInfoQuery = await getRecommendationBasedOnUrlAndDatabase(
    context.query.flavour,
    context.query.spirit,
    context.query.level,
  );

  const urlInfoQueryBackup = await getRecommendationBasedOnUrlAndDatabaseBackup(
    context.query.spirit,
  );

  // console.log(urlInfoQuery);
  if (!urlInfoQuery) {
    const favouritesCheckBackup = await checkFavourites(
      user.id,
      urlInfoQueryBackup.cocktailId,
    );

    return {
      props: {
        user: user,
        urlInfoQuery: null,
        urlInfoQueryBackup: urlInfoQueryBackup,
        favouritesCheckBackup: favouritesCheckBackup || null,
      },
    };
  } else {
    const favouritesCheck = await checkFavourites(
      user.id,
      urlInfoQuery.cocktailId,
    );

    return {
      props: {
        user: user,
        urlInfoQuery: urlInfoQuery,
        urlInfoQueryBackup: null,
        favouritesCheck: favouritesCheck || null,
      },
    };
  }
}
