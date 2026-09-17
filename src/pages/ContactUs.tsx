import {
  Button,
  Checkbox,
  Field,
  Input,
  Label,
  Textarea,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import {
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { ErrorIcon } from "../components/createNew/CreateNew";
import SelectMobileNumber from "../components/shared/SelectMobileNumber";
import SelectMenu from "../components/shared/SelectMenu";
import { useContactUs } from "../api/auth/hooks";
import { AddressIcon, EmailIcon, PhoneIcon } from "../components/page/Footer";
import { toast } from "react-toastify";
import axios from "axios";

interface E164Number {
  __tag: "E164Number";
  value: string;
}

export const ContactUs = () => {
  const [contactMethods, setContactMethods] = useState({
    telephone: false,
    email: false,
  });
  const [formData, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    referredBy: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    referredBy: "",
    referredToLawyer: "",
    contactMethods: "",
  });
  const { mutate: ContactUs, isLoading } = useContactUs();
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mobileNumber, setMobileNumber] = useState<E164Number | null>(null);
  const [countryCode, setCountryCode] = useState<string | "AU">("AU");
  const [mobileNumberError, setMobileNumberError] = useState<string | null>(
    null
  );

  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response: { data: { country_code?: string } }) => {
        const data = response.data;
        if (data.country_code) {
          setCountryCode(data.country_code);
        }
      })
      .catch(() => {
        console.log("Unable to determine the visitor's country.");
      });
  };

  useEffect(() => {
    getGeoInfo();
  }, []);

  const handleContactMethodChange = (method: "telephone" | "email") => {
    setContactMethods((prev) => {
      const updatedMethods = { ...prev, [method]: !prev[method] };

      if (updatedMethods.telephone || updatedMethods.email) {
        setErrors((prevErrors) => ({ ...prevErrors, contactMethods: "" }));
      }

      return updatedMethods;
    });
  };

  useEffect(() => {
    const buttons: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll(".btn-posnawr");

    const handleMouseMove = (e: MouseEvent) => {
      const button = e.currentTarget as HTMLButtonElement;
      const parentRect: DOMRect = button.getBoundingClientRect();
      const relX: number = e.clientX - parentRect.left;
      const relY: number = e.clientY - parentRect.top;
      const span = button.getElementsByTagName("span");

      if (span.length > 0) {
        span[0].style.top = `${relY}px`;
        span[0].style.left = `${relX}px`;
      }
    };

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", handleMouseMove);
      button.addEventListener("mouseout", handleMouseMove);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", handleMouseMove);
        button.removeEventListener("mouseout", handleMouseMove);
      });
    };
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  useEffect(() => {
    if (selectedOption) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ["referredToLawyer"]: "",
      }));
    }
  }, [selectedOption]);

  const validate = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      referredBy: "",
      referredToLawyer: "",
      contactMethods: "",
    };
    if (!formData.firstName?.trim()) {
      newErrors.firstName = "Please enter firstName";
    } else if (!/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(formData.firstName.trim())) {
      newErrors.firstName = "Only alphabetic characters are allowed";
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = "Please enter lastName";
    } else if (!/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(formData.lastName?.trim())) {
      newErrors.lastName = "Only alphabetic characters are allowed";
    }
    if (!formData.email?.trim()) {
      newErrors.email = "Please enter email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email?.trim())
    ) {
      newErrors.email = "Invalid email address";
    }
    if (!mobileNumber?.value?.trim()) {
      setMobileNumberError("Please enter telephone number");
    } else if (!isValidPhoneNumber(mobileNumber.value?.trim())) {
      setMobileNumberError("Invalid telephone number");
    }
    if (!formData.message?.trim()) newErrors.message = "Please enter message";
    if (!formData.referredBy?.trim())
      newErrors.referredBy = "Please enter referred to us";
    if (!selectedOption)
      newErrors.referredToLawyer =
        "Please select referred to a particular lawyer";
    if (!(contactMethods.telephone || contactMethods.email)) {
      newErrors.contactMethods = "Please select at least one contact method";
    }

    setErrors(newErrors);
    const formElement = document.querySelector(".contact-form-div");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    return Object.values(newErrors).every((error) => !error);
  };

  const validatePhoneNumber = (number: string | null) => {
    if (!number || !isValidPhoneNumber(number)) {
      setMobileNumberError("Invalid telephone number");
      return false;
    }
    setMobileNumberError(null);
    return true;
  };

  const onSubmit = () => {
    if (!validate() || !validatePhoneNumber(mobileNumber?.value || "")) return;

    const preferredContactMethod = [];
    if (contactMethods.telephone) preferredContactMethod.push("Telephone");
    if (contactMethods.email) preferredContactMethod.push("Email");

    const phoneNumber = mobileNumber?.value || "";

    const formDataToSubmit = {
      "First Name": formData.firstName,
      "Last Name": formData.lastName,
      Email: formData.email,
      "Referred By": formData.referredBy,
      Message: formData.message,
      Telephone: formatPhoneNumberIntl(phoneNumber),
      "Referred To Lawyer": selectedOption,
      "Preferred Contact Method":
        preferredContactMethod.length > 0 ? preferredContactMethod : null,
    };

    ContactUs(formDataToSubmit, {
      onSuccess: () => {
        setContactMethods({
          telephone: false,
          email: false,
        });
        setSelectedOption("");
        setMobileNumber(null);
        setFormdata({
          firstName: "",
          lastName: "",
          email: "",
          referredBy: "",
          message: "",
        });
        setIsSubmitted(true);
        toast.success("Your request was successfully submitted.", {
          position: "bottom-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      },
    });
  };

  const selectOption = [
    { id: 1, value: "Yes, I was referred to Hugo Paul." },
    { id: 2, value: "Current or former client of Paul & Paul Lawyers" },
    { id: 3, value: "Internet search" },
    { id: 4, value: "Advertisement or marketing" },
    { id: 5, value: "NSW Law Society" },
  ];

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="contactUs">
        <div className="flex flex-col items-center gap-[30px]">
          <p className="lg:text-[30px] tab:text-[25px] text-[20px] mx-[34px] text-center font-bold font-Montserrat text-[#FFFFFF]">
            “Family Law, Wills & Estates and Private Advisory”
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-[42px] lg:px-[42px] xl:px-6 xl:pt-[150px] md:pt-[100px] pt-[60px]">
        <div className="contact-form-div flex xl:gap-5 lg:gap-[15px] lg:justify-center md:gap-[10px] md:flex-wrap md:justify-center justify-center gap-5 flex-col md:flex-row">
          <div className="flex flex-col items-center xl:px-[107px] pb-[56px] pt-[44px] lg:pl-[70px] lg:pr-[69px] md:pl-[65px] md:pr-[64px] bg-[#E3E3E3] justify-center gap-[27px] xl:max-w-[396px] lg:min-w-[302px] lg:max-w-[302px] md:min-w-[292px] md:max-w-[292px] h-[195px]">
            <a href="mailto:info@pplawyers.com.au">
              <EmailIcon className="w-[37px] cursor-pointer" />
            </a>
            <a
              href="mailto:info@pplawyers.com.au"
              className="lg:text-[20px] text-[18px] font-Montserrat font-semibold text-black"
            >
              info@pplawyers.com.au
            </a>
          </div>
          <div className="flex flex-col items-center xl:px-[130px] pb-[56px] pt-[44px] lg:px-[90px] md:[85px] bg-[#E3E3E3] justify-center gap-[27px] xl:max-w-[396px] lg:min-w-[302px] lg:max-w-[302px] md:min-w-[292px] md:max-w-[292px] h-[195px]">
            <a href="tel:0280053039">
              <PhoneIcon className="w-[31px]" />
            </a>
            <a
              href="tel:0280053039"
              className="lg:text-[20px] text-[18px] font-Montserrat font-semibold text-black"
            >
              02 8202 9202
            </a>
          </div>
          <div className="flex flex-col items-center xl:px-[56px] xl:py-[44px] md:pt-[44px] lg:px-[25px] md:px-5 md:pb-[46px] bg-[#E3E3E3] justify-between xl:max-w-[396px] lg:min-w-[302px] lg:max-w-[302px] md:min-w-[292px] md:max-w-[292px] px-[69px] py-[44px] h-[195px]">
            <AddressIcon className="w-[33px]" />
            <p className="lg:text-[20px] text-[18px] font-Montserrat font-semibold text-black text-center">
              Level 13, 111 Elizabeth Street, Sydney, NSW 2000
            </p>
          </div>
        </div>
        <div className="xl:pt-[60px] md:pt-[40px] pt-[30px]">
          <form className="flex flex-col gap-[30px]">
            <div className="flex gap-5 md:flex-nowrap flex-wrap">
              <Field className="flex flex-col gap-[10px] w-full">
                <Label className="lg:text-[20px] mb:text-[16px] text-[14px] font-semibold font-Montserrat text-black">
                  firstName*
                </Label>
                <Input
                  className={`border focus:outline-none focus:ring-0 md:h-[60px] h-[50px] w-full p-[10px] ${
                    errors.firstName
                      ? "border-[#CC000D]"
                      : "border-black border-opacity-20"
                  }`}
                  type="text"
                  value={formData.firstName}
                  autoComplete="off"
                  onChange={(e) => {
                    handleChange(
                      "firstName",
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1)
                    );
                  }}
                  disabled={isLoading}
                  pattern="^[a-zA-Z]+$"
                />
                {errors.firstName && (
                  <div className="flex gap-[5px]">
                    <ErrorIcon />
                    <span className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                      {errors.firstName}
                    </span>
                  </div>
                )}
              </Field>
              <Field className="flex flex-col gap-[10px] w-full">
                <Label className="lg:text-[20px] mb:text-[16px] text-[14px] font-semibold font-Montserrat text-black">
                  lastName*
                </Label>
                <Input
                  className={`border focus:outline-none focus:ring-0 md:h-[60px] h-[50px] w-full p-[10px] ${
                    errors.lastName
                      ? "border-[#CC000D]"
                      : "border-black border-opacity-20"
                  }`}
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleChange(
                      "lastName",
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1)
                    )
                  }
                  pattern="^[a-zA-Z]+$"
                  autoComplete="off"
                  disabled={isLoading}
                />
                {errors.lastName && (
                  <div className="flex gap-[5px]">
                    <ErrorIcon />
                    <span className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                      {errors.lastName}
                    </span>
                  </div>
                )}
              </Field>
            </div>
            <div className="flex gap-5 md:flex-nowrap flex-wrap">
              <Field className="flex flex-col gap-[10px] w-full">
                <Label className="lg:text-[20px] mb:text-[16px] text-[14px] font-semibold font-Montserrat text-black">
                  Email*
                </Label>
                <Input
                  className={`border focus:outline-none focus:ring-0 md:h-[60px] h-[50px] w-full p-[10px] ${
                    errors.email
                      ? "border-[#CC000D]"
                      : "border-black border-opacity-20"
                  }`}
                  type="email"
                  autoComplete="off"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={isLoading}
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                />
                {errors.email && (
                  <div className="flex gap-[5px]">
                    <ErrorIcon />
                    <span className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                      {errors.email}
                    </span>
                  </div>
                )}
              </Field>
              <div className="flex flex-col gap-[10px] w-full">
                <label
                  htmlFor="telephone"
                  className="lg:text-[20px] mb:text-[16px] text-[14px] font-semibold font-Montserrat text-black"
                >
                  Telephone*
                </label>
                <SelectMobileNumber
                  errMsg={mobileNumberError}
                  phoneNumber={mobileNumber}
                  setMobileNumber={(number) => {
                    setMobileNumber(number);
                    setMobileNumberError(null);
                  }}
                  countryCode={countryCode}
                  isLoading={isLoading}
                />
                {mobileNumberError && (
                  <div className="flex gap-[5px]">
                    <ErrorIcon />
                    <span className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                      {mobileNumberError}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-5 md:flex-nowrap flex-wrap">
              <Field className="flex flex-col gap-[10px] w-full">
                <Label className="lg:text-[20px] mb:text-[16px] text-[14px] font-semibold font-Montserrat text-black">
                  Were you referred to us? If so, who referred you?*
                </Label>
                <Input
                  className={`border focus:outline-none focus:ring-0 md:h-[60px] h-[50px] w-full p-[10px] ${
                    errors.referredBy
                      ? "border-[#CC000D]"
                      : "border-black border-opacity-20"
                  }`}
                  type="text"
                  value={formData.referredBy}
                  autoComplete="off"
                  disabled={isLoading}
                  onChange={(e) => handleChange("referredBy", e.target.value)}
                />
                {errors.referredBy && (
                  <div className="flex gap-[5px]">
                    <ErrorIcon />
                    <span className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                      {errors.referredBy}
                    </span>
                  </div>
                )}
              </Field>
              <Field className="flex flex-col gap-[10px] w-full">
                <Label className="lg:text-[20px] mb:text-[16px] text-[14px] font-semibold font-Montserrat text-black">
                  Were you referred to a particular lawyer? If so, who?*
                </Label>
                <SelectMenu
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  option={selectOption}
                  isLoading={isLoading}
                  error={errors.referredToLawyer}
                />
                {errors.referredToLawyer && (
                  <div className="flex gap-[5px]">
                    <ErrorIcon />
                    <span className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                      {errors.referredToLawyer}
                    </span>
                  </div>
                )}
              </Field>
            </div>
            <div className="flex gap-5 md:flex-nowrap flex-wrap">
              <Field className="w-full flex flex-col gap-[10px] ">
                <div className="flex flex-col gap-[20px] ">
                  <p className="lg:text-[20px] mb:text-[16px] text-[14px] font-semibold font-Montserrat text-black">
                    Would you prefer to be contacted by:*
                  </p>
                  <div className="flex gap-[30px]">
                    <div className="flex gap-[25px] items-center">
                      <Checkbox
                        name="telephone"
                        checked={contactMethods.telephone}
                        onChange={() => handleContactMethodChange("telephone")}
                        disabled={isLoading}
                        className={`group flex justify-center cursor-pointer focus:outline-none focus:ring-0 items-center md:size-9 size-[30px] border-2 ${
                          errors.contactMethods
                            ? "border-[#CC000D] border-opacity-50"
                            : "border-black border-opacity-20"
                        } bg-white data-[checked]:bg-black`}
                      >
                        <CheckboxIcon />
                      </Checkbox>
                      <p
                        className={
                          "lg:text-[20px] mb:text-[18px] text-[16px] font-semibold font-Montserrat text-[#3B3C43]"
                        }
                      >
                        Telephone
                      </p>
                    </div>
                    <div className="flex gap-[25px] items-center">
                      <Checkbox
                        name="email"
                        checked={contactMethods.email}
                        onChange={() => handleContactMethodChange("email")}
                        disabled={isLoading}
                        className={`group flex justify-center cursor-pointer focus:outline-none focus:ring-0 items-center md:size-9 size-[30px] border-2 ${
                          errors.contactMethods
                            ? "border-[#CC000D] border-opacity-50"
                            : "border-black border-opacity-20"
                        } bg-white data-[checked]:bg-black`}
                      >
                        <CheckboxIcon />
                      </Checkbox>
                      <p
                        className={
                          "lg:text-[20px] mb:text-[18px] text-[16px] font-semibold font-Montserrat text-[#3B3C43]"
                        }
                      >
                        Email
                      </p>
                    </div>
                  </div>
                </div>
                {errors.contactMethods && (
                  <div className="flex gap-[5px]">
                    <ErrorIcon />
                    <span className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                      {errors.contactMethods}
                    </span>
                  </div>
                )}
              </Field>
            </div>
            <div className="flex gap-5 md:flex-nowrap flex-wrap">
              <Field className="flex flex-col gap-[10px] w-full">
                <Label className="lg:text-[20px] mb:text-[16px] text-[14px] font-semibold font-Montserrat text-black">
                  Message*
                </Label>
                <Textarea
                  className={`border focus:outline-none focus:ring-0 xl:min-h-[192px] lg:min-h-[176px] md:min-h-[185px] min-h-[164px] w-full p-[10px] ${
                    errors.message
                      ? "border-[#CC000D]"
                      : "border-black border-opacity-20"
                  }`}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  disabled={isLoading}
                />
                {errors.message && (
                  <div className="flex gap-[5px]">
                    <ErrorIcon />
                    <span className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                      {errors.message}
                    </span>
                  </div>
                )}
              </Field>
            </div>
            <div className="w-full flex justify-center mt-[10px]">
              <Button
                type="button"
                className="btn-posnawr z-[1]"
                disabled={isLoading || isSubmitted}
                onClick={onSubmit}
              >
                {isSubmitted ? "SEND" : isLoading ? "Submitting..." : "SEND"}
                <span></span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const CheckboxIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
  >
    <path
      d="M7.58203 13L10.7137 16.1316C10.7791 16.1969 10.8851 16.197 10.9505 16.1316L18.4154 8.66669"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
