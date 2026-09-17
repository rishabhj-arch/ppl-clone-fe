import { Button } from "@headlessui/react";

interface LogoutProps {
  onCancel: () => void;
  onAction: () => void;
  isLoading?: boolean | undefined;
  title?: string | null;
  descriptionLine1?: string | null;
  confirmButtonText?: string | null;
}

const Modal: React.FC<LogoutProps> = ({
  onCancel,
  onAction,
  isLoading,
  title,
  descriptionLine1,
  confirmButtonText,
}) => {
  return (
    <div className="w-[374px]">
      <div>
        <p className="font-semibold font-Montserrat text-black text-[20px] text-center px-[50px] pt-[20px] pb-[10px]">
          {title}
        </p>
      </div>
      <div className="px-[47px] pb-[24px]">
        <p className="text-[16px] font-Montserrat font-medium text-[#3B3C43] text-center">
          {descriptionLine1}
        </p>
      </div>
      <div className="pb-[10px] flex justify-between px-[10px]">
        <Button
          onClick={onCancel}
          className={
            "w-[177px] h-[50px] px-14 py-[15px] font-Montserrat text-[16px] text-[#717171] font-semibold hover:text-black hover:bg-[#F1F1F1]"
          }
        >
          CANCEL
        </Button>
        <Button
          onClick={onAction}
          disabled={isLoading}
          className={`
                            w-[177px] h-[50px] border flex justify-center items-center border-black bg-white text-black text-[16px] font-semibold font-Montserrat 
                            ${
                              isLoading
                                ? "hover:bg-white hover:text-black hover:border-black"
                                : "hover:bg-black hover:text-white hover:border-white"
                            }
                        `}
        >
          {isLoading ? (
            <div className="loader border-t-2 border-black rounded-full w-5 h-5 mr-2 animate-spin"></div>
          ) : (
            confirmButtonText
          )}
        </Button>
      </div>
    </div>
  );
};

export default Modal;
