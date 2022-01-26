import './CleanHistoryButton.css';

import crossIcon from './assets/cross.svg';

const CleanHistoryButton = () => {
  return (
    <button className="CleanHistoryButton">
      <img src={crossIcon} alt="Очистить историю запросов" />
    </button>
  );
};

export {CleanHistoryButton};
