import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import DisabledStar from '../../components/DisabledStars';
import RatingStarFive from '../../components/RatingStars/RatingStarFive';
import RatingStarFour from '../../components/RatingStars/RatingStarFour';
import RatingStarOne from '../../components/RatingStars/RatingStarOne';
import RatingStarThree from '../../components/RatingStars/RatingStarThree';
import RatingStarTwo from '../../components/RatingStars/RatingStarTwo';
import Star from '../../components/Star';
import {
  checkReviews,
  getNumberOfFavourites,
  getReviewByCocktailId,
  getSingleCocktailFromCollection,
  getUserByValidSessionToken,
} from '../../util/database';
import { text } from '../login';

// CSS

const errorStyles = css`
  color: #e75c3c;
  text-align: center;
  font-size: 0.8rem;
  line-height: 100%;
  font-family: 'Messapia';
  letter-spacing: 0px;
  text-transform: uppercase;
  margin-bottom: 10%;
  margin-top: 5%;
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
    margin-left: 5%;
    margin-right: 5%;
  }
`;
export const wrapperReview = css`
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 2rem;

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

  .reviewAlreadyReviewedStyle {
    margin-bottom: 2rem;

    .reviewAlreadyReviewedStyleText {
      margin-bottom: 4rem;
    }
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
  margin-bottom: 0.6rem;

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

  .item11 {
    grid-column: 1 / 4;
    grid-row: 6;
    border-top: 2px dotted #000;

    // when smaller than 600px

    @media (max-width: 600px) {
      grid-column: 1 / 4;
      grid-row: 10;
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

const bottomLink = css`
  margin-top: 0.8rem;
  align-items: center;
  text-align: center;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  font-family: 'Messapia';
  letter-spacing: 0px;
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;

  a {
    color: black;
  }

  // when smaller than 600
  @media (max-width: 600px) {
    font-size: 0.6rem;
  }
`;

const reviewStyle = css`
  text-align: center;

  .reviewHeadlineStyle {
    margin-top: 0.8rem;
    align-items: center;
    text-transform: uppercase;
    font-family: 'Messapia';
    letter-spacing: 0px;
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
    border-bottom: 2px dotted #000;
    border-top: 2px dotted #000;

    .textStyle {
      margin-bottom: 0.8rem;
      margin-top: 0.8rem;
    }
  }
`;

const reviewsStyle = css`
  text-align: center;
  margin-bottom: 4rem;

  .starStyle {
    letter-spacing: -3px;
  }
  .name {
    text-transform: uppercase;
    line-height: 100%;
    margin-top: 0.5rem;
    font-size: 0.4rem;
    margin-top: 0.8rem;
    margin-bottom: 2rem;
  }

  .reviewText {
    line-height: 130%;
    margin-top: 0.3rem;
    font-size: 0.7rem;
    margin-bottom: 0.1rem;
  }
`;

const ratingForm = css`
  text-align: center;
  margin-top: 0.8rem;

  fieldset {
    border: 0;
    label {
      margin-bottom: 1.5rem;
    }
    input {
      margin-top: 1rem;
      background-color: transparent;
      width: 100%;
      font-size: 1rem;
      -webkit-text-size-adjust: 100%;
      font-family: var(--typeBasePrimary);
      font-weight: var(--typeBaseWeight);
      font-style: var(--typeBaseStyle);
      letter-spacing: var(--typeBaseSpacing);
      line-height: var(--typeBaseLineHeight);
      border: 2px solid #000000;
      border-radius: 20px;
      padding: 5%;
      height: 3rem;
      // when smaller than 600

      @media (max-width: 600px) {
        width: 80%;
      }
    }
  }

  .button {
    border-bottom: 2px dotted #000;
    border-top: 2px dotted #000;

    button {
      color: black;
      background: transparent;
      box-shadow: 0px 0px 0px transparent;
      border: 0px solid transparent;
      text-shadow: 0px 0px 0px transparent;
      margin-top: 0.8rem;
      margin-bottom: 0.8rem;
      align-items: center;
      text-transform: uppercase;
      font-family: 'Messapia';
      letter-spacing: 0px;
      font-style: normal;
      font-weight: 700;
      font-size: 1rem;
    }

    // when smaller than 600
    @media (max-width: 600px) {
      margin-top: 12%;
    }
  }

  .container {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .result {
    text-align: center;
  }
  .stars {
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
    gap: 3px;

    .star {
      position: relative;
      cursor: pointer;
    }
    .starDisabled {
      position: relative;
    }

    .star_radio-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 1px;
      height: 1px;
      clip: rect(1px, 1px, 1px, 1px);
    }

    .star_radio-input:checked ~ svg {
      fill: yellow;
    }

    .star_radio-input:checked:before ~ svg {
      fill: yellow;
    }

    .starDisabled_radio-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 1px;
      height: 1px;
      clip: rect(1px, 1px, 1px, 1px);
    }

    .starDisabled_radio-input:checked ~ svg {
      fill: none;
    }

    .starDisabled_radio-input:checked:before ~ svg {
      fill: none;
    }
  }
`;

// FUNCTIONALITY STARTS HERE

export default function Review(props) {
  const [errors, setErrors] = useState([]);
  const [active, setActive] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [reviewList, setReviewList] = useState(props.allReviews);
  const grades = [0, 1, 2, 3, 4];
  const activeStar = {
    fill: 'yellow',
  };
  const notActiveStar = {
    fill: 'none',
  };

  const changeRating = (index) => {
    setRating(index);
  };

  // add the review
  async function addToReviewsHandler() {
    const reviewResponse = await fetch('../api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: props.user.id,
        username: props.user.username,
        cocktailId: props.collectionCocktail.id,
        review: review,
        rating: rating,
      }),
    });
    const createdReview = await reviewResponse.json();
    const cocktailId = { cocktailId: props.collectionCocktail.id };
    const newReviewObject = { ...cocktailId, ...createdReview };
    const newState = [...reviewList, newReviewObject];

    setReviewList(newState);
    // if we have error show an error message
    if ('errors' in createdReview) {
      setErrors(createdReview.errors);
      return;
    }
  }

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
            margin-top: -170px;
          `}
        >
          <div css={wrapper}>
            <div css={text}>
              {props.user.username}, your cocktail of choice is a
            </div>
            <div css={title}>{props.collectionCocktail.name}</div>
            <div css={drinkGrid}>
              <div className="item10">
                <div css={favouritesStyle}>
                  <Image
                    src="/../../images/components/heart2.svg"
                    width="35px"
                    height="35px"
                    alt="add to favourites"
                  />
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
              <div className="item11">
                <div css={bottomLink}>
                  <Link href={`/users/${props.user.id}`}>your selection</Link>
                </div>
              </div>
            </div>
          </div>
          <div css={wrapperReview}>
            <div css={reviewStyle}>
              {props.checkUserReview ? (
                <div className="reviewAlreadyReviewedStyle">
                  <div className="reviewAlreadyReviewedStyleText">
                    {props.user.username}, you already reviewed this drink!
                  </div>
                  <div className="reviewHeadlineStyle">
                    <div className="textStyle">Reviews</div>
                  </div>
                </div>
              ) : (
                <div css={ratingForm}>
                  <fieldset>
                    <label htmlFor="review">
                      {props.user.username}, what do you think about this drink?
                    </label>
                    <input
                      id="review"
                      value={review}
                      onChange={(event) => {
                        setReview(event.currentTarget.value);
                      }}
                      required
                      disabled={active}
                    />
                  </fieldset>

                  <div className="container">
                    how would you rate it?
                    {active === false ? (
                      <div className="stars">
                        {grades.map((grade, index) => (
                          <Star
                            index={index}
                            key={grade}
                            changeRating={changeRating}
                            style={rating > index ? activeStar : {}}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="stars">
                        {grades.map((grade, index) => (
                          <DisabledStar
                            index={index}
                            key={grade}
                            changeRating={changeRating}
                            style={rating > index ? notActiveStar : {}}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div css={ratingForm}>
                    {active === false ? (
                      <div className="button">
                        {!review | !rating ? (
                          <button
                            id="disabled recommendation"
                            onClick={() => {
                              setErrors('please review and rate the cocktail');
                            }}
                          >
                            review
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              addToReviewsHandler().catch(console.log('error'));
                              setReview('');
                              setRating('');
                              setActive(true);
                            }}
                          >
                            review
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="button">
                        <button
                          id="disabled recommendation"
                          onClick={() => {
                            setErrors('please review and rate the cocktail');
                          }}
                          disabled
                        >
                          review
                        </button>
                      </div>
                    )}
                    <div css={errorStyles}>{errors}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div css={wrapperReview}>
            <div css={reviewsStyle}>
              {[...reviewList].reverse().map((seereview) => {
                return (
                  <div key={`review-${seereview.id}`}>
                    <div className="starStyle">
                      {seereview.rating === 0 ? (
                        <RatingStarOne />
                      ) : seereview.rating === 1 ? (
                        <RatingStarTwo />
                      ) : seereview.rating === 2 ? (
                        <RatingStarThree />
                      ) : seereview.rating === 3 ? (
                        <RatingStarFour />
                      ) : seereview.rating === 4 ? (
                        <RatingStarFive />
                      ) : (
                        <div />
                      )}
                    </div>
                    <div className="reviewText">{seereview.review}</div>
                    <div className="name"> {seereview.username}</div>
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
  const collectionCocktail = await getSingleCocktailFromCollection(
    context.query.cocktailId,
  );

  // get the sum of how many people have put this cocktail to their favourites list
  const numberOfFavourites = await getNumberOfFavourites(
    context.query.cocktailId,
  );

  // get the review of the cocktail
  const reviews = await getReviewByCocktailId(context.query.cocktailId);
  const allReviews = await JSON.parse(JSON.stringify(reviews));

  // check if the user has already reviewed this cocktail
  const checkUserReview = await checkReviews(user.id, context.query.cocktailId);

  return {
    props: {
      user: user,
      collectionCocktail: collectionCocktail,
      numberOfFavourites: numberOfFavourites,
      checkUserReview: checkUserReview || null,
      allReviews: allReviews,
    },
  };
}
