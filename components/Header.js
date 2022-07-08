import { css } from '@emotion/react';
import Link from 'next/link';

const header = css`
  background-color: transparent;
  height: 30%;
  width: 100%;
  font-size: 10px;
`;

export default function Header(props) {
  return (
    <header css={header}>
      <input type="checkbox" id="overlay-input" />
      <label for="overlay-input" id="overlay-button">
        <span></span>
      </label>

      <div>
        <Link href="/">Home</Link>
        <Link href="/recommendation">Recommendation</Link>
        <Link href="/collection">Collection</Link>

        {/*
          This is how Next.js used to require
          links to be

          <Link href="/about">
          <a>About</a>
          </Link>
        */}
      </div>
      {/* {props.user && (
        <Link href="/users/private-profile/">{props.user.username}</Link>
      )} */}
      {props.user && (
        <Link href={`/users/${props.user.id}`}>your selection</Link>
      )}
      {props.user ? (
        <a href="/logout">Logout</a>
      ) : (
        <>
          {/* <Link href="/register">Register</Link> */}
          <Link href="/login">Login</Link>
        </>
      )}
    </header>
  );
}
