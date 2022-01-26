import './Dropdown.css';

import {WithChildren} from 'src/types/utility';
import clsx from 'clsx';

type DropdownProps = WithChildren<{
  top?: number;
  left?: number;
  classes?: string;
}>;

const Dropdown = ({children, top, left, classes}: DropdownProps) => {
  return (
    <ul style={{top, left}} className={clsx('Dropdown', classes)}>
      {children}
    </ul>
  );
};

export type DropdownItemProps = WithChildren<{
  onClick: () => void;
  classes?: string;
}>;

Dropdown.Item = ({children, onClick, classes}: DropdownItemProps) => {
  const onKeyUpHandler = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.code === 'Space') {
      onClick();
    }
  };

  return (
    <li className={clsx('Dropdown-item--wrapper', classes)}>
      <span className="Dropdown-item" role="button" tabIndex={0} onClick={onClick} onKeyUp={onKeyUpHandler}>
        {children}
      </span>
    </li>
  );
};

export {Dropdown};
