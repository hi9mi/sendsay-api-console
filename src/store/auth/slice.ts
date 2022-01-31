import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AuthValues} from 'src/types/auth';

type AuthSliceStateData = {sessionKey: string; login: string; sublogin: string};

type AuthSliceState = {
  data: AuthSliceStateData | null;
  isLoading: boolean;
  error?: string;
};

const initialState: AuthSliceState = {
  data: null,
  isLoading: false,
};

export const fetchAuthenticate = createAction<AuthValues>('auth/start');
export const checkAuthenticate = createAction<void>('auth/check');
export const logoutAction = createAction<void>('auth/logoutAction');

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticatePending: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    authenticate: (state, action: PayloadAction<AuthSliceStateData>) => {
      state.data = action.payload;
      state.error = undefined;
    },
    authenticateFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.data = null;
    },
    logout: (state) => {
      state.data = null;
      state.error = undefined;
    },
  },
});

export const authReducer = authSlice.reducer;
export const {authenticate, authenticatePending, authenticateFailure, logout} = authSlice.actions;
