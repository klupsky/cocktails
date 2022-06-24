import cookie from 'cookie';
import Cookies from 'js-cookie';

export function getParsedCookie(key: string) {
  const cookieValue = Cookies.get(key); // Type is string | undefined

  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue); // Type is string
  } catch (err) {
    return undefined;
  }
}

export type Cookierecommendation = {
  flavour: string;
  spirit: string;
  level: number;
};

export function setStringifiedCookie(
  key: string,
  value: Cookierecommendation[],
) {
  Cookies.set(key, JSON.stringify(value));
}

export function stringifyCookieValue(value: Cookierecommendation[]) {
  return JSON.stringify(value);
}

// export function setStringifiedCookie(key: string, value: string) {
//   Cookies.set(key, JSON.stringify(value));
// }

// export function stringifyCookieValue(value: string) {
//   return JSON.stringify(value);
// }

export function deleteCookie(key: string) {
  Cookies.remove(key);
}

export function createSerializedRegisterSessionTokenCookie(token: string) {
  // check if we are in production e.g Heroku
  const isProduction = process.env.NODE_ENV === 'production';

  const maxAge = 60 * 60 * 24; // 24 hours in seconds

  return cookie.serialize('sessionToken', token, {
    // new browsers
    maxAge: maxAge, // in seconds
    // for internet explorer and old browsers
    expires: new Date(
      Date.now() /** current date in milliseconds */ +
        maxAge * 1000 /** 24  hours in milliseconds */,
    ), // in date format
    httpOnly: true,
    secure: isProduction,
    path: '/',
    // Be explicit about new default behavior
    // in browsers
    // https://web.dev/samesite-cookies-explained/
    sameSite: 'lax',
  });
}
