import React from "react";
import Input from "./Input";
import PassFail from "./PassFail";
import "../css/interviewInfo.css";
import { updateApplication } from "../services/application";
import ApplicationContext from "../contexts/ApplicationContext";

function InterviewInfo(props) {
  const { applicationId, applicationState } = React.useContext(ApplicationContext);
  const [internalNotes, setInternalNotes] = React.useState("");
  const [showPassDialog, setShowPassDialog] = React.useState(false);
  const [showContingentDialog, setShowContingentDialog] = React.useState(false);
  const [showRejectDialog, setShowRejectDialog] = React.useState(false);

  const onPass = () => {
    setShowPassDialog(true);
  };

  const onReject = () => {
    setShowRejectDialog(true);
  };

  const onContingent = () => {
    setShowContingentDialog(true);
  };

  React.useState(() => {
    if (applicationState) {
      setInternalNotes(applicationState.internalNotes);
    }
  }, [applicationState]);

  const handleOnConfirm = (callback) => () => {
    // save internal notes
    updateApplication(applicationId, { internalNotes }).then(() => {
      callback();
    });
  };

  return (
    <div className="interview-info-wrapper">
      <div className="info-content">
        <h3 className="interview-info-title">{props.title}</h3>
        <div className="interview-info-input">
          <Input
            value={internalNotes}
            onChange={setInternalNotes}
            label="Internal Notes"
            numLines={12}
            className="info-input"
          />
        </div>
        <div className="button-row">
          <button type="button" className="reject-button" onClick={onReject}>
            Reject
          </button>
          {props.contingent && (
            <button type="button" className="contingent-button" onClick={onContingent}>
              Contingent
            </button>
          )}
          <button type="button" className="pass-button" onClick={onPass}>
            Pass
          </button>
        </div>
      </div>
      <PassFail
        visible={showPassDialog}
        setVisible={setShowPassDialog}
        status="Pass"
        initialMessage={props.passInitialMessage}
        onConfirm={handleOnConfirm(props.onPassConfirm)}
      />
      {props.contingent && (
        <PassFail
          visible={showContingentDialog}
          setVisible={setShowContingentDialog}
          status="Contingent"
          initialMessage={props.contingentInitialMessage}
          onConfirm={handleOnConfirm(props.onContingentConfirm)}
        />
      )}
      <PassFail
        visible={showRejectDialog}
        setVisible={setShowRejectDialog}
        status="Reject"
        initialMessage={props.rejectInitialMessage}
        onConfirm={handleOnConfirm(props.onRejectConfirm)}
      />
    </div>
  );
}

export default InterviewInfo;
