import {Navigate} from 'react-router-dom';

import {ConsolePage} from 'src/containers/ConsolePage';
import {LoginPage} from 'src/containers/LoginPage';

const routesConfig = (isAuthenticated: boolean) => [
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/console',
    element: isAuthenticated ? <ConsolePage /> : <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: isAuthenticated ? <Navigate to="/console" /> : <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to="/console" />,
  },
];

export {routesConfig};
