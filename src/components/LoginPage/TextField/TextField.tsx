import './TextField.css';

import {useField} from 'formik';
import clsx from 'clsx';

type TextFieldProps = {name: string; label?: string; classes?: string; isOptional?: boolean} & JSX.IntrinsicElements['input'];

const TextField = ({label, classes, name, isOptional, ...rest}: TextFieldProps) => {
  const [field, {error}] = useField(name);

  return (
    <div className={clsx('TextField', classes)}>
      {label && (
        <label
          className={clsx('TextField-label', {
            'TextField-label--withError': Boolean(error),
          })}
          htmlFor={rest.id ?? name}
        >
          {label} {isOptional && <span className="TextField-optionalField">Опционально</span>}
        </label>
      )}
      <input
        {...rest}
        {...field}
        className={clsx('TextField-input', {
          'TextField-input--withError': Boolean(error),
        })}
      />
    </div>
  );
};

export {TextField};
