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
  a {
    color: black;
  }
`;

const wrapper = css`
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 100px;
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
    color: black;
    a {
      color: black;
    }
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
  line-height: 100%;

  // when smaller than 1000px
  @media (max-width: 1000px) {
    font-size: 0.9rem;
    line-height: 100%;
    padding: 0.5rem;
  }
  // when smaller than 600px
  @media (max-width: 600px) {
    font-size: 0.7rem;
    line-height: 100%;
  }
`;
const cocktailCategoryStyle = css`
  border-bottom: 2px dotted #000;
  text-align: left;
  padding: 0.7rem;
  text-transform: uppercase;
  font-size: 0.6rem;
  line-height: 100%;

  // when smaller than 1000px
  @media (max-width: 1000px) {
    padding: 0.5rem;
  }

  span {
    position: relative;
    top: 0.5rem;
    // when smaller than 1000px
    @media (max-width: 1000px) {
      font-size: 0.6rem;
      position: relative;

      top: 0.3rem;
    }
    // when smaller than 600px
    @media (max-width: 600px) {
      font-size: 0.4rem;
      position: relative;
      top: 0.06rem;
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
  // when smaller than 1000px
  @media (max-width: 1000px) {
    padding: 0.5rem;
  }
`;

const collectionBox = css`
  display: grid;
  grid-template-columns: 50% 25% 25%;

  // when smaller than 800
  @media (max-width: 800px) {
    grid-template-columns: 62% 13% 25%;
  }
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
          <Link href="/" css={logo}>
            <span>
              FANCY A <br />
              COCKTAIL?
            </span>
          </Link>
        </div>

        <div css={section}>
          <div css={wrapper}>
            <div css={text}>
              browse through the full collection and get some inspiration
            </div>
            <div css={smallText}>filter by category</div>
            <div css={buttonBox}>
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
              <button onClick={() => setCocktailList(props.collectionCocktail)}>
                FULL COLLECTION
              </button>
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

  return {
    props: {
      collectionCocktail,
      categories,
    },
  };
}
