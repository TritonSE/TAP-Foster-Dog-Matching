import React from "react";
import styled from "styled-components";
import Table from "../../components/Table";
import { Colors, Typography } from "../../components/Theme";

const DUMMY_DATA = [
  {
    firstName: "Shelby",
    createdAt: "04/16/21",
    status: "Step 4: Foster Matching",
    ambassador: "Shelby",
    coordinator: "Kristin",
    completedActionItems: false,
  },
  {
    firstName: "Shelby",
    createdAt: "04/16/21",
    status: "Step 2: Initial Interview",
    ambassador: "Shelby",
    coordinator: null,
    completedActionItems: true,
  },
  {
    firstName: "Shelby",
    createdAt: "04/16/21",
    status: "Step 4: Foster Matching",
    ambassador: "Shelby",
    coordinator: "Kristin",
    completedActionItems: false,
  },
];

const Heading = styled.div`
  ${Typography.heading}
  margin-bottom: 30px;
`;

const CellButton = styled.div`
  background: ${(props) => props.color};
  border-radius: 5px;
  width: 70px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CompletedCellContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

function CompletedActionItemsCell({ completed }) {
  return (
    <CompletedCellContainer>
      {completed ? "Status updated" : "Waiting for update"}
      {completed ? (
        <CellButton color={Colors.salmon}>Review</CellButton>
      ) : (
        <CellButton color={Colors.lightBlue}>View</CellButton>
      )}
    </CompletedCellContainer>
  );
}

function PendingApplications() {
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        accessor: "firstName",
      },
      {
        header: "Date Received",
        accessor: "createdAt",
      },
      {
        header: "Application Status",
        accessor: "status",
      },
      { header: "Ambassador", accessor: "ambassador" },
      { header: "Coordinator", accessor: "coordinator" },
      { header: "Completed Action Items?", accessor: "completedActionItems" },
    ],
    []
  );

  const rows = React.useMemo(
    () =>
      DUMMY_DATA.map((row) => ({
        ...row,
        ambassador: row.ambassador || "Not Assigned",
        coordinator: row.coordinator || "Not Assigned",
        completedActionItems: <CompletedActionItemsCell completed={row.completedActionItems} />,
      })),
    []
  );
  return (
    <div>
      <Heading>Your Pending Applicants</Heading>
      <Table columns={columns} rows={rows} />
    </div>
  );
}

export default PendingApplications;
