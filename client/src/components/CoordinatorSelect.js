/**
 * Coordinator Select Component
 *
 * Used on: PendingApplications, Fosters
 *
 * Props:
 *  - initialValue - the initial value of the select
 *  - applicationId - application id to update on change
 *
 */
import React from "react";
import { DataContext } from "../contexts/DataContext";
import { updateApplication } from "../services/application";
import Select from "./Select";

function CoordinatorSelect({ initialValue, applicationId }) {
  const { allCoordinators } = React.useContext(DataContext);
  const [value, setValue] = React.useState(initialValue);

  const options = React.useMemo(
    () =>
      allCoordinators &&
      allCoordinators.map(({ firstName, _id }) => ({ label: firstName, value: _id })),
    [allCoordinators]
  );

  const handleSelect = React.useCallback((val) => {
    setValue(val);
    updateApplication(applicationId, { coordinator: val });
  }, []);

  return <Select value={value} options={options} onChange={handleSelect} placeholder="N/A" />;
}

export default CoordinatorSelect;
