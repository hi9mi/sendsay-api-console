import './ConsoleInterface.css';

import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import clsx from 'clsx';

import {ConsolePageSvgSelector} from '../ConsolePageSvgSelector';
import {ConsoleTextarea} from '../ConsoleTextarea';

import {selectConsoleResponse} from 'src/store/console/selectors';
import {getLocalStorage, setLocalStorage} from 'src/utils';
import {CONSOLE_INTERFACE_PADDING_WIDTH, SPLIT_LINE_WIDTH} from './consoleInterface.constants';

type ConsoleInterfaceProps = {
  onChangeRequest: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isValidRequest: boolean;
  request: string;
};

const ConsoleInterface = ({onChangeRequest, isValidRequest, request}: ConsoleInterfaceProps) => {
  const response = useSelector(selectConsoleResponse);

  const [isDraggingSplitLine, setDraggingSplitLine] = useState<boolean>(false);
  const [shiftX, setShiftX] = useState<number>(0);
  const [prevRequestTileWidth, setPrevRequestTileWidth] = useState<number | null>();
  const requestTileRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseDownHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!(event.button === 0)) return;
    setDraggingSplitLine(true);
    setShiftX(event.clientX - event.currentTarget.offsetLeft);
  };

  useLayoutEffect(() => {
    setPrevRequestTileWidth(getLocalStorage('request_tile_width'));
  }, []);

  useEffect(() => {
    const requestTileRefCurrent = requestTileRef.current;

    const mouseMoveListener = (event: MouseEvent) => {
      if (!isDraggingSplitLine || !requestTileRefCurrent) {
        return;
      }
      const pageX = event.pageX;
      const left = pageX - shiftX;
      const offsetX = CONSOLE_INTERFACE_PADDING_WIDTH + SPLIT_LINE_WIDTH;

      if (window.innerWidth - left - offsetX >= 400 && left >= 400) {
        requestTileRefCurrent.style.width = `${left}px`;
      }
      if (containerRef.current && containerRef.current.scrollWidth > window.innerWidth) {
        requestTileRefCurrent.style.width = `${left}px`;
      }
    };

    const mouseUpListener = () => {
      const requestTileRect = requestTileRef.current?.getBoundingClientRect();

      setDraggingSplitLine(false);
      setLocalStorage('request_tile_width', requestTileRect?.width);
    };

    window.addEventListener('mousemove', mouseMoveListener);
    window.addEventListener('mouseup', mouseUpListener);
    return () => {
      window.removeEventListener('mouseup', mouseUpListener);
      window.removeEventListener('mousemove', mouseMoveListener);
    };
  }, [isDraggingSplitLine, shiftX]);

  return (
    <div ref={containerRef} className="ConsoleInterface">
      <div
        ref={requestTileRef}
        className={clsx('ConsoleInterface-tile request', {
          isResizing: isDraggingSplitLine,
        })}
        style={{...(prevRequestTileWidth && {width: prevRequestTileWidth})}}
      >
        <ConsoleTextarea label="Запрос:" value={request} onChange={onChangeRequest} valid={isValidRequest} />
      </div>
      <div
        onMouseDown={mouseDownHandler}
        className={clsx('ConsoleInterface-splitLine', {
          isDragging: isDraggingSplitLine,
        })}
      >
        <ConsolePageSvgSelector svgName="drag-element" />
      </div>
      <div
        className={clsx('ConsoleInterface-tile response', {
          isResizing: isDraggingSplitLine,
        })}
      >
        <ConsoleTextarea label="Ответ:" value={response?.message ?? ''} valid={response?.isValid ?? true} readOnly />
      </div>
    </div>
  );
};

export {ConsoleInterface};
