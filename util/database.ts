import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

// import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

// setPostgresDefaultsOnHeroku();

config();

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

export type User = {
  id: number;
  username: string;
};

type UserWithPasswordHash = User & {
  passwordHash: string;
};

export async function createUser(username: string, passwordHash: string) {
  const [user] = await sql<[User]>`
  INSERT INTO users
    (username, password_hash)
  VALUES
    (${username}, ${passwordHash})
  RETURNING
    id,
    username
  `;

  return camelcaseKeys(user);
}

export async function getUserByUsername(username: string) {
  if (!username) return undefined;

  const [user] = await sql<[User | undefined]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user && camelcaseKeys(user);
}

export async function getUserById(userId: number) {
  if (!userId) return undefined;

  const [user] = await sql<[User | undefined]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      id = ${userId}
  `;
  return user && camelcaseKeys(user);
}

export async function getUserWithPasswordHashByUsername(username: string) {
  if (!username) return undefined;

  const [user] = await sql<[UserWithPasswordHash | undefined]>`
    SELECT
     *
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user && camelcaseKeys(user);
}

type Session = {
  id: number;
  token: string;
};

export async function createSession(token: string, userId: User['id']) {
  const [session] = await sql<[Session]>`
  INSERT INTO sessions
    (token, user_id)
  VALUES
    (${token}, ${userId})
  RETURNING
    id,
    token
  `;

  await deleteExpiredSessions();

  return camelcaseKeys(session);
}

export async function getUserByValidSessionToken(token: string) {
  if (!token) return undefined;

  const [user] = await sql<[User | undefined]>`
  SELECT
    users.id,
    users.username
  FROM
    users,
    sessions
  WHERE
    sessions.token = ${token} AND
    sessions.user_id = users.id AND
    sessions.expiry_timestamp > now();
  `;

  await deleteExpiredSessions();

  return user && camelcaseKeys(user);
}

export async function deleteSessionByToken(token: string) {
  const [session] = await sql<[Session | undefined]>`
  DELETE FROM
    sessions
  WHERE
    sessions.token = ${token}
  RETURNING *
  `;

  return session && camelcaseKeys(session);
}

export async function deleteExpiredSessions() {
  const sessions = await sql<[Session[]]>`
  DELETE FROM
    sessions
  WHERE
    expiry_timestamp < now()
  RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session));
}

export async function getRecommendationBasedOnUrlAndDatabase(
  flavour: number | string,
  spirit: number | string,
  level: number | string,
) {
  // console.log(flavour, spirit, level);

  const [joinedRecommendation] = await sql`
    SELECT
      cocktails.id AS id,
      cocktails.name AS name,
      levels.level AS level,
      levels.id AS levelId,
      flavours.id AS flavourId,
      flavours.name AS flavour,
      spirits.name AS spirit,
      spirits.id AS spiritId,
      cocktails.description AS description,
      cocktails.glass AS glass,
      cocktails.ice AS ice,
      cocktails.garnish AS garnish,
      categories.name AS category,
      categories.id AS categoryId,
      cocktails.size AS size

    FROM
      cocktails,
      flavours,
      levels,
      spirits,
      categories

    WHERE
      cocktails.flavour_id = ${flavour} AND
      flavours.id = ${flavour} AND
      cocktails.spirit_id = ${spirit} AND
      spirits.id = ${spirit} AND
      cocktails.level_id = ${level} AND
      levels.id = ${level}

    LIMIT 1

  `;
  return camelcaseKeys(joinedRecommendation);
}

export async function getFullCollectionOfCocktails() {
  const collection = await sql`

    SELECT
      cocktails.id AS id,
      cocktails.name AS name,
      levels.level AS level,
      levels.id AS levelId,
      flavours.id AS flavourId,
      flavours.name AS flavour,
      spirits.name AS spirit,
      spirits.id AS spiritId,
      cocktails.description AS description,
      cocktails.glass AS glass,
      cocktails.ice AS ice,
      cocktails.garnish AS garnish,
      categories.name AS category,
      categories.id AS categoryId,
      cocktails.size AS size

    FROM
      cocktails,
      flavours,
      levels,
      spirits,
      categories

     WHERE
      cocktails.spirit_id = spirits.id AND
      cocktails.flavour_id = flavours.id AND
      cocktails.level_id = levels.id AND
      cocktails.category_id = categories.id


      ORDER BY name ASC;

  `;
  return camelcaseKeys(collection);
}

export async function getSingleCocktailFromCollection(cocktailId: number) {
  const [collectionCocktail] = await sql`
    SELECT
      *
    FROM
      cocktails
    WHERE
      cocktails.id = ${cocktailId}
  `;
  return camelcaseKeys(collectionCocktail);
}

export async function getAllFavourites() {
  const favouriteCocktailList = await sql`
    SELECT
      favourites.id,
      favourites.user_id,
      favourites.cocktail_id,
      users.username,
      cocktails.name

    FROM
      favourites,
      cocktails,
      users

    WHERE
      users.id = favourites.user_id AND
      favourites.cocktail_id = cocktails.id

  `;
  return camelcaseKeys(favouriteCocktailList);
}

export async function getUserFavourites(userId: number) {
  const favouriteCocktails = await sql`
    SELECT
      favourites.id,
      favourites.user_id,
      favourites.cocktail_id,
      users.username,
      cocktails.name

    FROM
      favourites,
      cocktails,
      users

    WHERE
      favourites.user_id = ${userId} AND
      users.id = favourites.user_id AND
      favourites.cocktail_id = cocktails.id

  `;
  return camelcaseKeys(favouriteCocktails);
}

export async function addUserFavourite(userId: number, cocktailId: number) {
  const [addFavouriteCocktail] = await sql`
    INSERT INTO
    favourites
      (user_id, cocktail_id)

    VALUES
      (${userId}, ${cocktailId})

    RETURNING
      *
  `;
  return camelcaseKeys(addFavouriteCocktail);
}

export async function deleteUserFavourite(userId: number, id: number) {
  const [deletedFavouriteCocktail] = await sql`
    DELETE FROM
      favourites

    WHERE
      favourites.id = ${userId} AND
      favourites.user_id = ${id}

    RETURNING
    *
  `;
  return camelcaseKeys(deletedFavouriteCocktail);
}
