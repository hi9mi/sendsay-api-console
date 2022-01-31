import './RequestHistoryList.css';

import {memo, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';

import {RequestHistoryItem} from './components/RequestHistoryItem';

import {selectConsoleRequestHistory} from 'src/store/console/selectors';
import {Request} from 'src/store/console/slice';

type RequestHistoryListProps = {
  putRequestFromHistory: (historyRequest: Request) => void;
  executeRequestFromHistory: (historyRequest: Request) => void;
};

const RequestHistoryList = memo(({putRequestFromHistory, executeRequestFromHistory}: RequestHistoryListProps) => {
  const requestHistory = useSelector(selectConsoleRequestHistory);

  const historyListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const historylistRefCurrent = historyListRef.current;

    const wheelListener = (event: WheelEvent) => {
      event.preventDefault();
      if (historylistRefCurrent) {
        historylistRefCurrent.scrollLeft += event.deltaY;
      }
    };

    historylistRefCurrent?.addEventListener('wheel', wheelListener);

    return () => {
      historylistRefCurrent?.removeEventListener('wheel', wheelListener);
    };
  }, []);

  return (
    <ul ref={historyListRef} className="RequestHistoryList">
      {requestHistory?.map(({requestData, isValid, error}, index) => (
        <RequestHistoryItem
          requestData={requestData}
          isValid={isValid}
          putRequestFromHistory={putRequestFromHistory}
          executeRequestFromHistory={executeRequestFromHistory}
          error={error}
          key={index}
        />
      ))}
    </ul>
  );
});

export {RequestHistoryList};
