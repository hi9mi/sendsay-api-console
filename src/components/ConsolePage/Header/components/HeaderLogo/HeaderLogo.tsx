import './HeaderLogo.css';

import {memo} from 'react';

import {HEADER_LOGO_TITLE} from './headerLogo.constants';
import logoIcon from 'src/assets/logo.svg';

const HeaderLogo = memo(() => {
  return (
    <div className="HeaderLogo">
      <img src={logoIcon} alt="API-консолька" className="HeaderLogo-icon" />
      <h1 className="HeaderLogo-title">{HEADER_LOGO_TITLE}</h1>
    </div>
  );
});

export {HeaderLogo};
