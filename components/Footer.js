import { css } from '@emotion/react';
import Marquee from 'react-fast-marquee';

const footerStyles = css`
  margin: 0;
  padding: 0;
`;
const cheers = css`
  padding: 8px;
  background-color: white;
  margin-top: 0;
  font-family: 'Messapia';
  text-transform: uppercase;
  font-size: 4.5rem;
  line-height: 100%;
  letter-spacing: 0em;
  /* -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: black; */
`;
const cocktailHour = css`
  padding: 3px;
  text-transform: uppercase;
  font-size: 1.2rem;
  line-height: 100%;
  color: white;
  background-color: #e75c3c;
  letter-spacing: 0.07em;
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <Marquee speed={250} gradient={false}>
        <span css={cheers}>! CHEERS! PROST! SALUTE! CIN CIN </span>
      </Marquee>
      <Marquee speed={150} gradient={false}>
        <span css={cocktailHour}>
          ! HAPPY HOUR! AFTER HOUR! EVERY HOUR! COCKTAIL HOUR! HAPPY HOUR! AFTER
          HOUR! EVERY HOUR! COCKTAIL HOUR
        </span>
      </Marquee>
    </footer>
  );
}
