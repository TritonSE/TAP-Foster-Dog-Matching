import React from "react";
import "../styles/dashboardcard.css";

function DashboardCard(props) {
  return (
    <div className="dashboard-card">
      {props.iconButton}
      <div className="dashboard-card-image-container">
        <img className="dashboard-card-image" src={props.imagePath} alt={props.imageAltText} />
      </div>
      <div className="dashboard-card-text">{props.cardText}</div>
    </div>
  );
}

export default DashboardCard;
