import React from "react";
import styled from "styled-components";
import Table from "../components/Table";
import TableCellButton from "../components/TableCellButton";
import Select from "../components/Select";
import { Colors, Typography } from "../components/Theme";
import DefaultBody from "../components/DefaultBody";
import { AuthContext } from "../contexts/AuthContext";
import AmbassadorSelect from "../components/AmbassadorSelect";
import CoordinatorSelect from "../components/CoordinatorSelect";

const DUMMY_REPEAT_FOSTERS_DATA = [
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
    status: "Step 4: Foster Matching",
    ambassador: "Shelby",
    coordinator: "Jim",
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

const DUMMY_ALL_FOSTERS_DATA = [
  {
    firstName: "Shelby",
    lastActive: "04/16/21",
    accountActive: true,
    currentlyFostering: "Yes",
    pastFosters: 4,
    ambassador: "Shelby",
    coordinator: "Kristin",
  },
  {
    firstName: "Shelby",
    lastActive: "04/16/21",
    accountActive: false,
    currentlyFostering: "No",
    pastFosters: 4,
    ambassador: "Shelby",
    coordinator: "Jim",
  },
  {
    firstName: "Shelby",
    lastActive: "04/16/21",
    accountActive: true,
    currentlyFostering: "Yes",
    pastFosters: 3,
    ambassador: "Shelby",
    coordinator: "Kristin",
  },
];
const Heading = styled.div`
  ${Typography.heading}
  margin-bottom: 30px;
`;

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  box-sizing: content-box;
  flex-direction: row;
  gap: 56px;
  margin-bottom: 45px;
  ${Heading} {
    margin-bottom: 0;
  }
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

const SpacedCellContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

function CompletedActionItemsCell({ completed }) {
  const {
    currentUser: { role },
  } = React.useContext(AuthContext);

  return (
    <SpacedCellContainer>
      {completed ? "Status updated" : "Waiting for update"}
      {role === "management" &&
        (completed ? (
          <CellButton color={Colors.salmon}>Review</CellButton>
        ) : (
          <CellButton color={Colors.lightBlue}>View</CellButton>
        ))}
    </SpacedCellContainer>
  );
}

function RepeatFosters() {
  const {
    currentUser: { role },
  } = React.useContext(AuthContext);

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
      // TODO: Fetch real data
      DUMMY_REPEAT_FOSTERS_DATA.map((row) => ({
        ...row,
        ambassador:
          role === "ambassador" ? (
            row.ambassador || "Not Assigned"
          ) : (
            // TODO: doesn't work until real data is used
            <AmbassadorSelect
              initialValue={row.ambassador && row.ambassador._id}
              applicationId={row._id}
            />
          ),
        coordinator:
          role === "ambassador" ? (
            row.coordinator || "Not Assigned"
          ) : (
            // TODO: doesn't work until real data is used
            <CoordinatorSelect
              initialValue={row.coordinator && row.coordinator._id}
              applicationId={row._id}
            />
          ),
        completedActionItems: <CompletedActionItemsCell completed={row.completedActionItems} />,
      })),
    []
  );

  return (
    <div>
      <Heading>My Repeat Fosters</Heading>
      <Table columns={columns} rows={rows} />
    </div>
  );
}

function AccountStatusCell({ active }) {
  const {
    currentUser: { role },
  } = React.useContext(AuthContext);

  return (
    <SpacedCellContainer>
      {active ? "Active" : "Inactive"}
      <TableCellButton>View</TableCellButton>
      {!active && role === "management" && (
        <TableCellButton color={Colors.green}>Activate</TableCellButton>
      )}
    </SpacedCellContainer>
  );
}

function AllFosters() {
  const {
    currentUser: { role },
  } = React.useContext(AuthContext);
  const [fostersView, setFostersView] = React.useState("all");
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        accessor: "firstName",
      },
      {
        header: "Last Active",
        accessor: "lastActive",
      },
      {
        header: "Currently Fostering",
        accessor: "currentlyFostering",
      },
      {
        header: "Past Fosters",
        accessor: "pastFosters",
      },
      { header: "Ambassador", accessor: "ambassador" },
      { header: "Coordinator", accessor: "coordinator" },
      {
        header: "Account Status",
        accessor: "accountActive",
      },
    ],
    []
  );

  const rows = React.useMemo(
    () =>
      // TODO: Fetch real data
      DUMMY_ALL_FOSTERS_DATA.filter((foster) => {
        switch (fostersView) {
          case "active":
            return foster.accountActive;
          case "inactive":
            return !foster.accountActive;
          default:
            // fostersView is set to 'all'
            return true;
        }
      }).map((row) => ({
        ...row,
        ambassador: row.ambassador || "Not Assigned",
        coordinator: row.coordinator || "Not Assigned",
        accountActive: <AccountStatusCell active={row.accountActive} />,
      })),
    [fostersView]
  );

  return (
    <div>
      <HeadingContainer>
        <Heading>{role === "management" ? "All Fosters" : "My Fosters Information"}</Heading>
        {role === "management" && (
          <Select
            value={fostersView}
            onChange={setFostersView}
            width="100px"
            options={[
              { label: "All", value: "all" },
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
          />
        )}
      </HeadingContainer>
      <Table columns={columns} rows={rows} />
    </div>
  );
}

const FostersContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 40px;
`;

function Fosters() {
  const {
    currentUser: { role },
  } = React.useContext(AuthContext);

  return (
    <DefaultBody>
      <FostersContainer>
        {(role === "ambassador" || role === "management") && <RepeatFosters />}
        {(role === "management" || role === "coordinator") && <AllFosters />}
      </FostersContainer>
    </DefaultBody>
  );
}

export default Fosters;
