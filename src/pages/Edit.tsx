import { Button, Input } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useEditPost, useFetchPost } from "../api/auth/hooks";
import { Navbar } from "../layouts/utils/Navbar";
import ImageUpload from "../components/shared/ImageUpload";
import { ErrorIcon } from "../components/createNew/CreateNew";
import DatePickerInput from "../components/shared/DatePicker/DatePickerInput";
import InputTag, { normalizeTags } from "../components/shared/InputTag";
import { TextEditor } from "../components/shared/TextEditor";
import { IMAGE_URL } from "../api/config";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const Edit = () => {
  const { newsid } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [uploadedImageFile, setUploadedImageFile] = useState<null | File>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEnable,setIsEnable] = useState<boolean>(false)

  const [dateTimeError, setDateTimeError] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagsError, setTagsError] = useState<string | null>(null);
  const { data, isLoading } = useFetchPost(newsid);
  const [existImage, setExistImage] = useState<null | string>(null);
  const [imageSize, setImageSize] = useState<string | null>(null);

  const { mutate: EditPost, isLoading: isEditPost } = useEditPost();

  useEffect(() => {
    if (isLoading) return;

    const post = data?.data.post;
    if(post?.status === "PUBLISHED"){
      setIsEnable(true);
    }

    handleDateChange(new Date(post.date));
    setDescription(post.description);
    setSelectedDate(post.date);
    setName(post.name);
    setTitle(post.title);
    setTags(normalizeTags(post.tag || []));

    const image =
      post.media && post.media.length > 0 ? post.media[0].imageName : null;
    if (image) {
      setExistImage(image);
    }
  }, [isLoading, data?.data.post,isEnable]);

  const handleRemoveImage = () => {
    setUploadedImageFile(null);
    setExistImage(null);
  };

  const onSubmit = () => {
    const postId = data?.data.post._id;
    if (!name || name.replace(/<[^>]+>/g, "").trim().length === 0) {
      setNameError("Please enter your name");
      return;
    } else {
      setNameError(null);
    }

    if (!title || title.replace(/<[^>]+>/g, "").trim().length === 0) {
      setTitleError("Please enter title");
      return;
    } else {
      setTitleError(null);
    }

    if (description || description.length > 0) {
      const addDescription = description.replace(/<[^>]+>/g, "").trim();
      if (!addDescription || addDescription.length === 0) {
        setDescriptionError("Please enter description");
        return;
      }
    } else {
      setDescriptionError(null);
    }

    const currentDateTimeInSydney = new Date();
    const currentDateInSydney = new Date(
      currentDateTimeInSydney.toLocaleString("en-US", {
        timeZone: "Australia/Sydney",
      })
    );

    if (selectedDate) {
      const selectedDateInSydney = new Date(
        selectedDate.toLocaleString("en-US", { timeZone: "Australia/Sydney" })
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

      if ((selectedDateOnly < currentDateOnly) && !isEnable) {
        setDateTimeError("The scheduled date must be today or in the future.");
        return;
      } else {
        setDateTimeError(null);
      }
    } else {
      setDateTimeError("Please select a date");
      return;
    }

    if (tags.length === 0) {
      setTagsError("Please add tag");
    } else {
      setTagsError(null);
    }

    if (!uploadedImageFile && !existImage) {
      setImageError("Please upload image");
      return;
    } else {
      setImageError(null);
    }

    if (
      nameError ||
      titleError ||
      descriptionError ||
      dateTimeError ||
      tagsError ||
      imageError
    ) {
      return;
    }

    const submitEdit = async () => {
      let imageUrl: File | string | null = existImage;

      if (uploadedImageFile) {
        try {
          const options = {
            maxSizeMB: 5,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
          const compressedFile = await imageCompression(uploadedImageFile, options);
          imageUrl = new File([compressedFile], uploadedImageFile.name, {
            type: uploadedImageFile.type,
          });
        } catch (err) {
          console.log("Error compressing image", err);
          setImageError("Error compressing image");
          return;
        }
      }

      EditPost(
      {
        postId,
        data: {
          imageName: imageUrl,
          description: description,
          date: selectedDate?.toLocaleString("en-US", {
            timeZone: "Australia/Sydney",
          }),
          tag: tags,
          name: name.trim(),
          title: title.trim(),
          status: status,
        },
      },
      {
        onSuccess: () => {
          navigate(-1);
        },
        onError: (err: any) => {
          toast.error(err?.data, {
            position: "bottom-right",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        },
      }
    );
    };

    submitEdit();
  };

  const handleSetTags = (newTags: string[]) => {
    const uniqueTags = normalizeTags(newTags);
    setTags(uniqueTags);
    if (uniqueTags.length > 0) {
      setTagsError(null);
    }
  };

  const handleDateChange = (date: Date | null) => {
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

      if ((selectedDateOnly.getTime() === currentDateOnly.getTime()) || isEnable) {
        setSelectedDate(date);
        setDateTimeError("");
        setStatus("PUBLISHED");
      } else if (selectedDateInSydney > currentDateInSydney) {
        setDateTimeError("");
        setSelectedDate(date);
        setStatus("SCHEDULED");
      }
      //  else if (isEnable) {
      //   setDateTimeError("The scheduled date must be today or in the future.");
      // }
    } else {
      setDateTimeError("Please select a valid date.");
    }
  };

  const handleDescription = (description: string) => {
    setDescription(description);
    if (description) {
      setDescriptionError(null);
    }
  };

  return (
    <div className="w-full max-h-screen overflow-auto animate__animated animate__fadeIn">
      <div>
        <Navbar
          title="EDIT"
          src={true}
          onClick={() => navigate("/admin/dashboard")}
        />
      </div>
      <div>
        {isLoading && (
          <div className="h-[calc(100vh-91px)] flex justify-center items-center">
            <div className="loader border-t-2 border-black rounded-full w-5 h-5 mr-2 animate-spin"></div>
          </div>
        )}
        {!isLoading && (
          <>
            <div className="mx-5 mt-[30px]">
              <ImageUpload
                onFileUpload={(file) => {
                  setUploadedImageFile(file);
                  setImageError(null);
                }}
                disabled={isLoading}
                error={imageError || imageSize}
                imageName={existImage}
                imageUrl={
                  existImage
                    ? (existImage.startsWith("http") ? existImage : `${IMAGE_URL}/${existImage}`)
                    : uploadedImageFile
                    ? URL.createObjectURL(uploadedImageFile)
                    : null
                }
                onRemoveImage={handleRemoveImage}
                setImageSize={setImageSize}
              />
              {imageSize
                ? imageSize && (
                    <div className="flex mt-2 gap-[5px]">
                      <ErrorIcon />
                      <p className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                        {imageSize}
                      </p>
                    </div>
                  )
                : imageError && (
                    <div className="flex mt-2 gap-[5px]">
                      <ErrorIcon />
                      <p className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                        {imageError}
                      </p>
                    </div>
                  )}
            </div>
            <div className="flex flex-col gap-[21px] mt-5">
              <div className="mx-5 flex gap-5">
                <div className="flex flex-col w-full">
                  <Input
                    className={`bg-[#F1F1F1] w-full h-[50px] p-4 focus:outline-none focus:ring-0 text-[14px] font-Montserrat font-medium ${
                      nameError ? "border border-[#CC000D]" : ""
                    }`}
                    type="text"
                    placeholder="Name"
                    value={name}
                    disabled={isEditPost}
                    onChange={(e) => {
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
                    selectedDate={selectedDate}
                    setSelectedDate={handleDateChange}
                    dateError={dateTimeError}
                    disabled={isEditPost || isEnable}
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
                    disabled={isEditPost}
                    onChange={(e) => {
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
                    isLoading={isEditPost}
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
                    disabled={isEditPost}
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
                <Button
                  onClick={() => {
                    if (isEditPost) return;
                    onSubmit();
                  }}
                  disabled={isEditPost}
                  className={`
                            w-[201px] h-[50px] border flex justify-center items-center border-black bg-white text-black text-[16px] font-semibold font-Montserrat 
                            ${
                              isEditPost
                                ? "hover:bg-white hover:text-black hover:border-black"
                                : "hover:bg-black hover:text-white hover:border-white"
                            }
                        `}
                >
                  {isEditPost ? (
                    <div className="loader border-t-2 border-black rounded-full w-5 h-5 mr-2 animate-spin"></div>
                  ) : (
                    "SAVE"
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Edit;
