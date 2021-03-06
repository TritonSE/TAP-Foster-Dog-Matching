import { useForm } from "react-hook-form";
import React from "react";
import { ControlledInput } from "./Input";
import PassFail from "./PassFail";
import "../css/interviewInfo.css";

function InterviewInfo(props) {
  const [showPassDialog, setShowPassDialog] = React.useState(false);
  const [showContingentDialog, setShowContingentDialog] = React.useState(false);
  const [showRejectDialog, setShowRejectDialog] = React.useState(false);
  const { control } = useForm({
    reValidateMode: "onChange",
  });

  const onPass = () => {
    setShowPassDialog(true);
  };

  const onReject = () => {
    setShowRejectDialog(true);
  };

  const onContingent = () => {
    setShowContingentDialog(true);
  };

  return (
    <div className="interview-info-wrapper">
      <div className="info-content">
        <h3 className="interview-info-title">{props.title}</h3>
        <div className="interview-info-input">
          <ControlledInput
            control={control}
            label="Internal Notes"
            numLines={12}
            name="fosterInfo.restrictions"
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
        onConfirm={props.onPassConfirm}
      />
      {props.contingent && (
        <PassFail
          visible={showContingentDialog}
          setVisible={setShowContingentDialog}
          status="Contingent"
          initialMessage={props.contingentInitialMessage}
          onConfirm={props.onContingentConfirm}
        />
      )}
      <PassFail
        visible={showRejectDialog}
        setVisible={setShowRejectDialog}
        status="Reject"
        initialMessage={props.rejectInitialMessage}
        onConfirm={props.onRejectConfirm}
      />
    </div>
  );
}

export default InterviewInfo;
