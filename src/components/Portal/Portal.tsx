import {createPortal} from 'react-dom';
import {useEffect, useState} from 'react';

import {WithChildren} from 'src/types/utility';

type PortalProps = WithChildren;

const Portal = ({children}: PortalProps) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);

    return () => void document.body.removeChild(container);
  }, []);

  return createPortal(children, container);
};

export {Portal};
