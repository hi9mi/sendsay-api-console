import './HeaderSublogin.css';

import {memo} from 'react';
import {useSelector} from 'react-redux';

import {selectAuthDataSublogin} from 'src/store/auth/selectors';
import colonIcon from './assets/colon-icon.svg';

const HeaderSublogin = memo(() => {
  const sublogin = useSelector(selectAuthDataSublogin);

  return (
    <>
      {Boolean(sublogin) && (
        <span className="HeaderSublogin">
          {sublogin} <img src={colonIcon} alt="" /> sublogin
        </span>
      )}
    </>
  );
});

export {HeaderSublogin};
