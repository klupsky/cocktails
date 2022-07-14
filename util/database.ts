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

export async function createUser(
  username: string,
  passwordHash: string,
  email: string,
) {
  const [user] = await sql<[User]>`
  INSERT INTO users
    (username, password_hash, email)
  VALUES
    (${username}, ${passwordHash}, ${email})
  RETURNING
    id,
    username,
    email
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
      cocktails.id AS cocktail_id,
      cocktails.name AS name,
      levels.level AS level,
      levels.id AS levelId,
      flavours.id AS flavourId,
      flavours.name AS flavour,
      flavours.colour AS flavourcolour,
      spirits.name AS spirit,
      spirits.id AS spiritId,
      cocktails.description AS description,
      cocktails.glass AS glass,
      cocktails.method AS method,
      cocktails.garnish AS garnish,
      categories.name AS category,
      categories.id AS categoryId

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
      levels.id = ${level} AND
      cocktails.category_id = categories.id

    ORDER BY RANDOM()

  `;
  return camelcaseKeys(joinedRecommendation);
}

export async function getRecommendationBasedOnUrlAndDatabaseBackup(
  spirit: number | string,
) {
  // console.log(flavour, spirit, level);

  const [joinedRecommendation] = await sql`
    SELECT
      cocktails.id AS cocktail_id,
      cocktails.name AS name,
      levels.level AS level,
      levels.id AS levelId,
      flavours.id AS flavourId,
      flavours.name AS flavour,
      flavours.colour AS flavourcolour,
      spirits.name AS spirit,
      spirits.id AS spiritId,
      cocktails.description AS description,
      cocktails.glass AS glass,
      cocktails.method AS method,
      cocktails.garnish AS garnish,
      categories.name AS category,
      categories.id AS categoryId

    FROM
      cocktails,
      flavours,
      levels,
      spirits,
      categories

    WHERE
      cocktails.flavour_id = flavours.id AND
      cocktails.spirit_id = ${spirit} AND
      spirits.id = ${spirit} AND
      cocktails.level_id = levels.id AND
      cocktails.category_id = categories.id

    ORDER BY RANDOM()

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
      cocktails.method AS method,
      cocktails.garnish AS garnish,
      categories.name AS category,
      categories.id AS categoryId

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
      cocktails.id,
      cocktails.name,
      cocktails.level_id,
      cocktails.description,
      cocktails.glass,
      cocktails.method,
      cocktails.garnish,
      flavours.colour AS flavourcolour,
      flavours.name AS flavourname,
      spirits.name AS spirit,
      categories.name AS category

    FROM
      cocktails,
      flavours,
      levels,
      spirits,
      categories

    WHERE
      cocktails.id = ${cocktailId} AND
      cocktails.flavour_id = flavours.id AND
      cocktails.level_id = levels.id AND
      cocktails.spirit_id = spirits.id AND
      cocktails.category_id = categories.id
      `;
  return camelcaseKeys(collectionCocktail);
}

export async function getNumberOfFavourites(cocktailId: number) {
  const collectionCocktail = await sql`
    SELECT
      *

    FROM
      cocktails,
      favourites

    WHERE
      cocktails.id = ${cocktailId} AND
      favourites.cocktail_id = ${cocktailId}


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

export async function getUserFavourites(userId: any) {
  const favouriteCocktails = await sql`
    SELECT
      favourites.id,
      favourites.user_id,
      favourites.cocktail_id,
      users.username,
      cocktails.name,
      flavours.colour AS flavourcolour

    FROM
      favourites,
      cocktails,
      users,
      flavours

    WHERE
      favourites.user_id = ${userId} AND
      users.id = favourites.user_id AND
      favourites.cocktail_id = cocktails.id AND
      cocktails.flavour_id = flavours.id


  `;
  return favouriteCocktails.map((cocktail) => camelcaseKeys(cocktail));
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

export async function getCategories() {
  const categories = await sql`

    SELECT
      categories.name

    FROM
      categories

    ORDER BY name ASC;

  `;
  return camelcaseKeys(categories);
}

export async function getLevels() {
  const levels = await sql`

    SELECT
      *

    FROM
      levels


  `;
  return camelcaseKeys(levels);
}

export async function getFlavours() {
  const flavours = await sql`

    SELECT
      *

    FROM
      flavours

    ORDER BY name ASC;

  `;
  return camelcaseKeys(flavours);
}

export async function getSpirits() {
  const spirits = await sql`

    SELECT
      *

    FROM
      spirits

    ORDER BY name ASC;

  `;
  return camelcaseKeys(spirits);
}

export async function checkFavourites(id: number, cocktailId: number) {
  const [favouritesCheck] = await sql`
    SELECT
      favourites.id

    FROM
      favourites

    WHERE
      favourites.user_Id = ${id} AND
      favourites.cocktail_Id = ${cocktailId}


  `;

  return camelcaseKeys(favouritesCheck);
}

export async function getPreviewFromCollectionOfCocktails() {
  const previewCollection = await sql`

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
      cocktails.method AS method,
      cocktails.garnish AS garnish,
      categories.name AS category,
      categories.id AS categoryId

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

    ORDER BY
      name ASC
    LIMIT 6;
  `;
  return camelcaseKeys(previewCollection);
}
