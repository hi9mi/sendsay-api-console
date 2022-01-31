import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AppSliceState = {
  isReady: boolean;
};

const initialState: AppSliceState = {
  isReady: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppReady: (state, action: PayloadAction<boolean>) => {
      state.isReady = action.payload;
    },
  },
});

export const appReducer = appSlice.reducer;
export const {setAppReady} = appSlice.actions;
