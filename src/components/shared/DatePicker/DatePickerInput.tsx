import React, { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { Input } from "@headlessui/react";
import DatePicker from "./DatePicker";

interface DatePickerInputProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  dateError?: string | null;
  disabled?: boolean;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  selectedDate,
  setSelectedDate,
  dateError,
  disabled,
}) => {
  const date = selectedDate ? new Date(selectedDate) : null;
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date | null): string => {
    return date
      ? format(date, "dd MMM yyyy").replace(/\s/g, ", ").replace(",", "")
      : "";
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowPicker(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePicker = () => {
    setShowPicker((prev) => !prev);
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block", width: "100%" }}
    >
      <div
        className={`w-full flex justify-between bg-[#F1F1F1] items-center pr-[14px] ${dateError ? "border border-[#CC000D]" : ""
          }`}
      >
        <Input
          type="text"
          value={formatDate(selectedDate ? selectedDate : new Date())}
          placeholder="Date"
          disabled={disabled}
          readOnly
          onClick={() => setShowPicker((prev) => !prev)}
          className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"} bg-[#F1F1F1] w-full h-[50px] p-4 focus:outline-none focus:ring-0 text-[14px] font-Montserrat font-medium`}
        />
        <DatePickerIcon
          onClick={() => {
            if (disabled) return
            else {
              togglePicker()
            }
          }}
          className={`${selectedDate ? "text-[#0C192B]" : "text-[#717171]"
            } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        />
      </div>

      {showPicker && (
        <div
          ref={pickerRef}
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            zIndex: 1000,
            marginTop: "8px",
            background: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <DatePicker onDateSelect={handleDateSelect} selectedDate={date} />
        </div>
      )}
    </div>
  );
};

export default DatePickerInput;

const DatePickerIcon: React.FC<{ onClick: () => void; className: string }> = ({
  onClick,
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    onClick={onClick}
    className={className}
  >
    <path
      d="M19.5885 8.33462H2.41154C2.03077 8.33462 1.73462 8.63077 1.73462 9.01154V18.9538C1.73462 20.0538 2.62308 20.9423 3.72308 20.9423H18.2769C19.3769 20.9423 20.2654 20.0538 20.2654 18.9538V9.01154C20.2654 8.63077 19.9692 8.33462 19.5885 8.33462ZM7.7 17.6C7.7 17.9808 7.40385 18.2769 7.02308 18.2769H5.71154C5.33077 18.2769 5.03462 17.9808 5.03462 17.6V16.2885C5.03462 15.9077 5.33077 15.6115 5.71154 15.6115H7.02308C7.40385 15.6115 7.7 15.9077 7.7 16.2885V17.6ZM12.3115 17.6C12.3115 17.9808 12.0154 18.2769 11.6346 18.2769H10.3231C9.94231 18.2769 9.64616 17.9808 9.64616 17.6V16.2885C9.64616 15.9077 9.94231 15.6115 10.3231 15.6115H11.6346C12.0154 15.6115 12.3115 15.9077 12.3115 16.2885V17.6ZM12.3115 12.9885C12.3115 13.3692 12.0154 13.6654 11.6346 13.6654H10.3231C9.94231 13.6654 9.64616 13.3692 9.64616 12.9885V11.6769C9.64616 11.2962 9.94231 11 10.3231 11H11.6346C12.0154 11 12.3115 11.2962 12.3115 11.6769V12.9885ZM16.9654 12.9885C16.9654 13.3692 16.6692 13.6654 16.2885 13.6654H14.9769C14.5962 13.6654 14.3 13.3692 14.3 12.9885V11.6769C14.3 11.2962 14.5962 11 14.9769 11H16.2885C16.6692 11 16.9654 11.2962 16.9654 11.6769V12.9885ZM18.2769 3.04615H16.6269V2.36923C16.6269 1.65 16.0346 1.05769 15.3154 1.05769C14.5962 1.05769 14.0038 1.65 14.0038 2.36923V3.04615H8.03847V2.36923C8.03847 1.65 7.44616 1.05769 6.72693 1.05769C6.0077 1.05769 5.41539 1.65 5.41539 2.36923V3.04615H3.72308C2.62308 3.04615 1.73462 3.93462 1.73462 5.03462V5.71154C1.73462 6.09231 2.03077 6.38846 2.41154 6.38846H19.6308C20.0115 6.38846 20.3077 6.09231 20.3077 5.71154V5.03462C20.2654 3.93462 19.3769 3.04615 18.2769 3.04615Z"
      fill="currentColor"
    />
  </svg>
);
