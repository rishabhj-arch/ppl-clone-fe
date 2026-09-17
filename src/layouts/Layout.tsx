import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "./utils/Sidebar";
import WebNavbar from "./utils/WebNavbar";
import { Footer } from "../components/page/Footer";
import { useDocumentTitle } from "../components/shared/helpers";
import { Button } from "@headlessui/react";
import { useEffect } from "react";

// Admin Panel Layout
export const Layout = () => {
  useDocumentTitle("Paul & Paul Lawyers Admin");
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/admin") {
      navigate("/admin/dashboard");
    }
  }, [navigate]);
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

// Website Layout
export const WebsiteLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useDocumentTitle("Paul & Paul Lawyers");

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
  const ShowSections = location.pathname === "/contact-us" || location.pathname === "/terms&use";
  return (
    <div>
      <WebNavbar />
      <Outlet />
      {!ShowSections && (
        <div className="mx-auto max-w-7xl px-5 tab:px-[42px] lg:px-6">
          <div className="bg-[#F1F1F1] xl:mx-0 xl:mt-[150px] sm:mt-[100px] mt-[60px] flex sm:justify-between justify-center items-center sm:flex-nowrap flex-wrap sm:gap-0 gap-10 px-[50px] md:py-[50px] py-10 sm:px-6 lg:px-[42px]">
            <div className="flex flex-col gap-[10px] xl:w-[452px] md:w-[352px] w-[290px] md:items-start items-center">
              <p className="lg:text-[40px] mb:text-[30px] text-[18px] font-bold font-Montserrat">
                Get in Touch
              </p>
              <p className="lg:text-[18px] mb:text-[14px] text-[12px] font-Montserrat font-medium md:text-start text-center">
                To contact Paul & Paul Lawyers
              </p>
            </div>
            <Button
              className="btn-posnawr z-[1]"
              onClick={() => {
                navigate("/contact-us");
              }}
            >
              CONTACT US
              <span></span>
            </Button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
