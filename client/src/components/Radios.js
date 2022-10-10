/**
 * Radios/Radio Component
 *
 * Component that renders radio buttons
 *
 * Used on: Application
 */
import React from "react";
import styled, { css } from "styled-components";
import { Colors } from "./Theme";
import withControl from "../utils/withControl";
import { device } from "../utils/useResponsive";
import Input from "./Input";

const RadioContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${(props) => (props.selected ? Colors.green : Colors.gray)};
  border: 5px solid ${Colors.gray};
  box-sizing: border-box;
  ${(props) =>
    props.invalid &&
    css`
      border: 3px solid ${Colors.salmon};
    `}
  ${device.mobile} {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

/**
 * Radio Component
 *
 * Props:
 *      - value [boolean] - if radio is selected
 *      - onChange [function] - function to run on value change
 *      - invalid [boolean] - if field should show red error border
 *      - otherOption [boolean] - if should include a free response "other" option radio
 */

export function Radio({ value, onChange, invalid }) {
  return <RadioContainer selected={value} onClick={() => onChange(!value)} invalid={invalid} />;
}

const RadiosContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 80px;
  ${device.mobile} {
    gap: 20px;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  ${device.mobile} {
    gap: 10px;
  }
`;

const RadioLabel = styled.div`
  cursor: pointer;
  font-size: 18px;
  ${device.mobile} {
    font-size: 3vw;
  }
`;

const Radios = React.forwardRef(
  ({ options, value, onChange, invalid, otherOption, readOnly }, ref) => {
    const [otherSelected, setOtherSelected] = React.useState(false);
    const [otherText, setOtherText] = React.useState();

    function handleSelect(newValue) {
      if (!readOnly) {
        setOtherSelected(false);
        setOtherText("");
        onChange(newValue);
      }
    }

    const handleOtherSelect = React.useCallback(() => {
      if (!readOnly) {
        setOtherSelected(true);
        onChange(otherText);
      }
    }, [otherText, readOnly]);

    const handleOtherTextChange = React.useCallback(
      (newValue) => {
        if (!readOnly) {
          setOtherText(newValue);
          onChange(newValue);
        }
      },
      [readOnly]
    );

    function isSelected(optionValue) {
      return !otherSelected && value === optionValue;
    }

    return (
      <RadiosContainer ref={ref}>
        {options.map((option) => (
          <RadioGroup key={option}>
            <Radio
              value={isSelected(option)}
              onChange={() => handleSelect(option)}
              invalid={invalid}
            />
            <RadioLabel onClick={() => handleSelect(option)}>{option}</RadioLabel>
          </RadioGroup>
        ))}
        {otherOption && (
          <RadioGroup>
            <Radio value={otherSelected} onChange={handleOtherSelect} invalid={invalid} />
            <Input
              value={otherText}
              onClick={handleOtherSelect}
              onChange={handleOtherTextChange}
              placeholder="Other"
              disabled={readOnly}
            />
          </RadioGroup>
        )}
      </RadiosContainer>
    );
  }
);

export const ControlledRadio = withControl(Radio);

export const ControlledRadios = withControl(Radios);

export default Radios;
