import { Button } from "@headlessui/react";

interface NavbarProps {
  title: string;
  src?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
  src,
  className,
  onClick,
}) => {
  return (
    <div
      className={`w-full h-full border-b border-[#717171] border-opacity-[10%] ${
        className || ""
      }`}
    >
      <div className="flex items-center my-[30px] ml-5 gap-5">
        {src && (
          <Button
            onClick={onClick}
            className={
              "hover:bg-[#717171] w-[32px] h-[32px] flex justify-center items-center group"
            }
          >
            <ArrowIcon className="cursor-pointer text-black group-hover:text-white" />
          </Button>
        )}
        <p className="font-semibold font-Montserrat text-black text-[20px]">
          {title}
        </p>
      </div>
    </div>
  );
};

const ArrowIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M9.56982 18.07L3.49982 12L9.56982 5.92999"
      stroke="currentColor"
      stroke-width="2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 12L3.67 12"
      stroke="currentColor"
      stroke-width="2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20.5 12L15.97 12"
      stroke="currentColor"
      stroke-width="2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
