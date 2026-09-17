import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

type E164Number = {
  __tag: "E164Number";
  value: string;
};

interface SelectMobileNumberProps {
  errMsg?: string | null;
  countryCode: any;
  phoneNumber?: E164Number | null;
  setMobileNumber: (number: E164Number | null) => void;
  isLoading?: boolean | undefined;
}

const SelectMobileNumber: React.FC<SelectMobileNumberProps> = ({
  errMsg,
  countryCode,
  phoneNumber,
  setMobileNumber,
  isLoading,
}) => {
  const handleChange = (number: string | undefined) => {
    if (number) {
      const newNumber: E164Number = { __tag: "E164Number", value: number };
      setMobileNumber(newNumber);
    } else {
      setMobileNumber(null);
    }
  };

  return (
    <PhoneInput
      disabled={isLoading}
      value={phoneNumber?.value || ""}
      onFocus={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      defaultCountry={countryCode ?? "AU"}
      onBlur={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className={`border focus:!outline-none focus:!ring-0 md:h-[60px] h-[50px] w-full p-[10px] ${
        errMsg ? "border-[#CC000D]" : "border-black border-opacity-20"
      }`}
      onChange={handleChange}
      error={
        errMsg ||
        (phoneNumber
          ? isValidPhoneNumber(phoneNumber.value)
            ? undefined
            : "Invalid phone number"
          : "Phone number required")
      }
    />
  );
};

export default SelectMobileNumber;
