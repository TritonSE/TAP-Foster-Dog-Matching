import React from "react";
import { nanoid } from "nanoid";
import TimeScheduling from "../components/TimeScheduling";
import DefaultBody from "../components/DefaultBody";
import { DataContext } from "../contexts/DataContext";

const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const getDayOfTheWeek = (date) => weekday[date.getDay()];
/**
 * Helper to return an object mapping each day of the week to an array of dates for the next 3 months (including the current month)
 *
 *  ex. {
 *        FRI : ['11/18/2022', '11/25/2022',...],
 *         MON: ['11/14/2022', '11/21/2022', ...],
 *         SAT: ['11/19/2022', '11/26/2022', ...]
 *        ...
 *      }
 *
 * @returns {Object} Object mapping each day of the week to an array of dates
 */
const everyDayOfTheWeek = () => {
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const nextNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 1);

  const daysOfTheWeek = {
    SUN: [],
    MON: [],
    TUE: [],
    WED: [],
    THU: [],
    FRI: [],
    SAT: [],
  };

  [today, nextMonth, nextNextMonth].forEach((date) => {
    const month = date.getMonth();

    while (date.getMonth() === month) {
      const dayOfTheWeek = getDayOfTheWeek(date);
      daysOfTheWeek[dayOfTheWeek].push(date.toLocaleDateString());
      date.setDate(date.getDate() + 1);
    }
  });
  return daysOfTheWeek;
};

/** Add NavBar and Header once merged */
function Calendar() {
  const { allAdmin } = React.useContext(DataContext);
  const [adminAvailability, setAdminAvailability] = React.useState([]);
  const allDaysOfTheWeek = React.useMemo(everyDayOfTheWeek, []);

  // Construct admin repeating admin schedule for the next 3 months
  React.useEffect(() => {
    if (allAdmin)
      setAdminAvailability(
        allAdmin.reduce((availabilities, admin) => {
          const result = [...availabilities];
          if (admin.schedule) {
            Object.entries(admin.schedule).forEach(([day, time]) => {
              if (time.length > 0) {
                allDaysOfTheWeek[day].forEach((date) => {
                  result.push({
                    _id: nanoid(),
                    date,
                    name: admin.firstName + " " + admin.lastName,
                    time,
                    role: admin.role.charAt(0).toUpperCase() + admin.role.slice(1),
                  });
                });
              }
            });
          }
          return result;
        }, [])
      );
  }, [allAdmin]);

  return (
    <DefaultBody>
      <TimeScheduling schedules={adminAvailability} />
    </DefaultBody>
  );
}

export default Calendar;
