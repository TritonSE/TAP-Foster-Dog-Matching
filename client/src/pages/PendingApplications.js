import React from "react";
import styled from "styled-components";
import DefaultBody from "../components/DefaultBody";
import Select from "../components/Select";
import Table from "../components/Table";
import { Colors, Typography } from "../components/Theme";

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

function CoordinatorSelect({ initialValue }) {
  const [value, setValue] = React.useState(initialValue);

  const handleSelect = React.useCallback((val) => {
    setValue(val);
  }, []);

  return (
    <Select
      value={value}
      height="20px"
      options={[
        // TODO: Replace with data
        { label: "Kristin", value: "Kristin" },
        { label: "Amy", value: "Amy" },
        { label: "Kristin", value: "Kristin" },
        { label: "Amy", value: "Amy" },
      ]}
      onChange={handleSelect}
      placeholder="N/A"
    />
  );
}

function AmbassadorSelect({ initialValue }) {
  const [value, setValue] = React.useState(initialValue);

  const handleSelect = React.useCallback((val) => {
    setValue(val);
  }, []);

  return (
    <Select
      value={value}
      height="20px"
      options={[
        // TODO: Replace with data
        { label: "Shelby", value: "Shelby" },
        { label: "Amy", value: "Amy" },
        { label: "Kristin", value: "Kristin" },
        { label: "Amy", value: "Amy" },
      ]}
      onChange={handleSelect}
      placeholder="N/A"
    />
  );
}

const role = "management"; // OR "ambassador" TODO: Replace with actual user role
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
        ambassador:
          role === "ambassador" ? (
            row.ambassador || "Not Assigned"
          ) : (
            <AmbassadorSelect initialValue={row.ambassador} />
          ),
        coordinator:
          role === "ambassador" ? (
            row.coordinator || "Not Assigned"
          ) : (
            <CoordinatorSelect initialValue={row.coordinator} />
          ),
        completedActionItems: <CompletedActionItemsCell completed={row.completedActionItems} />,
      })),
    []
  );
  return (
    <DefaultBody>
      <Heading>Your Pending Applicants</Heading>
      <Table columns={columns} rows={rows} />
    </DefaultBody>
  );
}

export default PendingApplications;
