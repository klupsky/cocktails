import { css } from '@emotion/react';
import Marquee from 'react-fast-marquee';

const footerStyles = css``;
const cheers = css`
  margin-top: 2.2rem;
  margin-bottom: 2rem;
  font-style: normal;
  font-weight: 800;
  color: transparent;
  font-size: 4.6rem;
  -webkit-text-stroke: 2px black;
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <Marquee speed={250} gradient={false}>
        <span css={cheers}>! CHEERS! PROST! SALUTE! CIN CIN </span>
      </Marquee>
    </footer>
  );
}
