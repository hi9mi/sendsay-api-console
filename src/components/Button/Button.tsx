import './Button.css';

import clsx from 'clsx';

import {WithChildren} from 'src/types/utility';
import loader from './assets/loader.svg';

type ButtonProps = WithChildren<{
  isLoading?: boolean;
  classes?: string;
}> &
  JSX.IntrinsicElements['button'];

const Button = ({children, isLoading, classes, ...rest}: ButtonProps) => {
  return (
    <button {...rest} className={clsx('Button', classes)}>
      {isLoading ? <img src={loader} alt="" /> : children}
    </button>
  );
};

export {Button};
