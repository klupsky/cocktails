import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  getNumberOfFavourites,
  getSingleCocktailFromCollection,
} from '../../util/database';
import { text } from '../login';

// CSS

const logo = css`
  text-align: center;
  font-size: 1rem;
  line-height: 100%;
  font-family: 'Messapia';
  letter-spacing: 0px;
  text-transform: uppercase;
  position: relative;
  top: -30px;
  color: #000000;
  z-index: 2;

  a {
    color: black;
  }
  :hover {
    cursor: pointer;
  }

  // when smaller than 600
  @media (max-width: 600px) {
    font-size: 0.7rem;
    line-height: 100%;
  }
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

const favouritesStyle = css`
  margin-top: 0.4rem;
  display: flex;
  .numberStyle {
    font-size: 0.9rem;
    line-height: 100%;
    margin-left: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const imageStyle = css`
  text-align: center;
  align-items: center;
  margin-top: 1%;
  margin-bottom: 5%;
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

const imageStyleSmall = css`
  text-align: center;
  margin: 0;
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
          <Link href="/" css={logo}>
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
            background-color: ${props.collectionCocktail.flavourcolour};
            position: relative;
            margin-top: -150px;
          `}
        >
          <div css={wrapper}>
            <div css={text}>this cocktail is a</div>
            <div css={title}>{props.collectionCocktail.name}</div>
            <div css={drinkGrid}>
              <div className="item10">
                <div css={favouritesStyle}>
                  <Image
                    src="/../../images/components/heart1.svg"
                    width="35px"
                    height="35px"
                    alt="add to favourites"
                  />
                  <div className="numberStyle">
                    {props.numberOfFavourites.length}
                  </div>
                </div>
              </div>
              <div className="item1">
                <div css={imageStyle}>
                  <Image
                    src={`/../../images/cocktail/${props.collectionCocktail.id}.svg`}
                    alt="{props.urlInfoQueryBackup.glass}"
                    width="400px"
                    height="400px"
                  />
                </div>
              </div>

              <div className="item2">
                <div css={headline}>Category</div>
                <div css={word}>{props.collectionCocktail.category}</div>
              </div>

              <div className="item3">
                <div css={headline}>Spirit</div>
                <div css={word}>{props.collectionCocktail.spirit}</div>
              </div>
              <div className="item4">
                <div css={headline}>Glass</div>
                <div css={word}>{props.collectionCocktail.glass}</div>
                <div css={imageStyleSmall}>
                  <Image
                    src={`/../../images/glass/${props.collectionCocktail.glass}.svg`}
                    alt="{props.urlInfoQuery.glass}"
                    width="150px"
                    height="150px"
                  />
                </div>
              </div>
              <div className="item5">
                <div css={headline}>Garnish</div>
                <div css={word}>{props.collectionCocktail.garnish}</div>
              </div>

              <div className="item9">
                <div css={headline}>Method</div>

                <div css={word}>
                  {props.collectionCocktail.method}

                  <div css={ellipsePosition}>
                    <div css={ellipse}>
                      <div>
                        {props.collectionCocktail.level === 1
                          ? 'LIIIIIGHT'
                          : props.collectionCocktail.level === 2
                          ? 'NIIIIICE'
                          : 'STROOOOONG'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item6">
                <div css={description}>
                  {props.collectionCocktail.description.toLowerCase()}
                </div>
              </div>
            </div>{' '}
          </div>{' '}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // get the ids that were set in recommendation.js out of the url and pass them to the database query
  const collectionCocktail = await getSingleCocktailFromCollection(
    context.query.cocktailId,
  );

  const numberOfFavourites = await getNumberOfFavourites(
    context.query.cocktailId,
  );

  return {
    props: {
      collectionCocktail: collectionCocktail,
      numberOfFavourites: numberOfFavourites,
    },
  };
}
