import './Header.css';

import {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ToggleScreenModeButton} from './components/ToggleScreenModeButton';

import {selectAuthDataSublogin} from 'src/store/auth/selectors';
import {logoutAction} from 'src/store/auth/slice';
import {HEADER_LOGO_TITLE, LOGOUT_BUTTON_TEXT} from './header.constants';
import logoIcon from 'src/assets/logo.svg';
import colonIcon from './assets/colon-icon.svg';
import logoutIcon from './assets/log-out.svg';

const Header = memo(() => {
  const dispatch = useDispatch();
  const sublogin = useSelector(selectAuthDataSublogin);

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="Header">
      <div className="HeaderLogo">
        <img src={logoIcon} alt="API-консолька" className="HeaderLogo-icon" />
        <h1 className="HeaderLogo-title">{HEADER_LOGO_TITLE}</h1>
      </div>
      <div className="Header-settings">
        {Boolean(sublogin) && (
          <span className="HeaderSublogin">
            {sublogin} <img src={colonIcon} alt="" /> sublogin
          </span>
        )}
        <button className="LogoutButton" onClick={logoutHandler}>
          {LOGOUT_BUTTON_TEXT} <img src={logoutIcon} alt="Выйти из аккаунта" />
        </button>
        <ToggleScreenModeButton />
      </div>
    </div>
  );
});

export {Header};
