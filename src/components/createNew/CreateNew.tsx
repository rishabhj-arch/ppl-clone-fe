import { Input } from "@headlessui/react";
import imageCompression from "browser-image-compression";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreatePost } from "../../api/auth/hooks";
import { Navbar } from "../../layouts/utils/Navbar";
import DatePickerInput from "../shared/DatePicker/DatePickerInput";
import ImageUpload from "../shared/ImageUpload";
import InputTag, { normalizeTags } from "../shared/InputTag";
import { TextEditor } from "../shared/TextEditor";

export const CreateNew = () => {
  const navigate = useNavigate();
  const { mutate: createPost, isLoading } = useCreatePost();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("PUBLISHED");
  const [uploadedImageFile, setUploadedImageFile] = useState<null | File>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    new Date()
  );
  const [tags, setTags] = useState<string[]>([]);

  const [imageError, setImageError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [tagsError, setTagsError] = useState<string | null>(null);
  const [dateTimeError, setDateTimeError] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const Goback = () => {
    navigate("/admin/dashboard");
  };

  const onSubmit = async () => {
    setSubmitting(true);
    setNameError(null);
    setTitleError(null);
    setDescriptionError(null);
    setDateTimeError(null);
    setTagsError(null);
    setImageError(null);

    let hasError = false;

    if (!name || name.replace(/<[^>]+>/g, "").trim().length === 0) {
      setNameError("Please enter your name");
      hasError = true;
    }

    if (!title || title.replace(/<[^>]+>/g, "").trim().length === 0) {
      setTitleError("Please enter title");
      hasError = true;
    }

    if (
      !description ||
      description.replace(/<[^>]+>/g, "").trim().length === 0
    ) {
      setDescriptionError("Please enter description");
      hasError = true;
    }

    if (!selectedDateTime) {
      setDateTimeError("Please select date");
      hasError = true;
    }

    if (tags.length === 0) {
      setTagsError("Please add tag");
      hasError = true;
    }

    if (!uploadedImageFile) {
      setImageError("Please upload an image");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const options = {
      maxSizeMB: 5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const formData = new FormData();
    if (uploadedImageFile) {
      try {
        const compressedFile = await imageCompression(
          uploadedImageFile,
          options
        );
        const newFile = new File([compressedFile], uploadedImageFile.name, {
          type: uploadedImageFile.type,
        });
        formData.append("imageName", newFile);
      } catch (err: unknown) {
        console.log(err);
        setImageError("Error compressing image");
        return;
      }
    }
    formData.append("description", description);
    formData.append("name", name.trim());
    formData.append("title", title.trim());
    formData.append("status", status);
    if (selectedDateTime) {
      formData.append(
        "date",
        selectedDateTime.toLocaleString("en-US", {
          timeZone: "Australia/Sydney",
        })
      );
    }
    tags.forEach((tag) => {
      formData.append("tag", tag);
    });

    createPost(formData, {
      onSuccess: () => {
        navigate(-1);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (err: any) => {
        toast.error(err?.data, {
          position: "bottom-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  const handleSetTags = (newTags: string[]) => {
    setSubmitting(false);
    const uniqueTags = normalizeTags(newTags);
    setTags(uniqueTags);
    if (uniqueTags.length > 0) {
      setTagsError(null);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSubmitting(false);
    setDateTimeError("");
    const currentDateTimeInSydney = new Date();
    const currentDateInSydney = new Date(
      currentDateTimeInSydney.toLocaleString("en-US", {
        timeZone: "Australia/Sydney",
      })
    );

    if (date) {
      const selectedDateInSydney = new Date(
        date.toLocaleString("en-US", { timeZone: "Australia/Sydney" })
      );

      const currentDateOnly = new Date(
        currentDateInSydney.getFullYear(),
        currentDateInSydney.getMonth(),
        currentDateInSydney.getDate()
      );
      const selectedDateOnly = new Date(
        selectedDateInSydney.getFullYear(),
        selectedDateInSydney.getMonth(),
        selectedDateInSydney.getDate()
      );

      if (selectedDateOnly.getTime() === currentDateOnly.getTime()) {
        setSelectedDateTime(date ? date : new Date());
        setDateTimeError("");
        setStatus("PUBLISHED");
      } else if (selectedDateInSydney > currentDateInSydney) {
        setSelectedDateTime(date ? date : new Date());
        setStatus("SCHEDULED");
      } else {
        setDateTimeError("The scheduled date must be today or in the future.");
      }
    } else {
      setDateTimeError("Please select a valid date.");
    }
  };

  const handleDescription = (description: string) => {
    setSubmitting(false);
    setDescription(description);
    if (description) {
      setDescriptionError(null);
    }
  };

  return (
    <div className="w-full max-h-screen overflow-auto animate__animated animate__fadeIn">
      <div>
        <Navbar title="CREATE NEW" src={true} onClick={Goback} />
      </div>
      <div>
        <div className="mx-5 mt-[30px]">
          <ImageUpload
            onFileUpload={(file) => {
              setUploadedImageFile(file);
              setImageError(null);
              setSubmitting(false);
            }}
            disabled={isLoading}
            error={imageError || imageSize}
            imageUrl={
              uploadedImageFile ? URL.createObjectURL(uploadedImageFile) : ""
            }
            onRemoveImage={() => setUploadedImageFile(null)}
            setImageSize={setImageSize}
          />
        </div>
        {imageSize
          ? imageSize && (
              <div className="flex ml-5 mt-2 gap-[5px]">
                <ErrorIcon />
                <p className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                  {imageSize}
                </p>
              </div>
            )
          : imageError && (
              <div className="flex ml-5 mt-2 gap-[5px]">
                <ErrorIcon />
                <p className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                  {imageError}
                </p>
              </div>
            )}
      </div>
      <div
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   if (!isFormValid || isLoading) return;
        //   onSubmit();
        // }}
        className="flex flex-col gap-[21px] mt-5"
      >
        <div className="mx-5 flex gap-5">
          <div className="flex flex-col w-full">
            <Input
              className={`bg-[#F1F1F1] w-full h-[50px] p-4 focus:outline-none focus:ring-0 text-[14px] font-Montserrat font-medium ${
                nameError ? "border border-[#CC000D]" : ""
              }`}
              type="text"
              placeholder="Name"
              value={name}
              disabled={isLoading}
              autoComplete="off"
              onChange={(e) => {
                setSubmitting(false);

                setName(e.target.value);
                if (e.target.value) {
                  setNameError(null);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
            {nameError && (
              <div className="flex mt-2 gap-[5px]">
                <ErrorIcon />
                <p className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                  {nameError}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col w-full">
            <DatePickerInput
              selectedDate={selectedDateTime}
              setSelectedDate={handleDateChange}
              dateError={dateTimeError}
              disabled={isLoading}
            />
            {dateTimeError && (
              <div className="flex mt-2 gap-[5px]">
                <ErrorIcon />
                <p className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                  {dateTimeError}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mx-5 flex gap-5">
          <div className="flex flex-col w-full">
            <Input
              className={`bg-[#F1F1F1] w-full h-[50px] p-4 focus:outline-none focus:ring-0 text-[14px] font-Montserrat font-medium ${
                titleError ? "border border-[#CC000D]" : ""
              }`}
              type="text"
              placeholder="Title"
              value={title}
              autoComplete="off"
              disabled={isLoading}
              onChange={(e) => {
                setSubmitting(false);
                setTitle(e.target.value);
                if (e.target.value.trim()) {
                  setTitleError(null);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
            {titleError && (
              <div className="flex mt-2 gap-[5px]">
                <ErrorIcon />
                <p className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                  {titleError}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col w-full">
            <InputTag
              tags={tags}
              setTags={handleSetTags}
              error={tagsError}
              isLoading={isLoading}
            />
            {tagsError && (
              <div className="flex mt-2 gap-[5px]">
                <ErrorIcon />
                <p className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                  {tagsError}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="mx-5 bg-[#F1F1F1] border-0">
            <TextEditor
              value={description}
              setValue={handleDescription}
              error={descriptionError}
              disabled={isLoading}
            />
          </div>
          {descriptionError && (
            <div className="flex mx-5 mt-2 gap-[5px]">
              <ErrorIcon />
              <p className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                {descriptionError}
              </p>
            </div>
          )}
        </div>
        <div className="m-5 mt-0 flex justify-end">
          <div className="m-5 mt-0 flex justify-end">
            <button
              onClick={() => {
                if (isLoading || submitting) return;
                onSubmit();
              }}
              disabled={isLoading}
              className={`w-[201px] h-[50px] flex justify-center items-center border border-black bg-white text-black text-[16px] font-semibold font-Montserrat ${
                !isLoading
                  ? "hover:bg-black hover:text-white hover:border-white"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <div className="loader border-t-2 border-black rounded-full w-5 h-5 mr-2 animate-spin"></div>
              ) : (
                "CREATE"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9ZM9 13.3125C9.31065 13.3125 9.5625 13.0606 9.5625 12.75V8.25C9.5625 7.93935 9.31065 7.6875 9 7.6875C8.68935 7.6875 8.4375 7.93935 8.4375 8.25V12.75C8.4375 13.0606 8.68935 13.3125 9 13.3125ZM9 5.25C9.41422 5.25 9.75 5.58579 9.75 6C9.75 6.41421 9.41422 6.75 9 6.75C8.58577 6.75 8.25 6.41421 8.25 6C8.25 5.58579 8.58577 5.25 9 5.25Z"
      fill="#CC000D"
    />
  </svg>
);
