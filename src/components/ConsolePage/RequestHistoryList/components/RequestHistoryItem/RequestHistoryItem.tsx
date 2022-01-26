import './RequestHistoryItem.css';

import {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';

import {Portal} from 'src/components/Portal';
import {ConsolePageSvgSelector} from 'src/components/ConsolePage/ConsolePageSvgSelector';
import {Dropdown} from '../Dropdown/Dropdown';

import {useOnClickOutside} from 'src/hooks';

type RequestHistoryItemProps = {
  action: string;
  id: string;
  date: string;
  res: string;
};

const RequestHistoryItem = ({action, res, id}: RequestHistoryItemProps) => {
  const [isVisibleDropdown, setVisibleDropdown] = useState<boolean>(false);
  const [offsetTop, setOffsetTop] = useState<number>(0);
  const [offsetLeft, setOffsetLeft] = useState<number>(0);
  const [isAnimateCopyAlert, setAnimateCopyAlert] = useState<boolean>(false);
  const timer = useRef<number>();

  const closeDropdownHandler = () => {
    setVisibleDropdown(false);
  };

  const wrapperRef = useOnClickOutside<HTMLLIElement>(closeDropdownHandler);

  const toggleDropdownVisible = () => {
    setVisibleDropdown((currentIsVisibleDropdown) => !currentIsVisibleDropdown);
  };

  const onKeyDownToggleDropdownVisible = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.code === 'Space') {
      toggleDropdownVisible();
    }
  };

  const copyRequestHandler = () => {
    closeDropdownHandler();
    navigator.clipboard.writeText(JSON.stringify({action, id}));
    setAnimateCopyAlert(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setAnimateCopyAlert(false);
    }, 1000);
  };

  useEffect(() => {
    if (wrapperRef.current) {
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const top = wrapperRect.top + wrapperRect.height;
      setOffsetTop(top);
      setOffsetLeft(wrapperRect.left);
    }
  }, [wrapperRef]);

  const dropdownList = [
    {
      text: 'Выполнить',
      className: 'Dropdown-item--primary',
      handler: closeDropdownHandler,
    },
    {
      text: 'Скопировать',
      className: 'Dropdown-item--primary',
      handler: copyRequestHandler,
    },
    {
      text: 'Удалить',
      className: 'Dropdown-item--dangerous',
      handler: closeDropdownHandler,
    },
  ];

  return (
    <li className="RequestHistoryItem--wrapper" ref={wrapperRef}>
      <button
        className={clsx('RequestHistoryItem', {
          isSuccess: res === 'success',
          isInvalid: res === 'invalid',
        })}
      >
        <ConsolePageSvgSelector svgName="circle" />
        {action}
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
