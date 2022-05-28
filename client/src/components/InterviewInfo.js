import { useForm } from "react-hook-form";
import React from "react";
import styled from "styled-components";
import { ControlledInput } from "./Input";
import Form from "./Form";
import "../css/interviewInfo.css";

const InputField = styled.input`
  &:focus {
    outline: none;
    border: 2px solid #8dc442;
  }
`;

function PassFail(props) {
  const { control, watch, handleSubmit } = useForm({
    reValidateMode: "onChange",
  });

  const TextAreaField = styled(InputField).attrs({
    as: "textarea",
  })`
    resize: none;
    font-family: inherit;
  `;

  // const notes = React.useRef();

  const onConfirm = () => {};

  const onReject = () => {};

  const onContingent = () => {};

  return (
    <div className="interview-info-wrapper">
      <Form.Container className="info-content">
        <h3 className="interview-info-title">{props.title}</h3>
        <div className="interview-info-input">
          <ControlledInput
            control={control}
            label="Internal Notes"
            numLines={14}
            name="fosterInfo.restrictions"
            className="info-input"
          />
        </div>
        <div className={"button-row" + props.contingent}>
          <Form.Row>
            <button type="button" className="reject-button" onClick={onReject}>
              Reject
            </button>
            {props.contingent ? (
              <button type="button" className="contingent-button" onClick={onContingent}>
                Contingent
              </button>
            ) : (
              <div />
            )}
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
