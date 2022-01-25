import './ConsolePageButton.css';

import {WithChildren} from 'src/types/utility';
import clsx from 'clsx';

type ConsolePageButtonProps = WithChildren<{classes?: string}> & JSX.IntrinsicElements['button'];

const ConsolePageButton = ({children, classes, ...rest}: ConsolePageButtonProps) => {
  return (
    <button {...rest} className={clsx('ConsolePageButton', classes)}>
      {children}
    </button>
  );
};

export {ConsolePageButton};
