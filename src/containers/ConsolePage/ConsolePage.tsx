import './ConsolePage.css';

import {Header} from 'src/components/ConsolePage/Header';
import {RequestHistoryList} from 'src/components/ConsolePage/RequestHistoryList';
import {CleanHistoryButton} from 'src/components/ConsolePage/CleanHistoryButton';

const ConsolePage = () => {
  return (
    <div className="ConsolePage">
      <Header />
      <div className="ConsolePage-requestHistory">
        <RequestHistoryList />
        <CleanHistoryButton />
      </div>
    </div>
  );
};

export {ConsolePage};
