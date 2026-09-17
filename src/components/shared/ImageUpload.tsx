import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";

interface ImageUploadDProps {
  onFileUpload: (file: File) => void;
  disabled?: boolean;
  error?: string | null;
  imageUrl?: string | null;
  onRemoveImage?: () => void;
  imageName?: string | null;
  setImageSize: (size: string | null) => void;
}

interface CloseIconProps {
  className?: string;
}

const fileTypes = ["PNG", "JPG", "JPEG"];
const ImageUpload: React.FC<ImageUploadDProps> = ({
  onFileUpload,
  disabled,
  error,
  imageUrl,
  onRemoveImage,
  imageName,
  setImageSize,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const handleChange = (fileList: FileList) => {
    const selectedFile = fileList[0];
    if (selectedFile.size > 10000000) {
      setImageSize("file is too large (max 10MB)");
      return;
    }
    setImageSize(null);
    setFile(selectedFile);
    onFileUpload(selectedFile);
  };

  const handleRemoveFile = () => {
    if (onRemoveImage) {
      onRemoveImage();
    }
    setFile(null);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="flex flex-col">
      <div>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          onTypeError={(err : any) => {
            toast.error(err ,{
              position: "bottom-right",
              autoClose: 2000,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }}
          style={{ marginTop: 0 }}
          disabled={file || disabled || imageUrl}
        >
          <div
            className={`${file || imageUrl ? "p-0" : "p-[18px]"} ${
              error ? "border-[#CC000D]" : "border-[#8c90a5] border-opacity-30"
            } flex flex-col items-center justify-center text-center min-h-[170px] cursor-pointer border-2 border-dashed rounded-md`}
          >
            {file || imageUrl ? (
              <>
                {isFullScreen && (file || imageUrl) && (
                  <div
                    style={{
                      position: "fixed",
                      top: "0",
                      left: "0",
                      width: "100vw",
                      height: "100vh",
                      backgroundColor: "rgb(101 101 101 / 73%)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: "99999",
                    }}
                    onClick={toggleFullScreen}
                  >
                    <div className="flex items-start gap-[10px]">
                      <div>
                        <img
                          src={imageUrl ? imageUrl : ""}
                          alt="Preview"
                          style={{
                            maxWidth: "90vw",
                            maxHeight: "90vh",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <button onClick={() => setIsFullScreen(false)}>
                        <FullscreenCloseIcon className="w-10" />
                      </button>
                    </div>
                  </div>
                )}

                <div
                  className="cursor-pointer w-full"
                  onClick={toggleFullScreen}
                >
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : imageUrl
                        ? imageUrl
                        : ""
                    }
                    alt="Preview"
                    className="h-[170px] w-full object-cover rounded-md"
                  />
                </div>
              </>
            ) : (
              <div className="flex gap-5">
                <UploadImageIcon className="mb-6" />
                <div>
                  <div className="text-[14px] font-normal font-Montserrat text-black">
                    Drag & Drop your image here
                    <br />
                    <div className="flex text-[14px] font-normal font-Montserrat">
                      <p className="text-[#3B3C43] mr-1 font-normal">or</p>
                      <span className="border-b border-black">
                        Click to browse
                      </span>
                    </div>
                  </div>
                  <p className="text-[#3B3C43] text-[10px] font-Montserrat font-normal text-start mt-1">
                    *Maximum upload file size: 10MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </FileUploader>
      </div>
      <div className="flex justify-between mt-[19px]">
        {(file || imageName) && (
          <>
            <div>{file?.name || imageName}</div>
            <button
              onClick={handleRemoveFile}
              className="w-[25px] h-[25px] flex justify-center items-center group hover:bg-[#717171]"
            >
              <CloseIcon className="w-5 rounded-md text-black group-hover:text-white" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;

const CloseIcon: React.FC<CloseIconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
      fill="currentColor"
    />
  </svg>
);

const FullscreenCloseIcon: React.FC<CloseIconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="37"
    height="37"
    viewBox="0 0 37 37"
    fill="none"
    className={className}
  >
    <rect width="37" height="37" fill="black" />
    <path
      d="M12.3597 12.3597C11.8801 12.8394 11.8801 13.617 12.3597 14.0967L16.763 18.5L12.3597 22.9034C11.8801 23.383 11.8801 24.1607 12.3597 24.6403C12.8394 25.1199 13.617 25.1199 14.0967 24.6403L18.5 20.2369L22.9034 24.6403C23.383 25.1199 24.1607 25.1199 24.6403 24.6403C25.1199 24.1607 25.1199 23.383 24.6403 22.9034L20.2369 18.5L24.6403 14.0967C25.1199 13.6171 25.1199 12.8394 24.6403 12.3598C24.1606 11.8801 23.383 11.8801 22.9034 12.3598L18.5 16.763L14.0967 12.3597C13.617 11.8801 12.8394 11.8801 12.3597 12.3597Z"
      fill="white"
    />
  </svg>
);

const UploadImageIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="49"
    height="50"
    viewBox="0 0 49 50"
    fill="none"
    className={className}
  >
    <path d="M3.69946 13.975H27.8075V41.275H3.69946V13.975Z" fill="#717171" />
    <path d="M6.39453 16.7H25.137V33.075H6.39453V16.7Z" fill="white" />
    <path
      d="M9.06494 30.35H13.5239L11.2944 26.25L9.06494 30.35ZM17.9829 22.15L13.5239 30.35H22.4664L17.9829 22.15Z"
      fill="black"
    />
    <path
      d="M30.5025 30.35V34.425L46.648 26.35L36.5295 5.22501L24.4265 11.225H29.694L35.4515 8.37501L41.552 21.05L30.5025 26.575V30.35Z"
      fill="#717171"
    />
  </svg>
);
