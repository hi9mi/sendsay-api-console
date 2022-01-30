import './CleanHistoryButton.css';

import {useDispatch} from 'react-redux';

import {cleanRequestHistory} from 'src/store/console/slice';
import crossIcon from './assets/cross.svg';

const CleanHistoryButton = () => {
  const dispatch = useDispatch();

  const cleanRequestHistoryHandler = () => {
    dispatch(cleanRequestHistory());
  };

  return (
    <button onClick={cleanRequestHistoryHandler} className="CleanHistoryButton">
      <img src={crossIcon} alt="Очистить историю запросов" />
    </button>
  );
};

export {CleanHistoryButton};
