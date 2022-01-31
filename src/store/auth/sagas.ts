import {AnyAction, PayloadAction} from '@reduxjs/toolkit';
import {call, CallEffect, put, PutEffect, takeLatest} from 'redux-saga/effects';

import {
  authenticate,
  authenticateFailure,
  authenticatePending,
  checkAuthenticate,
  fetchAuthenticate,
  logout,
  logoutAction,
} from 'src/store/auth/slice';
import {setAppReady} from 'src/store/app/slice';
import {SendsayCustom} from 'src/services/sendsay';
import {AuthValues} from 'src/types/auth';

function* checkAuthenticateSaga(): Generator<PutEffect<AnyAction> | CallEffect<void>, void, {account: string; sublogin: string}> {
  try {
    const data = yield SendsayCustom.sendsay.request({
      action: 'pong',
    });

    yield put(
      authenticate({
        sessionKey: SendsayCustom.sendsay.session,
        login: data.account,
        sublogin: data.sublogin,
      })
    );
  } catch (error) {
    console.error('error', error);
    yield call(logoutSaga);
  } finally {
    yield put(setAppReady(true));
  }
}

function* authenticateSaga({payload}: PayloadAction<AuthValues>): Generator<PutEffect<AnyAction>> {
  yield put(authenticatePending(true));
  try {
    yield SendsayCustom.sendsay.login({
      login: payload.login,
      sublogin: payload.sublogin,
      password: payload.password,
    });

    document.cookie = `sendsay_session=${SendsayCustom.sendsay.session}`;
    yield put(
      authenticate({
        sessionKey: SendsayCustom.sendsay.session,
        login: payload.login,
        sublogin: payload.sublogin,
      })
    );
  } catch (error) {
    yield put(authenticateFailure(JSON.stringify(error)));
  } finally {
    yield put(authenticatePending(false));
  }
}

export function* logoutSaga() {
  yield put(logout());
  document.cookie = '';
}

function* authSaga() {
  yield takeLatest(fetchAuthenticate.type, authenticateSaga);
  yield takeLatest(checkAuthenticate.type, checkAuthenticateSaga);
  yield takeLatest(logoutAction.type, logoutSaga);
}

export {authSaga};
