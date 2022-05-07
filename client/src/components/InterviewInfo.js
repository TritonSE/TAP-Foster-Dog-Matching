import { ControlledInput, InputLabel } from "./Input";
import { useForm } from "react-hook-form";
import React from "react";
import Form from "./Form";

function PassFail({}) {

    const { control, watch, handleSubmit } = useForm({
        reValidateMode: "onChange",
      });

    const notes = React.useRef();

    return (
        <div className="interview-info-wrapper">
                <Form.Container>
                    <Form.Section title="After Interview" ref={notes}>
                    <ControlledInput
                        control={control}
                        label="Internal Notes"
                        numLines={8}
                        name="fosterInfo.restrictions"
                        />
                    </Form.Section>
                    <Form.Row>
                        <button type="button" className="reject-button" onClick={onConfirm}>Reject</button>
                        <button type="button" className="pass-button" onClick={onConfirm}>Pass</button>
                    </Form.Row>
                </Form.Container>     

        </div>
    )

}

export default PassFail;
