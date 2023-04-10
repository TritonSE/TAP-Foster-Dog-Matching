import React from "react";
import { useNavigate } from "react-router-dom";
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
import { getAdmin } from "../services/admins";

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
          <CellButton color={Colors.salmon} onClick={() => navigate("/application")}>
            Review
          </CellButton>
        ) : (
          <CellButton color={Colors.lightBlue} onClick={() => navigate("/application")}>
            View
          </CellButton>
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
      setRepeatApplications(applications.data.applications);
    });
  }, [currentUser]);

  const repeatFosters = repeatApplications.map((application) => {
    const date = new Date(application.updatedAt);
    application.updatedAt = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    return {
      firstName: application.firstName,
      createdAt: application.updatedAt,
      status: application.status,
      ambassador: application.ambassador ? application.ambassador : "not yet assigned",
      coordinator: application.coordinator ? application.coordinator : "not yet assigned",
      completedActionItems: application.completedActionItems,
      _id: application._id,
    };
  });

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
      repeatFosters.map((row) => ({
        ...row,
        ambassador:
          currentUser.role === "ambassador" ? (
            row.ambassador.firstName || "Not Assigned"
          ) : (
            <AmbassadorSelect
              initialValue={row.ambassador && row.ambassador._id}
              applicationId={row._id}
            />
          ),
        coordinator:
          currentUser.role === "ambassador" ? (
            row.coordinator.firstName || "Not Assigned"
          ) : (
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
      <TableCellButton color="#8DC442">View Profile</TableCellButton>
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
  const [ambassadorDone, setAmbassadorDone] = React.useState(false);
  const [coordinatorDone, setCoordinatorDone] = React.useState(false);

  React.useEffect(() => {
    getUsers().then((data) => {
      setUsers(data.data.applications);
    });
  }, [currentUser]);

  React.useEffect(() => {
    if (users.length > 0) {
      const promises = users
        .filter((user) => user.ambassador != null)
        .map((user) =>
          getAdmin(user.ambassador._id)
            .then((admin) => {
              if (admin.data.errors) {
                user.ambassadorObj = { firstName: "N/A" };
              } else {
                user.ambassadorObj = admin.data.admin;
              }
            })
            .catch(() => {
              user.ambassadorObj = { firstName: "N/A" };
            })
        );
      Promise.allSettled(promises).then(() => {
        setAmbassadorDone(true);
      });
    }
  }, [users]);

  React.useEffect(() => {
    console.log(users);
    if (users.length > 0) {
      const promises = users
        .filter((user) => user.coordinator != null)
        .map((user) =>
          getAdmin(user.coordinator._id)
            .then((admin) => {
              if (admin.data.errors) {
                user.coordinatorObj = { firstName: "N/A" };
              } else {
                user.coordinatorObj = admin.data.admin;
              }
            })
            .catch(() => {
              user.coordinatorObj = { firstName: "N/A" };
            })
        );

      Promise.allSettled(promises).then(() => {
        setCoordinatorDone(true);
      });
    }
  }, [users]);

  const [userRow, setUserRow] = React.useState([]);

  React.useEffect(() => {
    if (ambassadorDone && coordinatorDone) {
      const row = users.map((user) => {
        const date = new Date(user.lastActive);
        user.lastActive = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
        return {
          firstName: user.firstName,
          lastActive: user.lastActive,
          accountActive: user.accountStatus === "active",
          currentlyFostering: user.currentlyFostering ? "Yes" : "No",
          pastFosters: user.pastFosters ?? 0,
          ambassador:
            typeof user.ambassadorObj !== "undefined" && user.ambassadorObj !== null
              ? user.ambassadorObj.firstName
              : "N/A",
          coordinator: user.coordinatorObj ? user.coordinatorObj.firstName : "N/A",
        };
      });
      setUserRow(row);
    }
  }, [ambassadorDone, coordinatorDone]);

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
      userRow
        .filter((foster) => {
          switch (fostersView) {
            case "active":
              return foster.accountActive;
            case "inactive":
              return !foster.accountActive;
            default:
              // fostersView is set to 'all'
              return true;
          }
        })
        .map((row) => ({
          ...row,
          ambassador: row.ambassador || "Not Assigned",
          coordinator: row.coordinator || "Not Assigned",
          accountActive: <AccountStatusCell active={row.accountActive} />,
        })),
    [fostersView, userRow]
  );

  return (
    <div>
      <HeadingContainer>
        <Heading>
          {currentUser.role === "management" ? "All Fosters" : "My Fosters Information"}
        </Heading>
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
