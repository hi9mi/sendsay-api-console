import {RootState} from 'src/store';

const selectAppIsReady = (state: RootState) => state.app.isReady;

export {selectAppIsReady};
