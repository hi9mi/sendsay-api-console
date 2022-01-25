import './LogoutButton.css';

import clsx from 'clsx';
import {memo} from 'react';
import {useDispatch} from 'react-redux';

import {logoutAction} from 'src/store/auth/slice';
import {LOGOUT_BUTTON_TEXT} from './logoutButton.constants';
import logoutIcon from './assets/log-out.svg';

type LogoutButtonProps = {classes?: string; children?: never} & JSX.IntrinsicElements['button'];

const LogoutButton = memo(({classes, ...rest}: LogoutButtonProps) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <button {...rest} className={clsx('LogoutButton', classes)} onClick={logoutHandler}>
      {LOGOUT_BUTTON_TEXT} <img src={logoutIcon} alt="Выйти из аккаунта" />
    </button>
  );
});

export {LogoutButton};
