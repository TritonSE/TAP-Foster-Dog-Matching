import { ControlledInput, InputLabel } from "./Input";
import { useForm } from "react-hook-form";
import React from "react";
import Form from "./Form";
import "../css/interviewInfo.css";

function PassFail({ props }) {
  const { control, watch, handleSubmit } = useForm({
    reValidateMode: "onChange",
  });

  const notes = React.useRef();

  const onConfirm = () => {};

  const onReject = () => {};

  return (
    <div className="interview-info-wrapper">
      <Form.Container className="info-content">
          <h2 className="interview-info-title">After Interview</h2>
          <div className="interview-info-input">
            <ControlledInput
              control={control}
              label="Internal Notes"
              numLines={8}
              name="fosterInfo.restrictions"
            />
          </div>
        <Form.Row>
          <button type="button" className="reject-button" onClick={onReject}>
            Reject
          </button>
          <button type="button" className="pass-button" onClick={onConfirm}>
            Pass
          </button>
        </Form.Row>
      </Form.Container>
    </div>
  );
}

export default PassFail;
