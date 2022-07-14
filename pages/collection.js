import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getCategories, getFullCollectionOfCocktails } from '../util/database';
import { logo, text } from './login';

// CSS

const section = css`
  height: auto;
  width: 100vw;
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
`;

export const smallText = css`
  text-align: center;
  text-transform: uppercase;
  margin-top: 3%;
  margin-bottom: 4rem;
  font-size: 0.6rem;
  line-height: 100%;
`;

const wrapper = css`
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 100px;
  margin-bottom: 10%;

  // when smaller than 800
  @media (max-width: 800px) {
    margin-bottom: 10%;
    margin-left: 5%;
    margin-right: 5%;
  }
`;

const buttonBox = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  line-height: 100%;
  gap: 10px;
  text-align: center;

  button {
    border-radius: 50%;
    height: 2.2rem;
    width: 7rem;
    background-color: white;
    border: 2px solid black;
    font-size: 0.7rem;
    display: relative;
    text-align: center;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const cocktailNameStyle = css`
  border-bottom: 2px dotted #000;
  text-align: left;
  padding: 0.7rem;
  text-transform: uppercase;
  font-family: 'Messapia';
  letter-spacing: 0px;
  font-style: normal;
  font-weight: 700;
  font-size: 1.2rem;
  // when smaller than 1000px
  @media (max-width: 1000px) {
    font-size: 0.9rem;
  }
  // when smaller than 600px
  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
`;
const cocktailCategoryStyle = css`
  border-bottom: 2px dotted #000;
  text-align: left;
  padding: 0.7rem;
  text-transform: uppercase;
  font-size: 0.6rem;

  span {
    position: relative;
    top: 0.3rem;
    // when smaller than 1000px
    @media (max-width: 1000px) {
      top: 0.15rem;
    }
    // when smaller than 600px
    @media (max-width: 600px) {
      top: 0.1rem;
    }
  }
`;
const arrow = css`
  border-bottom: 2px dotted #000;
  text-align: right;
  padding: 0.7rem;
  :hover {
    cursor: pointer;
  }
`;

const collectionBox = css`
  display: grid;
  grid-template-columns: 50% 25% 25%;
`;

const collectionBoxContainer = css`
  border-top: 2px dotted #000;
  margin-top: 4rem;
`;

// FUNCTIONALITY STARTS HERE

export default function Collection(props) {
  const [cocktailList, setCocktailList] = useState(props.collectionCocktail);
  const showCocktailCategory = (category) => {
    setCocktailList(
      props.collectionCocktail.filter(
        (cocktail) => cocktail.category === category,
      ),
    );
  };

  return (
    <div>
      <Head>
        <title>cocktail collection</title>

        <meta name="description" content="full collection of cocktails" />
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
            <div css={text}>get inspired by the full collection</div>
            <div css={smallText}>filter by category</div>

            <div css={buttonBox}>
              <button onClick={() => setCocktailList(props.collectionCocktail)}>
                FULL COLLECTION
              </button>
              {props.categories.map((category) => {
                return (
                  <button
                    key={category.name}
                    onClick={() => {
                      showCocktailCategory(category.name);
                    }}
                  >
                    {category.name.toUpperCase()}
                  </button>
                );
              })}
            </div>
            <div css={collectionBoxContainer}>
              {cocktailList.map((cocktailName) => {
                return (
                  <div
                    css={collectionBox}
                    key={`cocktailName-${cocktailName.id}`}
                  >
                    <div css={cocktailNameStyle}>{cocktailName.name}</div>
                    <div css={cocktailCategoryStyle}>
                      <span> {cocktailName.category}</span>
                    </div>
                    <div css={arrow}>
                      <Link href={`/collection/${cocktailName.id}`}>
                        <Image
                          src="/../images/components/→.svg"
                          width="30px"
                          height="30px"
                          alt="arrow"
                        />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const collectionCocktail = await getFullCollectionOfCocktails();
  const categories = await getCategories();

  // console.log(categories);

  // console.log(collectionCocktail);

  return {
    props: {
      collectionCocktail,
      categories,
    },
  };
}
