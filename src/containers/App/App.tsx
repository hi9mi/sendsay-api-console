import {useDispatch, useSelector} from 'react-redux';
import {Navigate, useRoutes} from 'react-router-dom';

import {LoginPage} from 'src/containers/LoginPage';
import {ConsolePage} from 'src/containers/ConsolePage';

import {selectAuthData} from 'src/store/auth/selectors';
import {useEffect} from 'react';
import {checkAuthenticate} from 'src/store/auth/slice';

const App = () => {
  const dispatch = useDispatch();
  const authData = useSelector(selectAuthData);
  const routes = useRoutes([
    {
      path: '/',
      children: [
        {
          path: '/console',
          element: authData?.sessionKey ? <ConsolePage /> : <Navigate to="/login" />,
        },
        {
          path: '/login',
          element: authData?.sessionKey ? <Navigate to="/console" /> : <LoginPage />,
        },
      ],
    },
  ]);

  useEffect(() => {
    dispatch(checkAuthenticate());
  }, [dispatch]);

  return <>{routes}</>;
};

export {App};
