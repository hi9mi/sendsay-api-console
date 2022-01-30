import {useState} from 'react';

import {ConsolePageButton} from 'src/components/ConsolePage/ConsolePageButton';
import {ConsolePageSvgSelector} from 'src/components/ConsolePage/ConsolePageSvgSelector';

const ToggleScreenModeButton = () => {
  const [isFullScreenMode, setFullScreenMode] = useState<boolean>(false);

  const toggleScreenMode = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setFullScreenMode(true);
        })
        .catch(() => setFullScreenMode(false));
    }
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullScreenMode(false);
    }
  };

  return (
    <ConsolePageButton onClick={toggleScreenMode}>
      <ConsolePageSvgSelector svgName={isFullScreenMode ? 'full-screen-enabled' : 'full-screen-disabled'} />
    </ConsolePageButton>
  );
};

export {ToggleScreenModeButton};
