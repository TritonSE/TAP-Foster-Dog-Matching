/**
 * Select Component
 *
 * Component that renders a dropdown menu
 *
 * Used on: PendingApplications
 *
 * Props:
 *      - placeholder [string] - text to show if value is null
 *      - options [object[]] - array of object representing options with two keys: label and value
 *      - value [any] - default value. leave as null to show placeholder
 *      - onChange [function] - function to set value on change
 *      - width [string] - width of select. ie. '100px' or '10%'. optional.
 */

import React from "react";
import styled from "styled-components";
import ClickAwayListener from "./ClickAwayListener";

const SelectContainer = styled.div`
  position: relative;
`;

const StyledSelect = styled.div`
  max-height: 50px;
  padding: 6px 15px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  background-color: #C6C6C6;
  z-index: ${(props) => (props.open ? 3 : 1)};
`;

const OptionsContainer = styled.div`
  position: absolute;
  width: 100%;
  top: calc(100% + 5px);
  background: white;
  border: 1px solid black;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: ${(props) => (props.open ? 2 : 0)};
`;

const Option = styled.div`
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const OptionText = styled.span`
  display: flex;
`;

function Select({ placeholder, options, value, onChange }) {
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleSelect = (newValue) => {
    onChange(newValue);
    setOpenMenu(false);
  };

  const isSelected = (optionValue) => value === optionValue;

  const displayValue = React.useMemo(() => {
    const option = options.find((obj) => obj.value === value);
    return option ? option.label : "";
  }, [options, value]);

  return (
    <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
      <SelectContainer>
        <StyledSelect
          open={openMenu}
          onClick={() => {
            setOpenMenu((open) => !open);
          }}
        >
          {!value || value.length === 0 ? <span>{placeholder}</span> : <span>{displayValue}</span>}▼
        </StyledSelect>
        {openMenu && (
          <OptionsContainer open={openMenu}>
            {options &&
              options.map((option) => (
                <Option
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  selected={isSelected(option.value)}
                >
                  <OptionText>{option.label}</OptionText>
                </Option>
              ))}
          </OptionsContainer>
        )}
      </SelectContainer>
    </ClickAwayListener>
  );
}

export default Select;
