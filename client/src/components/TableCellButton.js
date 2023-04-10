/**
 * Table Cell Button Component
 *
 * Used on: PendingApplications, Fosters
 *
 * Props:
 *  - color [string] - background color of button
 *  - textColor [string] - text color
 *  - onClick [function] - on click callback
 *
 * Example:
 *     <TableCellButton color={Colors.salmon} onClick={() => {}}>Review</TableCellButton>
 *
 */

import styled from "styled-components";
import { Colors } from "./Theme";

const TableCellButton = styled.div`
  background: ${(props) => props.color || Colors.lightBlue};
  border-radius: 5px;
  min-width: 70px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: ${(props) => props.fontSize || "inherit"};
`;

export default TableCellButton;
