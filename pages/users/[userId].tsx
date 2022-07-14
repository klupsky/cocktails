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

const boxStyle = css`
  gap: 30px;
`;
const removeStyle = css`
  width: 100%,
  text-align: left;
`;

const title = css`
  text-align: center;
  margin-bottom: 2.5rem;
  margin-top: 2rem;
  padding: 5%;
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
  }
  // when smaller than 600px
  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
`;

const favouriteImageStyle = css`
  margin-top: 1%;
  margin-bottom: 0%;
  position: relative;
  top: 1.5rem;
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
  }[];
};

type Favourite = {
  id: number;
  name: string;
  userId: number;
  cocktailId: number;
  username: string;
};

// FUNCTIONALITY STARTS HERE

export default function UserDetail(props: Props) {
  const [favouritesLists, setFavouritesLists] = useState(
    props.favouriteCocktails,
  );
  const [favouriteUserId, setFavouriteUserId] = useState<
    Favourite['userId'] | ''
  >('');
  const [favouriteCocktailId, setFavouriteCocktailId] = useState<
    Favourite['cocktailId'] | ''
  >('');
  const [favouriteId, setFavouriteId] = useState<Favourite['id'] | ''>('');

  async function deleteFavouriteHandler(favouriteUserId: any) {
    const response = await fetch(`../api/favourites/${favouriteUserId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: favouriteUserId,
        id: favouriteId,
      }),
    });
    const deletedFavourite = await response.json();

    // copy state
    // update copy of the state
    const newState = favouritesLists.filter(
      (favourite: Favourite) => favourite.id !== deletedFavourite.id,
    );
    // use setState func

    setFavouritesLists(newState);
  }

  if (!props.user) {
    return (
      <>
        <Head>
          <title>user not found</title>
          <meta name="description" content="user not found" />
        </Head>
        <h1>404 - user not found</h1>
        better luck next time
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>{props.user.username}'s cocktail selection</title>
        <meta name="description" content="private user selection" />
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
            <div css={text}>{props.user.username}, this is your selection</div>
            <div css={smallText}>you're drunk and in love</div>

            <div css={boxStyle}>
              {favouritesLists.map((favourite: Favourite) => {
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
                            setFavouriteUserId(favourite.userId);
                            setFavouriteCocktailId(favourite.cocktailId);
                            setFavouriteId(favourite.id);
                            deleteFavouriteHandler(favourite.id).catch(() => {
                              console.log('delete favourite request fails');
                            });
                          }}
                        >
                          REMOVE
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
