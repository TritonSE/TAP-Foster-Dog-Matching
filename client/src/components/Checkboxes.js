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
  return (
    <CheckboxContainer checked={value} onClick={() => onChange(!value)} invalid={invalid}>
      <img src={check} alt="check mark" width={20} />
    </CheckboxContainer>
  );
}

const CheckboxesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
  margin-top: 20px;
`;

const CheckboxesColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

const CheckboxLabel = styled.div`
  cursor: pointer;
  font-size: 18px;
`;

function Checkboxes({ options, value, onChange, invalid }) {
  const half = Math.ceil(options.length / 2);

  function handleSelect(newValue) {
    if (value && !value.some((selection) => selection === newValue))
      onChange((oldValue) => [...oldValue, newValue]);
    else if (value && value.some((selection) => selection === newValue))
      onChange((oldValue) => oldValue.filter((val) => val !== newValue));
    else onChange([newValue]);
  }

  function isSelected(optionValue) {
    return value && value.some((selection) => selection === optionValue);
  }

  return (
    <CheckboxesContainer>
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
}

export const ControlledCheckbox = withControl(Checkbox);

export const ControlledCheckboxes = withControl(Checkboxes);

export default Checkboxes;
