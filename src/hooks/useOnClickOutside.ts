import {useEffect, useRef} from 'react';

// eslint-disable-next-line no-unused-vars
const useOnClickOutside = <T extends HTMLElement = HTMLElement>(onClick: (event: MouseEvent | TouchEvent) => void) => {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const node = containerRef.current;
      const target = event.target;

      if (target instanceof HTMLElement && (!node || node.contains(target) || target.closest('.Dropdown-item'))) {
        return;
      }
      onClick(event);
    };

    window.addEventListener('mousedown', listener);
    window.addEventListener('touchstart', listener);
    return () => {
      window.removeEventListener('mousedown', listener);
      window.removeEventListener('touchstart', listener);
    };
  }, []);

  return containerRef;
};

export {useOnClickOutside};
