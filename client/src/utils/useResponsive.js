import React from "react";

export const size = {
  mobile: 750,
};

export const device = {
  mobile: `@media screen and (max-width: ${size.mobile}px)`,
};

const useResponsive = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const isMobile = React.useMemo(() => width <= size.mobile, [width]);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return { isMobile, width };
};

export default useResponsive;
