import { ScheduleMeeting } from "react-schedule-meeting";

export default function ShowAvailableTimeSlot({ setResidentFormData }) {
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let LastDayOfMonth = new Date(year, month, 0).getDate();
  let daysLeft = LastDayOfMonth - day;

  let availableTimeslots = [];
  function getAvailableTimeslots(dayOfWeek, dayCount) {
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      availableTimeslots.push({
        id: dayCount,
        startTime: new Date(
          new Date(
            new Date().setDate(new Date().getDate() + dayCount)
          ).setHours(9, 0, 0, 0)
        ),
        endTime: new Date(
          new Date(
            new Date().setDate(new Date().getDate() + dayCount)
          ).setHours(17, 0, 0, 0)
        ),
      });
    }
  }

  for (let dayCount = 0; dayCount <= daysLeft; dayCount++) {
    let dayOfWeek = new Date(
      new Date(new Date().setDate(new Date().getDate() + dayCount))
    ).getDay();

    getAvailableTimeslots(dayOfWeek, dayCount);
  }

  const handleDateChange = function (date) {
    setResidentFormData((prevData) => ({ ...prevData, date: date.startTime }));
  };

  return (
    <>
      <ScheduleMeeting
        borderRadius={50}
        primaryColor="#3f5b85"
        eventDurationInMinutes={30}
        availableTimeslots={availableTimeslots}
        onStartTimeSelect={handleDateChange}
        format_selectedDateDayTitleFormatString="ccc, LLLL do"
      />
    </>
  );
}
