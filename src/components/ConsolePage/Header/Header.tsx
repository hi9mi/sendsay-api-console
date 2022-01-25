import './Header.css';

import {useState} from 'react';

import {ConsolePageButton} from 'src/components/ConsolePage/ConsolePageButton';
import {ConsolePageSvgSelector} from 'src/components/ConsolePage/ConsolePageSvgSelector';
import {LogoutButton} from './components/LogoutButton';
import {HeaderLogo} from './components/HeaderLogo';
import {HeaderTextField} from './components/HeaderTextField';

const Header = () => {
  const [isFullScreenMode, setFullScreenMode] = useState<boolean>(Boolean(document.fullscreenElement));

  const toggleFullScreenMode = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullScreenMode(true);
    }
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullScreenMode(false);
    }
  };

  return (
    <div className="Header">
      <HeaderLogo />
      <div className="Header-settings">
        <HeaderTextField />
        <LogoutButton />
        <ConsolePageButton onClick={toggleFullScreenMode}>
          <ConsolePageSvgSelector svgName={isFullScreenMode ? 'full-screen-enabled' : 'full-screen-disabled'} />
        </ConsolePageButton>
      </div>
    </div>
  );
};

export {Header};
