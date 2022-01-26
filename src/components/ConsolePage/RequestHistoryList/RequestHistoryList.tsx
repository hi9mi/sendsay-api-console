import {useEffect, useRef} from 'react';
import {mockHistory} from 'src/containers/ConsolePage/mockData';
import {RequestHistoryItem} from './components/RequestHistoryItem';
import './RequestHistoryList.css';

const RequestHistoryList = () => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const listRefCurrent = listRef.current;

    const scrollListener = (event: WheelEvent) => {
      event.preventDefault();
      if (listRefCurrent) {
        listRefCurrent.scrollLeft += event.deltaY;
      }
    };

    listRefCurrent?.addEventListener('wheel', scrollListener);

    return () => {
      listRefCurrent?.removeEventListener('wheel', scrollListener);
    };
  }, []);

  return (
    <ul ref={listRef} className="RequestHistoryList">
      {mockHistory.map((historyItem, index) => (
        <RequestHistoryItem {...historyItem} key={index} />
      ))}
    </ul>
  );
};

export {RequestHistoryList};
