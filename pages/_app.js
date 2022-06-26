import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  // set the user cookie in order to pass it to the components / prop drill
  const [user, setUser] = useState();
  // set the cookies in the cart in order to pass it to the components / prop drill
  const [cookieCocktail, setCookieCocktail] = useState([]);
  // get the cookies to pass it to the components / prop drill

  useEffect(() => {
    const cookieRecommendation = Cookies.get('redommendation')
      ? JSON.parse(Cookies.get('redommendation'))
      : [];
    setCookieCocktail(cookieRecommendation);
  }, []);

  const refreshUserProfile = useCallback(async () => {
    const profileResponse = await fetch('/api/profile');

    const profileResponseBody = await profileResponse.json();

    if (!('errors' in profileResponseBody)) {
      setUser(profileResponseBody.user);
    } else {
      profileResponseBody.errors.forEach((error) => console.log(error.message));
      setUser(undefined);
    }
  }, []);

  // useEffect is only frontend
  useEffect(() => {
    refreshUserProfile().catch(() => console.log('fetch api failed'));
  }, [refreshUserProfile]);

  return (
    <Layout
      user={user}
      cookieCocktail={cookieCocktail}
      setCookieCocktail={setCookieCocktail}
    >
      {/*
          The "Component" component refers to
          the current page that is being rendered
        */}
      <Component
        {...pageProps}
        refreshUserProfile={refreshUserProfile}
        cookieCocktail={cookieCocktail}
        setCookieCocktail={setCookieCocktail}
      />
    </Layout>
  );
}
