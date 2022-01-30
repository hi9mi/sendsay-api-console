import createSagaMiddleware from 'redux-saga';
import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {all} from 'redux-saga/effects';

import {authReducer} from 'src/store/auth/slice';
import {authSaga} from 'src/store/auth/sagas';
import {consoleSaga} from 'src/store/console/sagas';
import {appReducer} from 'src/store/app/slice';
import {consoleReducer} from 'src/store/console/slice';
import {setLocalStorage} from 'src/utils';

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  console: consoleReducer,
});

function* rootSaga() {
  yield all([authSaga(), consoleSaga()]);
}

const saga = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({thunk: false}), saga];

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

saga.run(rootSaga);

store.subscribe(() => {
  setLocalStorage('request_history', store.getState().console.requestHistory);
});

export {store};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
