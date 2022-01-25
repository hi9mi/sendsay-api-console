import './HeaderTextField.css';

import clsx from 'clsx';
import {memo, useState} from 'react';
import {useSelector} from 'react-redux';

import {selectAuthDataLogin} from 'src/store/auth/selectors';

type HeaderTextFieldProps = {classes?: string} & JSX.IntrinsicElements['input'];

const HeaderTextField = memo(({classes, ...rest}: HeaderTextFieldProps) => {
  const login = useSelector(selectAuthDataLogin);

  const [textFieldValue, setTextFieldValue] = useState<string>(login ?? '');

  const changeTextFieldValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setTextFieldValue(value);
  };

  return (
    <input
      {...rest}
      className={clsx('HeaderTextField', classes)}
      type="text"
      value={textFieldValue}
      onChange={changeTextFieldValueHandler}
    />
  );
});

export {HeaderTextField};
