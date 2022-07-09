import { css } from '@emotion/react';
import Link from 'next/link';

const header = css`
  background: transparent;
  margin: 0;

  width: 100vw;
  height: 4.8em;
  animation: bugfix infinite 1s;
  -webkit-animation: bugfix infinite 1s;
`;

const navigation = css`
  @keyframes bugfix {
    from {
      padding: 0;
    }
    to {
      padding: 0;
    }
  }
  @-webkit-keyframes bugfix {
    from {
      padding: 0;
    }
    to {
      padding: 0;
    }
  }

  #overlay-button {
    position: absolute;
    right: 0em;
    top: 0em;
    height: 4.8em;
    width: 1.8em;
    background: #e75c3c;
    z-index: 5;
    cursor: pointer;
    user-select: none;
    span {
      position: absolute;
      top: 1.8rem;
      margin: 24%;
      height: 2px;
      width: 30px;
      background-color: black;
      position: relative;
      display: block;
      transition: all 0.2s ease-in-out;
      &:before {
        top: -8px;
        visibility: visible;
      }
      &:after {
        top: 8px;
      }
      &:before,
      &:after {
        height: 2px;
        width: 30px;
        background-color: black;
        position: absolute;
        content: '';
        transition: all 0.2s ease-in-out;
      }
    }
  }

  input[type='checkbox'] {
    display: none;

    &:checked ~ #overlay {
      visibility: visible;
    }

    &:checked ~ #overlay-button {
      &:hover span,
      span {
        background: transparent;
      }
      span {
        &:before {
          transform: rotate(45deg) translate(5px, 5px);
        }
        &:after {
          transform: rotate(-45deg) translate(6px, -6px);
        }
      }
    }
  }

  #overlay {
    height: 100vh;
    width: 100vw;
    background: #e75c3c;
    z-index: 2;
    visibility: hidden;
    position: fixed;
    &.active {
      visibility: visible;
    }
    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      height: 100vh;
      padding-left: 0;
      list-style-type: none;
      li {
        padding: 1em;
        a {
          color: white;
          text-decoration: none;
          font-size: 1.5em;
          &:hover {
            color: #e75c3c;
          }
        }
      }
    }
  }
`;

export default function Header(props) {
  return (
    <header css={header}>
      <div css={navigation}>
        <input type="checkbox" id="overlay-input" />
        <label htmlFor="overlay-input" id="overlay-button">
          <span />
        </label>

        <div id="overlay">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/recommendation">find a cocktail</Link>
            </li>
            <li>
              <Link href="/recommendation">Your selection</Link>
            </li>
            <li>
              <Link href="/collection">full collection</Link>{' '}
            </li>

            {props.user && (
              <li>
                <Link href={`/users/${props.user.id}`}>your selection</Link>
              </li>
            )}
            {props.user ? (
              <a href="/logout">Logout</a>
            ) : (
              <>
                {/* <Link href="/register">Register</Link> */}
                <li>
                  {' '}
                  <Link href="/login">Login</Link> or{' '}
                  <Link href="/register">Register</Link>
                </li>
                <li>
                  <Link href="/imprint">Imprint</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
