import './ErrorMessage.css';

import {ERROR_MESSAGE_HEAD_TEXT} from './errorMessage.constants';
import mehIcon from './assets/meh.svg';

type ErrorMessageProps = {
  errorText: string;
};

const ErrorMessage = ({errorText}: ErrorMessageProps) => {
  return (
    <div className="ErrorMessage">
      <div className="ErrorMessage-head">
        <img src={mehIcon} alt="ме" className="ErrorMessage-head-icon" />
        <h2 className="ErrorMessage-head-text">{ERROR_MESSAGE_HEAD_TEXT}</h2>
      </div>
      <div className="ErrorMessage-body">
        <span className="ErrorMessage-body-text">{errorText}</span>
      </div>
    </div>
  );
};

export {ErrorMessage};
