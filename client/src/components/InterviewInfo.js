import { useForm } from "react-hook-form";
import React from "react";
import { ControlledInput } from "./Input";
import Form from "./Form";
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
      <Form.Container className="info-content">
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
      </Form.Container>
      <PassFail
        visible={showPassDialog}
        setVisible={setShowPassDialog}
        status="Pass"
        initialMessage=""
      />
      <PassFail
        visible={showContingentDialog}
        setVisible={setShowContingentDialog}
        status="Contingent"
        initialMessage=""
      />
      <PassFail
        visible={showRejectDialog}
        setVisible={setShowRejectDialog}
        status="Reject"
        initialMessage=""
      />
    </div>
  );
}

export default InterviewInfo;
