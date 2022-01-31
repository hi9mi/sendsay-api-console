import './RequestHistoryItem.css';

import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import clsx from 'clsx';

import {Portal} from 'src/components/Portal';
import {ConsolePageSvgSelector} from 'src/components/ConsolePage/ConsolePageSvgSelector';
import {Dropdown} from '../Dropdown/Dropdown';

import {removeHistoryRequest, Request, setResponse} from 'src/store/console/slice';
import {useOnClickOutside} from 'src/hooks';

type RequestHistoryItemProps = {
  requestData: Request;
  isValid: boolean;
  putRequestFromHistory: (historyRequest: Request) => void;
  executeRequestFromHistory: (historyRequest: Request) => void;
  error?: string;
};

const RequestHistoryItem = ({requestData, isValid, putRequestFromHistory, executeRequestFromHistory, error}: RequestHistoryItemProps) => {
  const dispatch = useDispatch();

  const [isVisibleDropdown, setVisibleDropdown] = useState<boolean>(false);
  const [offsetTop, setOffsetTop] = useState<number>(0);
  const [offsetLeft, setOffsetLeft] = useState<number>(0);
  const [isAnimateCopyAlert, setAnimateCopyAlert] = useState<boolean>(false);
  const timer = useRef<number>();

  const closeDropdownHandler = () => {
    setVisibleDropdown(false);
  };

  const wrapperRef = useOnClickOutside<HTMLLIElement>(closeDropdownHandler);

  const toggleDropdownVisible = (event: React.MouseEvent<HTMLSpanElement, MouseEvent> | undefined = undefined) => {
    event?.stopPropagation();
    setVisibleDropdown((currentIsVisibleDropdown) => !currentIsVisibleDropdown);
  };

  const onKeyDownToggleDropdownVisible = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.code === 'Space') {
      toggleDropdownVisible();
    }
  };

  const putRequestFromHistoryHandler = () => {
    putRequestFromHistory(requestData);
    if (!error) {
      dispatch(setResponse(null));
    }
    if (error) {
      dispatch(setResponse({message: error, isValid: false}));
    }
  };

  const copyRequestHandler = () => {
    closeDropdownHandler();
    navigator.clipboard.writeText(JSON.stringify(requestData, undefined, 2));
    setAnimateCopyAlert(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setAnimateCopyAlert(false);
    }, 1000);
  };

  useEffect(() => {
    const wheelListener = () => {
      if (wrapperRef.current) {
        const wrapperRect = wrapperRef.current.getBoundingClientRect();
        const top = wrapperRect.top + wrapperRect.height;
        setOffsetTop(top);
        setOffsetLeft(wrapperRect.left);
      }
    };
    wheelListener();

    window.addEventListener('wheel', wheelListener);
    return () => window.removeEventListener('wheel', wheelListener);
  }, [wrapperRef]);

  const dropdownList = [
    {
      text: 'Выполнить',
      className: 'Dropdown-item--primary',
      handler: () => {
        executeRequestFromHistory(requestData);
        closeDropdownHandler();
      },
    },
    {
      text: 'Скопировать',
      className: 'Dropdown-item--primary',
      handler: copyRequestHandler,
    },
    {
      text: 'Удалить',
      className: 'Dropdown-item--dangerous',
      handler: () => {
        dispatch(removeHistoryRequest(requestData.action));
        closeDropdownHandler();
      },
    },
  ];

  return (
    <li className="RequestHistoryItem--wrapper" ref={wrapperRef}>
      <button
        onClick={putRequestFromHistoryHandler}
        className={clsx('RequestHistoryItem', {
          isSuccess: isValid,
          isInvalid: !isValid,
        })}
      >
        <ConsolePageSvgSelector svgName="circle" />
        {requestData.action}
        {
          <span
            className={clsx('RequestHistoryItem-copyAlert', {
              isAnimate: isAnimateCopyAlert,
            })}
          >
            Скопировано
          </span>
        }
        <span
          className="RequestHistoryItem-menuIcon--wrapper"
          role="button"
          tabIndex={0}
          onClick={toggleDropdownVisible}
          onKeyUp={onKeyDownToggleDropdownVisible}
        >
          <ConsolePageSvgSelector svgName="dropdown" />
        </span>
      </button>
      {isVisibleDropdown && (
        <Portal>
          <Dropdown top={offsetTop} left={offsetLeft}>
            {dropdownList.map(({text, className, handler}) => (
              <Dropdown.Item onClick={handler} classes={className} key={text}>
                {text}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </Portal>
      )}
    </li>
  );
};

export {RequestHistoryItem};
