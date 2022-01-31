import {AnyAction, PayloadAction} from '@reduxjs/toolkit';
import {put, PutEffect, takeLatest} from 'redux-saga/effects';

import {SendsayCustom} from 'src/services/sendsay';
import {sendRequestAction, setHistoryRequest, setResponse} from 'src/store/console/slice';

function* sendRequestSaga({payload}: PayloadAction<string>): Generator<PutEffect<AnyAction>> {
  try {
    const data = yield SendsayCustom.sendsay.request(JSON.parse(payload));
    yield put(setResponse({message: JSON.stringify(data, undefined, 2), isValid: true}));
    yield put(setHistoryRequest({requestData: JSON.parse(payload), isValid: true, date: new Date(Date.now()).toISOString()}));
  } catch (error) {
    console.error('error', error);
    yield put(setResponse({message: JSON.stringify(error, undefined, 2), isValid: false}));
    yield put(
      setHistoryRequest({
        requestData: JSON.parse(payload),
        isValid: false,
        date: new Date(Date.now()).toISOString(),
        error: JSON.stringify(error, undefined, 2),
      })
    );
  }
}

function* consoleSaga() {
  yield takeLatest(sendRequestAction.type, sendRequestSaga);
}

export {consoleSaga};
