import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { PaulLawyers } from "../../layouts/utils/WebNavbar";
import { useEffect } from "react";
const PageNotFound = () => {
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
    <div className="w-full h-[100vh] flex flex-col gap-5 justify-center items-center">
      <PaulLawyers />
      <p className="md:mt-[60px] mt-10 md:text-[100px] text-[70px] max_sm:leading-[54px] text-[#252528] font-bold leading-[70px]">
        404
      </p>
      <p className="md:mt-[30px] md:text-[40px] font-semibold mt-5 text-[#252528] leading-[50px] text-[32px]">
        Page not found
      </p>
      <p className="md:mt-4 mt-3 md:text-[26px] font-normal text-[#6d6f77] text-center text-[22px]">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-[60px] max_md:mt-10">
        <Button
          className="btn-posnawr px-4 !max-w-[211px] z-[1]"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to homepage
          <span></span>
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
