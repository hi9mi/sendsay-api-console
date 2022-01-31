import './ConsolePage.css';

import {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';

import {Header} from 'src/components/ConsolePage/Header';
import {CleanHistoryButton} from 'src/components/ConsolePage/CleanHistoryButton';
import {ConsoleInterface} from 'src/components/ConsolePage/ConsoleInterface';
import {Button} from 'src/components/Button';
import {ConsolePageSvgSelector} from 'src/components/ConsolePage/ConsolePageSvgSelector';
import {ConsolePageButton} from 'src/components/ConsolePage/ConsolePageButton';
import {RequestHistoryList} from 'src/components/ConsolePage/RequestHistoryList';

import {Request, sendRequestAction} from 'src/store/console/slice';
import {isValidJson} from 'src/utils';
import {CONSOLE_PAGE_FORMAT_ACTION_TEXT, CONSOLE_PAGE_SEND_ACTION_TEXT} from './consolePage.constants';

const ConsolePage = () => {
  const dispatch = useDispatch();

  const [request, setRequset] = useState<string>('');
  const [isValidRequest, setValidRequest] = useState<boolean>(true);

  const changeRequestHandler = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setRequset(value);
  }, []);

  const putRequestFromHistory = useCallback((historyRequest: Request) => {
    setRequset(JSON.stringify(historyRequest, undefined, 2));
  }, []);

  const executeRequestFromHistory = useCallback(
    (historyRequest: Request) => {
      setRequset(JSON.stringify(historyRequest, undefined, 2));
      dispatch(sendRequestAction(JSON.stringify(historyRequest, undefined, 2)));
    },
    [dispatch]
  );

  const sendRequestHandler = () => {
    if (isValidJson(request)) {
      dispatch(sendRequestAction(request));
      setValidRequest(true);
    } else {
      setValidRequest(false);
    }
  };

  const formatJsonHandler = () => {
    if (isValidJson(request)) {
      setRequset((currentRequest) => JSON.stringify(JSON.parse(currentRequest), undefined, 2));
      setValidRequest(true);
    } else {
      setValidRequest(false);
    }
  };

  return (
    <div className="ConsolePage">
      <Header />
      <div className="ConsolePage-requestHistory">
        <RequestHistoryList putRequestFromHistory={putRequestFromHistory} executeRequestFromHistory={executeRequestFromHistory} />
        <CleanHistoryButton />
      </div>
      <div className="ConsolePage-ConsoleInterface">
        <ConsoleInterface isValidRequest={isValidRequest} onChangeRequest={changeRequestHandler} request={request} />
      </div>
      <div className="ConsolePage-actions">
        <Button onClick={sendRequestHandler} classes="ConsolePage-sendAction">
          {CONSOLE_PAGE_SEND_ACTION_TEXT}
        </Button>
        <ConsolePageButton onClick={formatJsonHandler}>
          <ConsolePageSvgSelector svgName="formatting" /> {CONSOLE_PAGE_FORMAT_ACTION_TEXT}
        </ConsolePageButton>
      </div>
    </div>
  );
};

export {ConsolePage};
