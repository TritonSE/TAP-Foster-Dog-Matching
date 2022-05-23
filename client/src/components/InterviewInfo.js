import { ControlledInput, InputLabel } from "./Input";
import { useForm } from "react-hook-form";
import React from "react";
import Form from "./Form";
import "../css/interviewInfo.css";

function PassFail( props ) {
  const { control, watch, handleSubmit } = useForm({
    reValidateMode: "onChange",
  });

  const notes = React.useRef();

  const onConfirm = () => {};

  const onReject = () => {};

  const onContingent = () => {};

  return (
    <div className="interview-info-wrapper">
      <Form.Container className="info-content">
          <h2 className="interview-info-title">{props.title}</h2>
          <div className="interview-info-input">
            <ControlledInput
              control={control}
              label="Internal Notes"
              numLines={15}
              name="fosterInfo.restrictions"
            />
          </div>
          <div className="button-row">
            <Form.Row>
            <button type="button" className="reject-button" onClick={onReject}>
              Reject
            </button>
            {props.contingent ? (
              <button type="button" className="contingent-button" onClick={onContingent}>
                Contingent
              </button> )
              :
              (<></>)
            }
            <button type="button" className="pass-button" onClick={onConfirm}>
              Pass
            </button>
          </Form.Row>
          </div>
        
      </Form.Container>
    </div>
  );
}

export default PassFail;
