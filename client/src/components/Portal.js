/**
 * React Portal
 *
 *  @summary     React Portal that takes in content and puts it at a higher level
 *  @author      Parth Patel
 *
 *
 *  Meant to be used for modals
 *
 *  props:
 *      - location [string] - location that you want the portal to be rendered at - default "modal"
 *
 *  Used on: Application page, foster view, step 4
 *
 */

import React, { useEffect } from "react";
import PortalReactDOM from "react-dom";
import styled from "styled-components";
import { device } from "../utils/useResponsive";

const BlurBackground = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(0.5px);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PortalArea = styled.div`
  position: fixed;
  z-index: 100;
  max-width: 90%;
  height: fit-content;
  max-height: 90%;
  width: 800px;
  border-radius: 100%;
`;

function Portal({ children, location }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return PortalReactDOM.createPortal(
    <BlurBackground>
      <PortalArea>{children}</PortalArea>
    </BlurBackground>,
    document.getElementById(location || "modal")
  );
}

export default Portal;
