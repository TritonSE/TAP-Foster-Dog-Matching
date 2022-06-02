/**
 * Checkboxes/Checkbox Component
 *
 * Component that renders checkboxes
 *
 * Used on: Application
 */
import React from "react";
import styled, { css } from "styled-components";
import { Colors } from "./Theme";
import withControl from "../utils/withControl";
import check from "../images/check.png";
import useResponsive, { device } from "../utils/useResponsive";

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 20px;
  height: 20px;
  background: ${(props) => (props.checked ? Colors.green : "#ffffff")};
  border: 2px solid ${(props) => (props.checked ? Colors.green : Colors.gray)};
  border-radius: 5px;
  ${(props) =>
    props.invalid &&
    css`
      border: 2px solid ${Colors.salmon};
    `}
  ${device.mobile} {
    width: 15px;
    height: 15px;
  }
`;

/**
 * Checkbox Component
 *
 * Props:
 *      - value [boolean] - if checkbox is selected
 *      - onChange [function] - function to run on value change
 *      - invalid [boolean] - if field should show red error border
 */

export function Checkbox({ value, onChange, invalid }) {
  const { isMobile } = useResponsive();
  return (
    <CheckboxContainer checked={value} onClick={() => onChange(!value)} invalid={invalid}>
      <img src={check} alt="check mark" width={isMobile ? 15 : 20} />
    </CheckboxContainer>
  );
}

const CheckboxesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
  margin-top: 20px;
  ${device.mobile} {
    gap: 20px;
  }
`;

const CheckboxesColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  ${device.mobile} {
    gap: 20px;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  ${device.mobile} {
    gap: 10px;
  }
`;

const CheckboxLabel = styled.div`
  cursor: pointer;
  font-size: 18px;
  ${device.mobile} {
    font-size: 3vw;
  }
`;

const Checkboxes = React.forwardRef(({ options, value, onChange, invalid, readOnly }, ref) => {
  const half = Math.ceil(options.length / 2);

  function handleSelect(newValue) {
    if (readOnly) {
      return;
    }
    let updatedValue;
    if (value && !value.some((selection) => selection === newValue))
      updatedValue = [...value, newValue];
    else if (value && value.some((selection) => selection === newValue))
      updatedValue = value.filter((val) => val !== newValue);
    else updatedValue = [newValue];
    onChange(updatedValue);
  }

  function isSelected(optionValue) {
    return value && value.some((selection) => selection === optionValue);
  }

  return (
    <CheckboxesContainer ref={ref}>
      {[options.slice(0, half), options.slice(half)].map((column) => (
        <CheckboxesColumn>
          {column.map((option) => (
            <CheckboxGroup key={option}>
              <Checkbox
                value={isSelected(option)}
                onChange={() => handleSelect(option)}
                invalid={invalid}
              />
              <CheckboxLabel onClick={() => handleSelect(option)}>{option}</CheckboxLabel>
            </CheckboxGroup>
          ))}
        </CheckboxesColumn>
      ))}
    </CheckboxesContainer>
  );
});

export const ControlledCheckbox = withControl(Checkbox);

export const ControlledCheckboxes = withControl(Checkboxes);

export default Checkboxes;
