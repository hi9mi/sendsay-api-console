import './LoginPage.css';

import {useSelector} from 'react-redux';

import {LoginForm} from 'src/components/LoginPage/LoginForm/LoginForm';
import {ErrorMessage} from 'src/components/LoginPage/ErrorMessage';

import {selectAuthError} from 'src/store/auth/selectors';
import {LOGIN_PAGE_FORM_TITLE} from './loginPage.constants';
import logoIcon from 'src/assets/logo.svg';

const LoginPage = () => {
  const authError = useSelector(selectAuthError);

  return (
    <div className="LoginPage">
      <div className="LoginPage-container">
        <div className="LoginPage-logoWrapper">
          <img src={logoIcon} alt="API-консолька" className="LoginPage-logoIcon" />
        </div>
        <div className="LoginPage-formWrapper">
          <h1 className="LoginPage-formTitle">{LOGIN_PAGE_FORM_TITLE}</h1>
          {authError && <ErrorMessage errorText={authError} />}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export {LoginPage};
