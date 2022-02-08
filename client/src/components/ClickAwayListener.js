/**
 * ClickAwayListener Component
 *
 * Component that triggers a callback if user clicks away
 *
 * Used on: Select component
 *
 */

import React from "react";

function useClickAwayListener(ref, callback) {
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function ClickAwayListener({ children, onClickAway }) {
  const wrapperRef = React.useRef(null);
  useClickAwayListener(wrapperRef, onClickAway);

  return <div ref={wrapperRef}>{children}</div>;
}