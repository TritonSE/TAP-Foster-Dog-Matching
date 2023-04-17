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
  border: 0.5px solid ${Colors.gray};
  border-collapse: separate;
  border-spacing: 0;
`;

const TableContainer = styled.div`
  margin-right: 40px;
  display: inline-table;
`;

const StyledTable = styled.table`
  ${tableBorder}
  border: 1px solid ${Colors.gray};
  border-radius: 6px;
  width: 100%;
  tr:first-child,
  th:first-child {
    border-top-left-radius: 5px;
  }
  tr:first-child th:last-child {
    border-top-right-radius: 5px;
  }
  tr:last-child td:first-child {
    border-bottom-left-radius: 5px;
  }
  tr:last-child td:last-child {
    border-bottom-right-radius: 5px;
  }
`;

const TableHead = styled.thead``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: ${Colors.lightGreen};
  }
  &:nth-child(odd) {
    background: white;
  }
  td:first-child {
    border-left: 0;
  }
  td:last-child {
    border-right: 0;
  }
`;

const TableHeader = styled.th`
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

const Message = styled.p`
  text-align: center;
  font-size: 26px;
`;

function Table({ columns, rows }) {
  if (rows && rows.length > 0)
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
                  {columns.map((column, columnIndex) => (
                    <TableCell key={`${row[column.accessor]} - ${columnIndex}`}>
                      {row[column.accessor]}
                    </TableCell>
                  ))}
                </TableRow>
              </>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    );
  // Data not loaded yet
  if (!rows) return null;
  // No data to show
  return <Message>Nothing to see here.</Message>;
}

export default Table;
