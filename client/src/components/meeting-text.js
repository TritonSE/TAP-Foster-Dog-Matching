import React from "react";
import "../styles/meeting-text.css";

function MeetingsText(props) {
    return (
      <div className="text">
        <p>{props.text}</p>
      </div>
    );
  }
  
  export default MeetingsText;