import {RootState} from 'src/store';

const selectAuthState = (state: RootState) => state.auth;
const selectAuthData = (state: RootState) => selectAuthState(state).data;
const selectAuthIsLoading = (state: RootState) => selectAuthState(state).isLoading;
const selectAuthError = (state: RootState) => selectAuthState(state).error;
const selectAuthDataLogin = (state: RootState) => selectAuthData(state)?.login;
const selectAuthDataSessionKey = (state: RootState) => selectAuthData(state)?.sessionKey;

export {selectAuthState, selectAuthData, selectAuthIsLoading, selectAuthError, selectAuthDataLogin, selectAuthDataSessionKey};
