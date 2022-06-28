import React from "react";

export const size = {
  mobile: 750,
  tablet: 1024,
};

export const device = {
  mobile: `@media screen and (max-width: ${size.mobile}px)`,
  tablet: `@media screen and (max-width: ${size.tablet}px)`,
};

const useResponsive = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const isMobile = React.useMemo(() => width <= size.mobile, [width]);
  const isTablet = React.useMemo(() => width <= size.tablet, [width]);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return { isMobile, isTablet, width };
};

export default useResponsive;
