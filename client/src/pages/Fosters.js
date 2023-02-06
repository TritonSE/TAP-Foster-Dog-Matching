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
import { getPendingApplications } from "../services/application";
import { getUsers } from "../services/users";
import { getAdmin } from "../services/admins"
import { useNavigate } from "react-router-dom";

// const { currentUser, signedIn } = React.useContext(AuthContext);

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

  const navigate = useNavigate();


  return (
    <SpacedCellContainer>
      {completed ? "Status updated" : "Waiting for update"}
      {role === "management" &&
        (completed ? (
          <CellButton color={Colors.salmon} onClick={() => navigate("/application")}>Review</CellButton>
        ) : (
          <CellButton color={Colors.lightBlue} onClick={() => navigate("/application")}>View</CellButton>
        ))}
    </SpacedCellContainer>
  );
}

function RepeatFosters() {
  // const {
  //   currentUser: { role },
  // } = React.useContext(AuthContext);

  const { currentUser, signedIn } = React.useContext(AuthContext);
  const [repeatApplications, setRepeatApplications] = React.useState([]);

  React.useEffect(() => {
    getPendingApplications().then((applications) => {
      setRepeatApplications(applications.data.applications)
    })
  }, [currentUser])

  // console.log(repeatApplications)

  const repeatFosters = repeatApplications.map((application) => {
    return {
      firstName: application.firstName,
      createdAt: application.updatedAt,
      status: application.status,
      ambassador: application.ambassador ? application.ambassador : "not yet assigned",
      coordinator: application.coordinator ? application.coordinator : "not yet assigned",
      completedActionItems: application.completedActionItems,
      _id: application._id
    }
  })

  console.log(repeatFosters)

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
        repeatFosters.map((row) => ({
          ...row,
          ambassador:
            currentUser.role === "ambassador" ? (
              row.ambassador.firstName || "Not Assigned"
            ) : (
              // TODO: doesn't work until real data is used
              <AmbassadorSelect
                initialValue={row.ambassador && row.ambassador._id}
                applicationId={row._id}
              />
            ),
          coordinator:
            currentUser.role === "ambassador" ? (
              row.coordinator.firstName || "Not Assigned"
            ) : (
              // TODO: doesn't work until real data is used
              <CoordinatorSelect
                initialValue={row.coordinator && row.coordinator._id}
                applicationId={row._id}
              />
            ),
          completedActionItems: <CompletedActionItemsCell completed={row.completedActionItems} />,
        })),
      [repeatFosters]
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
  const { currentUser, signedIn } = React.useContext(AuthContext);
  const [users, setUsers] = React.useState([]);
  const [fostersView, setFostersView] = React.useState("all");


  React.useEffect(() => {
    getUsers().then((users) => {
      console.log(users)
      users.data.applications.forEach((user) => {
        if(user.ambassador){
          getAdmin(user.ambassador).then((admin) => {
            if(admin.data.errors){
              user.ambassadorObj = {}
              user.ambassadorObj.firstName = "N/A"
            }
            else{
              user.ambassadorObj = admin.data.admin
            }
            if(user.coordinator){
              if(admin.data.errors){
                user.coordinatorObj = {}
                user.coordinatorObj.firstName = "N/A"
              }
              else{
                user.coordinatorObj = admin.data.admin
              }
            }
          })
        }
        
      })
      setUsers(users.data.applications)    
    })
  }, [currentUser])

  console.log(users)
  
  const userRow = users.map((user) => {

    return {
      firstName: user.firstName,
      lastActive: user.lastActive,
      accountActive: user.accountActive,
      currentlyFostering: user.currentlyFostering ? "Yes" : "No",
      pastFosters: user.fosters.past.length,
      ambassador: user.ambassadorObj ? user.ambassadorObj.firstName : "N/A",
      coordinator: user.coordinatorObj ? user.coordinatorObj.firstName : "N/A",
    }
  })

  const finished = userRow

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
      userRow.filter((foster) => {
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
    [fostersView, finished]
  );

  return (
    <div>
      <HeadingContainer>
        <Heading>{currentUser.role === "management" ? "All Fosters" : "My Fosters Information"}</Heading>
        {currentUser.role === "management" && (
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
