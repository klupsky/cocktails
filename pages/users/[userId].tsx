import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import {
  getUserById,
  getUserByValidSessionToken,
  getUserFavourites,
  User,
} from '../../util/database';

type Props = {
  user?: User;
};

export default function UserDetail(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>404 - User not found</h1>
        Better luck next time
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>{props.user.username}</title>
        <meta name="description" content="About the app" />
      </Head>

      <main>
        <h1>
          User #{props.user.id} (username: {props.user.username})
        </h1>
        <div>id: {props.user.id}</div>
        <div>username: {props.user.username}</div>
        heyhey
        <br />
        {/* your favourite cocktail is #{props.favouriteCocktails.name} called{' '}
        {props.favouriteCocktails.id} {props.favouriteCocktails.username} */}
        {/* hier noch einbauen dass wenn die context id nicht die user id ist, das nicht geht! und auch dass man hier nur herkommt wenn man eingeloggt ist  */}
        {props.favouriteCocktails.map((favourite) => {
          return (
            <li key={`cocktailName-${favourite.id}`}>
              {favourite.name} {favourite.id} {favourite.userId}
            </li>
          );
        })}
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
    },
  };
}
