import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AmbassadorSelect from "../components/AmbassadorSelect";
import CoordinatorSelect from "../components/CoordinatorSelect";
import DefaultBody from "../components/DefaultBody";
import Table from "../components/Table";
import TableCellButton from "../components/TableCellButton";
import { Colors, Typography } from "../components/Theme";
import { AuthContext } from "../contexts/AuthContext";
import { getPendingApplications } from "../services/application";
import ApplicationContext from "../contexts/ApplicationContext";

const Heading = styled.div`
  ${Typography.heading}
  margin-bottom: 30px;
`;

const CompletedCellContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

function CompletedActionItemsCell({ completed, id }) {
  const navigate = useNavigate();

  return (
    <CompletedCellContainer>
      {completed ? "Status updated" : "Waiting for update"}
      {completed ? (
        <TableCellButton
          color={Colors.salmon}
          onClick={() => navigate("/application", { state: { id } })}
        >
          Review
        </TableCellButton>
      ) : (
        <TableCellButton
          color={Colors.lightBlue}
          onClick={() => navigate("/application", { state: { id } })}
        >
          View
        </TableCellButton>
      )}
    </CompletedCellContainer>
  );
}

function PendingApplications() {
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

  const [rows, setRows] = React.useState();

  React.useEffect(() => {
    (async () => {
      getPendingApplications().then(({ data: { applications } }) =>
        setRows(
          applications.map((row) => ({
            ...row,
            ambassador:
              role === "ambassador" ? (
                (row.ambassador && row.ambassador.firstName) || "Not Assigned"
              ) : (
                <AmbassadorSelect
                  initialValue={row.ambassador && row.ambassador._id}
                  applicationId={row._id}
                />
              ),
            coordinator:
              role === "ambassador" ? (
                (row.coordinator && row.coordinator.firstName) || "Not Assigned"
              ) : (
                <CoordinatorSelect
                  initialValue={row.coordinator && row.coordinator._id}
                  applicationId={row._id}
                />
              ),
            completedActionItems: (
              <CompletedActionItemsCell completed={row.completedActionItems} id={row._id} />
            ),
            createdAt: new Date(row.createdAt).toLocaleDateString(),
          }))
        )
      );
    })();
  }, []);

  return (
    <DefaultBody>
      <Heading>Your Pending Applicants</Heading>
      <Table columns={columns} rows={rows} />
    </DefaultBody>
  );
}

export default PendingApplications;
