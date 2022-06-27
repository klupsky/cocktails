import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  // set the user cookie in order to pass it to the components / prop drill
  const [user, setUser] = useState();

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
    <Layout user={user}>
      {/*
          The "Component" component refers to
          the current page that is being rendered
        */}
      <Component {...pageProps} refreshUserProfile={refreshUserProfile} />
    </Layout>
  );
}
