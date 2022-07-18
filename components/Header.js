import { css } from '@emotion/react';

const header = css`
  background: transparent;
  margin: 0;
  width: 100vw;
  font-family: 'Messapia';
  letter-spacing: 0px;
  text-transform: uppercase;
  font-size: 0.9rem;
  line-height: 10%;
  height: 4.8em;
`;

const mainNavigation = css`
  text-align: center;
  line-height: 130%;
  font-size: 2rem;
  margin-top: 15%;

  // when smaller than 1000
  @media (max-width: 1000px) {
    margin-top: 20%;
    font-size: 1.5rem;
  }

  // when smaller than 600
  @media (max-width: 600px) {
    margin-top: 35%;
    font-size: 1rem;
  }
`;

const smallNavigation = css`
  text-align: center;
  font-family: 'Apfel';
  margin-top: 11%;
  line-height: 140%;
  letter-spacing: 0.07em;

  // when smaller than 1000
  @media (max-width: 1000px) {
    margin-top: 18%;
  }

  // when smaller than 600

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-top: 50%;
  }
`;

const logo = css`
  margin-top: 70px;
  text-align: center;
  font-size: 1rem;
  line-height: 100%;

  // when smaller than 600
  @media (max-width: 600px) {
    font-size: 0.7rem;
    line-height: 100%;
  }
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
    position: fixed;
    right: 0em;
    top: 0em;
    height: 5em;
    width: 2.2em;
    background: #e75c3c;
    z-index: 5;
    cursor: pointer;
    user-select: none;
    span {
      position: fixed;
      top: 40%;
      margin: 18%;
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
    z-index: 4;
    visibility: hidden;
    position: fixed;

    &.active {
      visibility: visible;
    }

    ul {
      align-items: center;
      text-align: center;
      height: 100vh;
      padding: 0;
      list-style-type: none;

      li {
        font-family: 'Messapia';
        letter-spacing: 0px;

        text-transform: uppercase;
        font-size: 2.8rem;
        line-height: 100%;
        letter-spacing: 0em;
        margin-top: 1%;
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
          <span data-test-id="menu" />
        </label>

        <div id="overlay">
          <div css={logo}>
            <a href="/">
              <span>
                FANCY A <br />
                COCKTAIL?
              </span>
            </a>
          </div>

          <div css={mainNavigation}>
            <a href="/recommendation" data-test-id="recommendation">
              find a cocktail
            </a>
            <br />

            <a href="/collection">full collection</a>
            <br />
            {props.user && (
              <a href={`/users/${props.user.id}`}>your selection</a>
            )}
            <br />
          </div>
          {props.user ? (
            <div css={smallNavigation}>
              <a href="/logout">Logout</a>
              <br />
              <a href="/imprint">Imprint</a>
            </div>
          ) : (
            <div css={smallNavigation}>
              {/* <Link href="/register">Register</Link> */}
              <a href="/login">Login</a> | <a href="/register">Register</a>
              <br />
              <a href="/imprint" data-test-id="imprint">
                Imprint
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
