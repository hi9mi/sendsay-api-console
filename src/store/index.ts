import createSagaMiddleware from 'redux-saga';
import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import {authReducer} from 'src/store/auth/slice';
import {all} from 'redux-saga/effects';
import {authSaga} from './auth/sagas';

const rootReducer = combineReducers({
  auth: authReducer,
});

function* rootSaga() {
  yield all([authSaga()]);
}

const saga = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({thunk: false}), saga];

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

saga.run(rootSaga);

export {store};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
