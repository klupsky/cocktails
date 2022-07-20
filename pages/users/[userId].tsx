import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  getUserById,
  getUserByValidSessionToken,
  getUserFavourites,
  User,
} from '../../util/database';
import { logo, text } from '../login';

// CSS

const section = css`
  min-height: 65vh;
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
  line-height: 130%;
  a {
    text-decoration-line: underline;
    text-underline-position: under;
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

const boxStyle = css`
  gap: 1.6rem;
  display: grid;
  grid-template-columns: 50% 50%;
  // when smaller than 700px
  @media (max-width: 700px) {
    grid-template-columns: 100%;
  }
`;
const removeStyle = css`
  width: 100%;
  text-align: left;

  button {
    margin-top: 0.6rem;
    color: black;
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
    display: flex;
  }

  .removeImageStyle {
    margin-top: 0.7rem;
  }

  .removeTitleStyle {
    font-size: 0.5rem;
    margin-top: 1.1rem;

    line-height: 100%;
    margin-left: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }
`;

const title = css`
  text-align: center;
  margin-bottom: 0.5rem;
  margin-top: 1.7rem;
  padding-bottom: 5%;
  padding-top: 5%;
  height: 4rem;
  text-transform: uppercase;
  font-family: 'Messapia';
  letter-spacing: 0px;
  line-height: 100%;
  font-style: normal;
  font-weight: 700;
  font-size: 1.2rem;
  border-top: 2px dotted #000;

  // when smaller than 1000px
  @media (max-width: 1000px) {
    font-size: 0.9rem;
    height: 3.3rem;
  }
`;

const favouriteImageStyle = css`
  margin-top: 1%;
  margin-bottom: 0%;
  position: relative;
  top: 0.7rem;
`;

// TYPES

type Props = {
  user: User;
  favouriteCocktails: {
    id: number;
    userId: number;
    cocktailId: number;
    username: string;
    name: string;
    flavourcolour: string;
  }[];
};

// type Favourite = {
//   id: number;
//   name: string;
//   userId: number;
//   cocktailId: number;
//   username: string;
//   flavourcolour: string;
// };

// FUNCTIONALITY STARTS HERE

export default function UserDetail(props: Props) {
  // const [favouriteId, setFavouriteId] = useState<Favourite['id'] | ''>('');

  const [favouritesLists, setFavouritesLists] = useState(
    props.favouriteCocktails,
  );
  // const [favouriteUserId, setFavouriteUserId] = useState<
  //   Favourite['userId'] | ''
  // >('');
  // console.log(favouriteUserId);
  // const [favouriteCocktailId, setFavouriteCocktailId] = useState<
  //   Favourite['cocktailId'] | ''
  // >('');

  async function deleteFavouriteHandler(
    cocktailId: number,
    favouriteUserId: number,
  ) {
    const response = await fetch(`../api/favourites/${favouriteUserId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: cocktailId,
      }),
    });
    const deletedFavourite = await response.json();

    // copy state
    // update copy of the state
    const newState = favouritesLists.filter(
      (favourite) => favourite.id !== deletedFavourite.id,
    );
    // use setState func

    setFavouritesLists(newState);
  }

  // if (!props.user) {
  //   return (
  //     <>
  //       <Head>
  //         <title>user not found</title>
  //         <meta name="description" content="user not found" />
  //       </Head>
  //       <h1>404 - user not found</h1>
  //       better luck next time
  //     </>
  //   );
  // }

  return (
    <div>
      <Head>
        <title>{`${props.user.username}'s cocktail selection`}</title>
        <meta name="description" content="private user selection" />
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
              cheers, it's nice to see you back here {props.user.username}!
            </div>
            <div css={smallText}>
              this is the place for your selection of cocktails
            </div>

            <div css={boxStyle}>
              {favouritesLists.map((favourite) => {
                return (
                  <div key={`cocktailName-${favourite.id}`}>
                    <div
                      css={css`
                        background-color: ${favourite.flavourcolour};
                        padding-left: 7%;
                        padding-right: 7%;
                        border-radius: 20px;
                      `}
                    >
                      <div css={removeStyle}>
                        <button
                          onClick={() => {
                            // setFavouriteUserId(favourite.userId);
                            // setFavouriteCocktailId(favourite.cocktailId);
                            // setFavouriteId(favourite.id);
                            deleteFavouriteHandler(
                              favourite.id,
                              favourite.userId,
                            ).catch(() => {
                              console.log('delete favourite request fails');
                            });
                          }}
                        >
                          <div className="removeImageStyle">
                            <Image
                              src="/../../images/components/heart2.svg"
                              width="25px"
                              height="25px"
                              alt="remove favourites"
                            />
                          </div>
                          <div className="removeTitleStyle">remove</div>
                        </button>
                      </div>

                      <div css={favouriteImageStyle}>
                        <Image
                          src={`/../../images/cocktail/${favourite.cocktailId}.svg`}
                          alt="{props.urlInfoQueryBackup.glass}"
                          width="200px"
                          height="200px"
                        />
                      </div>
                      <div css={title}>
                        <Link href={`/../collection/${favourite.cocktailId}`}>
                          {favourite.name}
                        </Link>
                      </div>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // if you want to use username in the URL name this variable properly
  const userIdFromUrl = context.query.userId;

  // make sure the query param is an string
  if (!userIdFromUrl || Array.isArray(userIdFromUrl)) {
    return { props: {} };
  }
  // if you want to use username in the URL call function getUserByUsername and don't use parse int
  const user = await getUserById(parseInt(userIdFromUrl));

  const userSession = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );
  const favouriteCocktails = await getUserFavourites(context.query.userId);
  // console.log(favouriteCocktails);
  if (!user) {
    context.res.statusCode = 404;
    return { props: {} };
  } else if (!userSession) {
    return {
      redirect: {
        destination: `/login?returnTo=/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: user,
      favouriteCocktails: favouriteCocktails,
      userSession,
    },
  };
}
