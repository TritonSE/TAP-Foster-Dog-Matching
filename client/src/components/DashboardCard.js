/**
 * Reusable card for the dashboard that contains an iconButton component, image, and text.
 *
 * Takes imagePath, imageAltText, and an optional link path as props.
 *
 * @summary     Card meant for the dashboard.
 * @author      Andrew Masek
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/dashboardcard.css";

function DashboardCard(props) {
  const navigate = useNavigate();
  return (
    <div
      className="dashboard-card"
      onClick={props.navigationPath ? () => navigate(props.navigationPath) : undefined}
    >
      {props.iconButton}
      <div className="dashboard-card-image-container">
        <img className="dashboard-card-image" src={props.imagePath} alt={props.imageAltText} />
      </div>
      <div className="dashboard-card-text">{props.cardText}</div>
    </div>
  );
}

export default DashboardCard;
