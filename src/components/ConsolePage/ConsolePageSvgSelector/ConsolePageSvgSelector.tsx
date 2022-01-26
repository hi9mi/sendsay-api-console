type ConsolePageSvgSelectorProps = {
  svgName: string;
};

const ConsolePageSvgSelector = ({svgName}: ConsolePageSvgSelectorProps) => {
  switch (svgName) {
    case 'full-screen-enabled':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 6H4C4.53043 6 5.03914 5.78929 5.41421 5.41421C5.78929 5.03914 6 4.53043 6 4V1M14 1V4C14 4.53043 14.2107 5.03914 14.5858 5.41421C14.9609 5.78929 15.4696 6 16 6H19M19 14H16C15.4696 14 14.9609 14.2107 14.5858 14.5858C14.2107 14.9609 14 15.4696 14 16V19M6 19V16C6 15.4696 5.78929 14.9609 5.41421 14.5858C5.03914 14.2107 4.53043 14 4 14H1"
            stroke="#0D0D0D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'full-screen-disabled':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V6M19 6V3C19 2.46957 18.7893 1.96086 18.4142 1.58579C18.0391 1.21071 17.5304 1 17 1H14M14 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V14M1 14V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H6"
            stroke="#0D0D0D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'formatting':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.8">
            <path d="M21 10H7" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 6H3" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 14H7" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 18H3" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      );

    case 'dropdown':
      return (
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="3" r="2" fill="black" fillOpacity="0.2" />
          <circle cx="8" cy="10" r="2" fill="black" fillOpacity="0.2" />
          <circle cx="8" cy="17" r="2" fill="black" fillOpacity="0.2" />
        </svg>
      );

    case 'circle':
      return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="5" r="5" fill="white" />
          <circle cx="5" cy="5" r="4.5" stroke="black" strokeOpacity="0.2" />
        </svg>
      );

    default:
      return null;
  }
};

export {ConsolePageSvgSelector};
