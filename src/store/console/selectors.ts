import {RootState} from 'src/store';

const selectConsoleResponse = (state: RootState) => state.console.response;
const selectConsoleRequestHistory = (state: RootState) => state.console.requestHistory;

export {selectConsoleResponse, selectConsoleRequestHistory};
