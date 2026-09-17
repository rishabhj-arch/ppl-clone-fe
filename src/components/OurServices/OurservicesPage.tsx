import { Button } from "@headlessui/react";
import { Ourservices } from "./OurServices";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const OurservicesPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
      ".Btn-posnawr, .btn-posnawr"
    );

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
  return (
    <div className="animate__animated animate__fadeIn">
      <div className="main-Ourservices">
        <div className="flex flex-col items-center gap-[30px]">
          <p className="lg:text-[30px] tab:text-[25px] text-[20px] mx-[34px] text-center font-bold font-Montserrat text-[#FFFFFF]">
            “Family Law, Wills & Estates and Private Advisory”
          </p>
          <Button
            className="Btn-posnawr z-[1]"
            onClick={() => navigate("/contact-us")}
          >
            CONTACT US
            <span></span>
          </Button>
        </div>
      </div>
      <Ourservices />
    </div>
  );
};
