/**
 * Input Component
 *
 * Component that renders a text input or text area
 *
 * Props:
 *      - value [any] - default value
 *      - onChange [function] - function to set value on change
 *      - onBlur [function] - function to run on input blur
 *      - invalid [boolean] - if field should show red error border
 *      - label [string] - label to show above input
 *      - helpText [string] - info text to display under input
 *      - placeholder [string] - value to show when no input
 *      - numLines [number] - rows to show if a textarea is desired
 *      - type [string] - input type (ie. text, number, etc). default: text
 *      - width [string] - width of input (ie. '100px' or '30%')
 *      - disabled [boolean] - if input should be disabled
 *      - autoFocus [boolean] - if input should autofocus
 */

import React from "react";
import styled, { css } from "styled-components";
import { device } from "../utils/useResponsive";
import withControl from "../utils/withControl";
import { Colors } from "./Theme";

const InputContainer = styled.div``;

export const InputLabel = styled.div`
  font-weight: normal;
  font-size: 18px;
  margin-bottom: 6px;
  ${device.mobile} {
    font-size: 3vw;
  }
`;

export const InputHelpText = styled.span``;

const InputInfoContainer = styled.div``;

const InputField = styled.input`
  border: 2px solid ${Colors.gray};
  border-radius: 8px;
  font-size: 18px;
  padding: 4px;
  width: 100%;
  box-sizing: border-box;
  ${(props) =>
    props.invalid &&
    css`
      border: 2px solid ${Colors.salmon};
    `}
  ${(props) =>
    props.type === "number" &&
    css`
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      margin: 0;
    `}
  ${device.mobile} {
    font-size: 3vw;
  }
`;

const TextAreaField = styled(InputField).attrs({
  as: "textarea",
})`
  resize: none;
  font-family: inherit;
`;

const Input = React.forwardRef(
  (
    {
      value,
      onChange,
      onBlur,
      invalid,
      label,
      helpText,
      numLines,
      placeholder,
      width,
      type,
      disabled,
      autoFocus,
      ...inputProps
    },
    ref
  ) => {
    const handleChange = (event) => {
      onChange(event.target.value);
    };

    return (
      <InputContainer width={width}>
        <InputLabel>{label}</InputLabel>
        {numLines ? (
          <TextAreaField
            ref={ref}
            rows={numLines}
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
            invalid={invalid}
            disabled={disabled}
            autoFocus={autoFocus}
            onBlur={onBlur}
            {...inputProps}
          />
        ) : (
          <InputField
            ref={ref}
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
            type={type}
            invalid={invalid}
            disabled={disabled}
            autoFocus={autoFocus}
            onBlur={onBlur}
            {...inputProps}
          />
        )}
        <InputInfoContainer>
          {helpText && <InputHelpText>{helpText}</InputHelpText>}
        </InputInfoContainer>
      </InputContainer>
    );
  }
);

export const ControlledInput = withControl(Input);

export default Input;
