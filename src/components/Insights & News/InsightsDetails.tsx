import { useNavigate, useParams } from "react-router-dom";
import { useFetchPost } from "../../api/auth/hooks";
import { useEffect, useState } from "react";
import { IMAGE_URL } from "../../api/config";

interface BackIconProps {
  onClick?: () => void;
  className?: string | undefined;
}

export const InsightsDetails = () => {
  const { newsid } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useFetchPost(newsid);
  const [name, setName] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [PostTitle, setPostTitle] = useState("");
  const [description, setDescription] = useState("");
  const [existImage, setExistImage] = useState<null | string>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) return;

    const post = data?.data.post;
    setName(post.name);
    setSelectedDateTime(post.date);
    setTags(post.tag || []);
    setPostTitle(post.title);
    setDescription(post.description);

    const image =
      post.media && post.media.length > 0 ? post.media[0].imageName : null;
    if (image) {
      setExistImage(image);
    }
  }, [isLoading, data?.data.post]);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/\s/g, ", ")
      .replace(",", "");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 tab:px-[42px] lg:px-6 lg:pt-[150px] mb:pt-[100px] pt-[40px] animate__animated animate__fadeIn">
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <BackIcon onClick={() => navigate(-1)} className="cursor-pointer" />
          <p className="lg:text-[20px] tab:text-[18px] text-[16px]  font-bold font-Montserrat text-black">
            Insights & News
          </p>
        </div>
        <div>
          <div className="relative h-[418px] flex flex-col items-end border border-[#00000033]">
            {!isLoaded && (
              <p
                style={{ transform: "translate(-50%,-50%)" }}
                className="absolute top-1/2 left-1/2"
              >
                <div className="loader border-t-2 border-black rounded-full w-5 h-5 mr-2 animate-spin"></div>
              </p>
            )}
            <img
              src={existImage ? (existImage.startsWith("http") ? existImage : `${IMAGE_URL}/${existImage}`) : ""}
              alt="PostImg"
              className={`w-full h-full min-h-[416px] object-contain transition-opacity duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setIsLoaded(true)}
            />

            <div
              className={`relative bottom-[52px] flex p-3 md:py-[13px] md:px-[17px] ${
                isLoading ? "" : "bg-[#3B3C43]"
              } min-h-[52px] justify-between items-center`}
            >
              <div className="text-[10px] font-Montserrat font-semibold text-white">
                {isLoading ? (
                  <LoadingSkeletons
                    className="max-w-sm w-[60px]"
                    count={1}
                  />
                ) : (
                  name
                )}
              </div>
              <span className="text-[10px] font-Montserrat font-semibold text-white mx-1">
                |
              </span>
              <div className="text-[10px] font-Montserrat font-semibold text-white">
                {isLoading ? (
                  <LoadingSkeletons
                    className="max-w-sm w-[60px]"
                    count={1}
                  />
                ) : (
                  formatDate(selectedDateTime)
                )}
              </div>
            </div>
          </div>
        </div>
        {isLoading ? (
          <LoadingSkeletons
            className="max-w-sm w-[103px]"
            count={1}
          />
        ) : (
          <div className="flex flex-wrap gap-[10px]">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="py-[5px] md:py-[6px] px-[10px] md:px-[17px] bg-[#f1f1f1] w-auto text-[12px] font-bold font-Montserrat"
              >
                {tag}
              </div>
            ))}
          </div>
        )}
        {isLoading ? (
          <LoadingSkeletons
            className="max-w-sm w-[200px]"
            count={1}
          />
        ) : (
          <p className="text-[18px] lg:text-[20px] font-semibold font-Montserrat text-black">
            {PostTitle}
          </p>
        )}
      </div>
      <div className="md:mt-[40px] mt-[30px]">
        {isLoading ? (
          <LoadingSkeletons
            className="max-w-sm w-[400px] mb-3"
            count={3}
          />
        ) : (
          <div className="quill-content">
            <p
              className="ql-editor !px-0 font-Montserrat description"
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          </div>
        )}
      </div>
    </div>
  );
};

const BackIcon: React.FC<BackIconProps> = ({ onClick, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    onClick={onClick}
    className={className}
  >
    <path
      d="M9.57031 18.07L3.50031 12L9.57031 5.92999"
      stroke="black"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 12L3.67 12"
      stroke="black"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.5 12L15.97 12"
      stroke="black"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LoadingSkeletons: React.FC<{
  className?: string;
  count?: number | null | undefined;
}> = ({ className, count }) => {
  const skeletonCount = count ?? 0;
  return (
    <>
      {Array(skeletonCount)
        .fill({})
        .map((_, idx) => (
          <div
            key={`skeleton-${idx}`}
            className="border-none flex gap-5 md:flex-nowrap flex-wrap"
          >
            <div role="status" className={className}>
              <div className="bg-slate-200 rounded-full w-full h-4"></div>
            </div>
          </div>
        ))}
    </>
  );
};
