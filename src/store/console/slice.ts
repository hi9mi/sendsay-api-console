import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getLocalStorage} from 'src/utils';

export type Request = {
  action: string;
  [key: keyof any]: unknown;
};

type RequestHistoryItem = {
  requestData: Request;
  isValid: boolean;
  date: string;
  error?: string;
};

type ConsoleSliceState = {
  response: {
    message: string;
    isValid: boolean;
  } | null;
  requestHistory: RequestHistoryItem[] | null;
};

const initialState: ConsoleSliceState = {
  response: null,
  requestHistory: getLocalStorage('request_history'),
};

export const sendRequestAction = createAction<string>('console/sendRequest');

export const consoleSlice = createSlice({
  name: 'console',
  initialState,
  reducers: {
    setResponse: (state, action: PayloadAction<{message: string; isValid: boolean} | null>) => {
      if (action.payload) {
        state.response = {
          message: action.payload.message,
          isValid: action.payload.isValid,
        };
      } else {
        state.response = null;
      }
    },
    setHistoryRequest: (state, action: PayloadAction<RequestHistoryItem>) => {
      if (state.requestHistory) {
        const isExistRequest = state.requestHistory.find((req) => req.requestData.action === action.payload.requestData.action);
        state.requestHistory = isExistRequest
          ? state.requestHistory.map((req) => (req.requestData.action === action.payload.requestData.action ? action.payload : req))
          : [...state.requestHistory, action.payload];
        state.requestHistory.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

        if (state.requestHistory.length > 15) {
          state.requestHistory.length = 15;
        }
      } else {
        state.requestHistory = [action.payload];
      }
    },
    removeHistoryRequest: (state, action: PayloadAction<string>) => {
      if (state.requestHistory) {
        state.requestHistory = state.requestHistory.filter(({requestData}) => requestData.action !== action.payload);
      }
    },
    cleanRequestHistory: (state) => {
      state.requestHistory = null;
    },
  },
});

export const consoleReducer = consoleSlice.reducer;
export const {setResponse, setHistoryRequest, removeHistoryRequest, cleanRequestHistory} = consoleSlice.actions;
