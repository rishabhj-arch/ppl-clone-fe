import React, { useState, useEffect } from "react";
import { format, addMonths, subMonths } from "date-fns";
// import { Button } from "@headlessui/react";

interface DatePickerProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
}

const DatePicker: React.FC<DatePickerProps> = ({
  onDateSelect,
  selectedDate,
}) => {
  const [SelectedDate, setSelectedDate] = useState<Date | null>(null);
  const [month, setMonth] = useState(new Date());

  const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const AUSTRALIA_SYDNEY_OFFSET = 11 * 60;

  const getSydneyTime = () => {
    const now = new Date();
    const utcOffset = now.getTimezoneOffset();
    const sydneyTime = new Date(
      now.getTime() + (AUSTRALIA_SYDNEY_OFFSET + utcOffset) * 60 * 1000
    );
    sydneyTime.setHours(0, 0, 0, 0);
    return sydneyTime;
  };

  const today = getSydneyTime();

  useEffect(() => {
    if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
      const selectedDateInSydney = new Date(
        selectedDate.getTime() + AUSTRALIA_SYDNEY_OFFSET * 60 * 1000
      );
      selectedDateInSydney.setHours(0, 0, 0, 0);
      if (selectedDateInSydney < today) {
        // const nextValidDate = new Date(today);
        // nextValidDate.setDate(today.getDate());
        setSelectedDate(selectedDate);
      } else {
        setSelectedDate(new Date(selectedDate));
      }
    } else {
      setSelectedDate(new Date(today));
    }
    // setMonth(today);
  }, [selectedDate]);

  //   const handleDateClick = (date: Date) => {
  //     const selectedDateInSydney = new Date(
  //       date.getTime() + AUSTRALIA_SYDNEY_OFFSET * 60 * 1000
  //     );
  //     selectedDateInSydney.setHours(0, 0, 0, 0);

  //     if (selectedDateInSydney >= today) {
  //       setSelectedDate(date);
  //     }
  //   };

  const handleMonthChange = (direction: "next" | "prev") => {
    setMonth(direction === "next" ? addMonths(month, 1) : subMonths(month, 1));
  };

  //   const handleDone = () => {
  //     if (SelectedDate) {
  //       onDateSelect(SelectedDate);
  //     }
  //   };

  const daysInMonth = (month: Date) => {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const days: (Date | null)[] = [];
    for (let i = 0; i < startOfMonth.getDay(); i++) days.push(null);
    for (let day = 1; day <= endOfMonth.getDate(); day++)
      days.push(new Date(month.getFullYear(), month.getMonth(), day));
    return days;
  };

  return (
    <div style={{ width: 451 }}>
      <div className="flex justify-between px-[10px]">
        <button type="button" onClick={() => handleMonthChange("prev")}>
          <PrevIcon />
        </button>
        <span>{format(month, "MMMM yyyy")}</span>
        <button type="button" onClick={() => handleMonthChange("next")}>
          <NextIcon />
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
        }}
      >
        {daysInWeek.map((day) => (
          <div
            key={day}
            className="py-[10px] font-Montserrat font-semibold text-[10px] text-[#3B3C43]"
          >
            {day}
          </div>
        ))}
        {daysInMonth(month).map((date, index) => (
          <div
            key={index}
            style={{
              padding: "10px 0",
              cursor:
                date &&
                new Date(
                  date.getTime() + AUSTRALIA_SYDNEY_OFFSET * 60 * 1000
                ) >= today
                  ? "pointer"
                  : "not-allowed",
              backgroundColor:
                date &&
                SelectedDate &&
                date.getDate() === SelectedDate.getDate() &&
                date.getMonth() === SelectedDate.getMonth()
                  ? "black"
                  : "",
              color:
                date &&
                SelectedDate &&
                date.getDate() === SelectedDate.getDate() &&
                date.getMonth() === SelectedDate.getMonth()
                  ? "white"
                  : "",
              border: "1px solid #7171714D",
              opacity:
                date &&
                new Date(date.getTime() + AUSTRALIA_SYDNEY_OFFSET * 60 * 1000) <
                  today
                  ? 0.5
                  : 1,
            }}
            onClick={() => {
              date && onDateSelect(date);
            }}
            className="font-Montserrat text-[14px] font-medium hover:bg-[#F1F1F1]"
          >
            {date ? date.getDate() : ""}
          </div>
        ))}
      </div>

      {/* <div className="w-full m-[10px]">
        <Button
          className={
            "w-[431px] h-[44px] border border-black bg-white text-black text-[16px] font-semibold font-Montserrat hover:bg-black hover:text-white hover:border-white"
          }
          onClick={handleDone}
        >
          DONE
        </Button>
      </div> */}
    </div>
  );
};

export default DatePicker;

const PrevIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 14 15"
    fill="none"
  >
    <path
      opacity="0.4"
      d="M7 14.2457C10.866 14.2457 14 11.1117 14 7.24573C14 3.37973 10.866 0.245728 7 0.245728C3.13401 0.245728 0 3.37973 0 7.24573C0 11.1117 3.13401 14.2457 7 14.2457Z"
      fill="#717171"
    />
    <path
      d="M9.45011 6.72075H5.81711L7.02111 5.51675C7.22411 5.31375 7.22411 4.97775 7.02111 4.77475C6.81811 4.57175 6.48211 4.57175 6.27911 4.77475L4.17911 6.87475C3.97611 7.07775 3.97611 7.41375 4.17911 7.61675L6.27911 9.71675C6.38411 9.82175 6.51711 9.87075 6.65011 9.87075C6.78311 9.87075 6.91611 9.82175 7.02111 9.71675C7.22411 9.51375 7.22411 9.17775 7.02111 8.97475L5.81711 7.77075H9.45011C9.73711 7.77075 9.97511 7.53275 9.97511 7.24575C9.97511 6.95875 9.73711 6.72075 9.45011 6.72075Z"
      fill="black"
    />
  </svg>
);

const NextIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 14 15"
    fill="none"
  >
    <path
      opacity="0.4"
      d="M7 14.2457C3.13401 14.2457 0 11.1117 0 7.24573C0 3.37973 3.13401 0.245728 7 0.245728C10.866 0.245728 14 3.37973 14 7.24573C14 11.1117 10.866 14.2457 7 14.2457Z"
      fill="#717171"
    />
    <path
      d="M4.54989 6.72075H8.18289L6.97889 5.51675C6.77589 5.31375 6.77589 4.97775 6.97889 4.77475C7.18189 4.57175 7.51789 4.57175 7.72089 4.77475L9.82089 6.87475C10.0239 7.07775 10.0239 7.41375 9.82089 7.61675L7.72089 9.71675C7.61589 9.82175 7.48289 9.87075 7.34989 9.87075C7.21689 9.87075 7.08389 9.82175 6.97889 9.71675C6.77589 9.51375 6.77589 9.17775 6.97889 8.97475L8.18289 7.77075H4.54989C4.26289 7.77075 4.02489 7.53275 4.02489 7.24575C4.02489 6.95875 4.26289 6.72075 4.54989 6.72075Z"
      fill="black"
    />
  </svg>
);
