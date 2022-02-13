import React from "react";
import styled, { css } from "styled-components";
import withControl from "../utils/withControl";
import { Colors, Typography } from "./Theme";

const InputContainer = styled.div``;

export const InputLabel = styled.div`
  font-weight: normal;
  font-size: 18px;
  margin-bottom: 6px;
`;

export const InputHelpText = styled.span``;

const InputInfoContainer = styled.div``;

const InputField = styled.input`
  border: 2px solid ${Colors.gray};
  border-radius: 8px;
  font-size: 18px;
  padding: 4px;
  width: 100%;
  ${(props) =>
    props.invalid &&
    css`
      border: 2px solid ${Colors.salmon};
    `}
`;

const TextAreaField = styled(InputField).attrs({
  as: "textarea",
})`
  resize: none;
`;

/*
 * Props:
 *      - value [any] - default value
 *      - onChange [function] - function to set value on change
 *      - onBlur [function] - function to run on input blur
 *      - invalid [boolean] - if field should show red error border
 *      - showCounter [boolean] - show char counter
 *      - maxChars [number] - max chars to display on char counter
 *      - label [string] - label to show above input
 *      - helpText [string] - info text to display under input
 *      - placeholder [string] - value to show when no input
 *      - numLines [number] - rows to show if a textarea is desired
 *      - type [string] - input type (ie. text, number, etc). default: text
 *      - width [string] - width of input (ie. '100px' or '30%')
 *      - textAlign [string] - text alignment of input
 *      - disabled [boolean] - if input should be disabled
 *      - autoFocus [boolean] - if input should autofocus
 *      - variant [string] - variant of input - 'compact'
 */

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
      let value = event.target.value;
      onChange(value);
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