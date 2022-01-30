import './ConsoleTextarea.css';

import clsx from 'clsx';

type ConsoleTextareaProps = {classes?: string; label: string; valid?: boolean} & JSX.IntrinsicElements['textarea'];

const ConsoleTextarea = ({classes, label, valid = true, ...rest}: ConsoleTextareaProps) => {
  return (
    <div className={clsx('ConsoleTextarea--wrapper', classes)}>
      <label
        className={clsx('ConsoleTextarea-label', {
          invalid: !valid,
        })}
        htmlFor={rest.id ?? rest.name}
      >
        {label}
      </label>
      <textarea
        {...rest}
        className={clsx('ConsoleTextarea', {
          invalid: !valid,
        })}
      />
    </div>
  );
};

export {ConsoleTextarea};
