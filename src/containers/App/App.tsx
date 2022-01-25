import './App.css';

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRoutes} from 'react-router-dom';

import {routesConfig} from 'src/routes/routes';

import {selectAuthDataSessionKey} from 'src/store/auth/selectors';
import {checkAuthenticate} from 'src/store/auth/slice';
import {selectAppIsReady} from 'src/store/app/selector';

const App = () => {
  const dispatch = useDispatch();

  const sessionKey = useSelector(selectAuthDataSessionKey);
  const appIsReady = useSelector(selectAppIsReady);

  const routes = useRoutes(routesConfig(Boolean(sessionKey)));

  useEffect(() => {
    dispatch(checkAuthenticate());
  }, [dispatch]);

  return <>{appIsReady ? routes : <span className="App-loader">Loading...</span>}</>;
};

export {App};
