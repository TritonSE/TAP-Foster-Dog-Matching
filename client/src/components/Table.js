/**
 * Table Component
 *
 * Used on: PendingApplications, Fosters
 *
 * Props:
 *  - columns [{ header: string, accessor: string }[]]
 *        - array of objects with keys:
 *             - header - label to show in header
 *             - accessor - key of data objects corresponding to this column
 *        - ex: [{header: "Name", accessor: "name"}, {header: "Number", accessor: "number"}]
 *
 *  - rows: [Object[]]
 *        - array of objects representing rows of data where keys are column accessors
 *        - ex: [{name: "Deebo", number: 19}, {name: "Jimmy", number: 10}]
 */

import React from "react";
import styled, { css } from "styled-components";
import { Colors } from "./Theme";

const tableBorder = css`
  border: 1px solid ${Colors.gray};
  border-collapse: collapse;
`;

const TableContainer = styled.div`
  margin-right: 40px;
  display: inline-block;
`;

const StyledTable = styled.table`
  ${tableBorder}
  width: 100%;
`;

const TableHead = styled.thead``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: ${Colors.lightGreen};
  }
  &:nth-child(odd) {
    background: white;
  }
`;

const TableHeader = styled.th`
  ${tableBorder}
  color: white;
  background: ${Colors.green};
  padding: 20px 28px;
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  ${tableBorder}
  color: black;
  padding: 20px 28px;
  text-align: center;
`;

function Table({ columns, rows }) {
  return (
    <TableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableHeader key={column.header}>{column.header}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <>
              {/* eslint-disable react/no-array-index-key */}
              <TableRow
                key={`${JSON.stringify(
                  Object.values(row).filter((val) => typeof val !== "object")
                )}-${index}`}
              >
                {columns.map((column) => (
                  <TableCell key={row[column.accessor]}>{row[column.accessor]}</TableCell>
                ))}
              </TableRow>
            </>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

export default Table;
