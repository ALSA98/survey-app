import ShabnamThinFDWoff2 from './Shabnam-Thin-FD.woff2'
import ShabnamLightFDWoff2 from './Shabnam-Light-FD.woff2'
import ShabnamFDWoff2 from './Shabnam-FD.woff2'
import ShabnamMediumFDWoff2 from './Shabnam-Medium-FD.woff2'
import ShabnamBoldFDWoff2 from './Shabnam-Bold-FD.woff2'

export const font = `
@font-face {
  font-family: 'shabnam-fd';
  font-style: normal;
  font-weight: 100;
  src: url(${ShabnamThinFDWoff2}) format('woff2');
}

@font-face {
  font-family: 'shabnam-fd';
  font-style: normal;
  font-weight: 300;
  src: url(${ShabnamLightFDWoff2}) format('woff2');
}

@font-face {
  font-family: 'shabnam-fd';
  font-style: normal;
  font-weight: 500;
  src: url(${ShabnamFDWoff2}) format('woff2');
}

@font-face {
  font-family: 'shabnam-fd';
  font-style: normal;
  font-weight: 700;
  src: url(${ShabnamMediumFDWoff2}) format('woff2');
}

@font-face {
  font-family: 'shabnam-fd';
  font-style: normal;
  font-weight: 900;
  src: url(${ShabnamBoldFDWoff2}) format('woff2');
}
`
