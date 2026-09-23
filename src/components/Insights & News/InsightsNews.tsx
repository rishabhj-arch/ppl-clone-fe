import { useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useSearchData } from "../../api/auth/hooks";
import { NoDataIcon } from "../page/PostData";
import { IMAGE_URL } from "../../api/config";

interface InsightsNewsProps {
  Title?: string;
  className?: string;
  PAGE_PER_LIMIT?: number;
  onClick?: () => void;
  Skeletons?: number | null;
  currentPage?: number;
  loadingMore?: boolean;
  setloadingMore?: (loading: boolean | undefined) => void;
}

interface Media {
  imageName: string;
}

interface Post {
  _id: string;
  idx: number;
  actionType: string;
  name: string;
  date: string;
  title: string;
  tag: string[];
  media: Media[];
}

type UserPostData = Post[] | null;

export const InsightsNews: React.FC<InsightsNewsProps> = ({
  Title,
  className,
  PAGE_PER_LIMIT,
  onClick,
  Skeletons,
  currentPage,
  loadingMore,
  setloadingMore,
}) => {
  const [search] = useState("");
  const [debouncedSearch] = useState(search);
  const status = "PUBLISHED";
  const navigate = useNavigate();
  const currentPageSkip = currentPage || 1;
  const pageLimit = PAGE_PER_LIMIT || 3;
  const { data, isLoading, refetch } = useSearchData(
    debouncedSearch,
    pageLimit,
    currentPageSkip,
    status
  );

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const posts: UserPostData = data?.data.post || null;
  const totalPosts = data?.data.totalPosts || 0;

  useEffect(() => {
    refetch();
  }, []);

  const [PostsData, setAllPosts] = useState<Post[]>([]);

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

  useEffect(() => {
    if (posts) {
      setAllPosts((prevPosts) => {
        const existingIds = new Set(prevPosts.map((post) => post._id));
        const newUniquePosts = posts.filter(
          (post) => !existingIds.has(post._id)
        );
        if (newUniquePosts.length > 0) {
          setloadingMore && setloadingMore(false);
        }
        return currentPageSkip === 1
          ? posts
          : [...prevPosts, ...newUniquePosts];
      });
    }
  }, [posts, currentPageSkip, setloadingMore]);

  // const formatName = (name: string) => {
  //   return name.length > 8 ? name.slice(0, 8) + "...." : name;
  // };

  const formatTitle = (title: string) => {
    return title.length > 60 ? title.slice(0, 60) + "...." : title;
  };

  const hasMorePosts = PostsData.length < totalPosts;

  useEffect(() => {
    if (hasMorePosts && !loadingMore) {
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
    }
  }, [hasMorePosts, loadingMore]);

  return (
    <div className="flex flex-col pt-[60px] xl:pt-[150px] lg:pt-[100px] md:pt-[100px] px-[20px] mx-auto max-w-7xl sm:px-6 lg:px-[44px] md:px-[42px] xl:px-6 w-full animate__animated animate__fadeIn">
      <div className="text-center">
        <h2 className="text-[18px] mb:text-[20px] tab:text-[30px] lg:text-[40px] font-Montserrat font-bold">
          Insights & News
        </h2>
      </div>
      <div className="mt-[40px] md:mt-[60px] lg:mt-[80px]">
        {isLoading ? (
          <div className="text-[#717171] text-[18px] md:text-[20px] font-semibold font-Montserrat text-center mt-4">
            <LoadingSkeletons count={Skeletons} />
          </div>
        ) : PostsData && PostsData.length > 0 ? (
          <div
            className={`${
              PostsData.length < 3
                ? "flex flex-wrap justify-center gap-5"
                : "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 xl:gap-y-[60px] lg:gap-y-[50px] justify-center justify-items-center"
            }`}
          >
            {PostsData.map((data, idx) => {
              const image =
                data.media && data.media.length > 0
                  ? data.media[0].imageName
                  : null;
              return (
                <div key={idx} className="max-w-[396px] w-full">
                  <div className="relative w-full overflow-hidden bg-[#f5f5f5]">
                    {!isLoaded && (
                      <p
                        style={{ transform: "translate(-50%,-50%)" }}
                        className="absolute top-1/2 left-1/2"
                      >
                        <div className="loader border-t-2 border-black rounded-full w-5 h-5 mr-2 animate-spin"></div>
                      </p>
                    )}
                    <img
                      src={image ? (image.startsWith("http") ? image : `${IMAGE_URL}/${image}`) : ""}
                      alt="PostImg"
                      className={`block w-full h-auto cursor-pointer object-contain transition-opacity duration-500 ${
                        isLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      onClick={() =>
                        navigate(`/insights-&-news-details/${data._id}`)
                      }
                      onLoad={() => setIsLoaded(true)}
                    />
                  </div>
                  <div className="flex w-full items-center justify-between gap-3 bg-[#3B3C43] px-3 py-3 md:px-[17px] md:py-[13px] lg:px-5 lg:py-4">
                    <p className="min-w-0 truncate text-[9px] tab:text-[10px] lg:text-[12px] text-white font-Montserrat font-semibold">
                      {data.name}
                    </p>
                    <p className="shrink-0 text-[9px] tab:text-[10px] lg:text-[12px] text-white font-Montserrat font-semibold whitespace-nowrap">
                      {formatDate(data.date)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-[10px] mt-[10px]">
                    {data.tag.map((tag, index) => (
                      <div
                        key={index}
                        className="py-[5px] md:py-[6px] px-[10px] md:px-[17px] bg-[#f1f1f1] w-auto text-[6.76px] tab:text-[8px] lg:text-[10px] font-bold font-Montserrat"
                      >
                        {tag.toUpperCase()}
                      </div>
                    ))}
                  </div>
                  <p
                    className="mt-[10px] xl:mt-5 md:mt-[10px] text-[12px] lg:text-[18px] tab:text-[14px] font-medium font-Montserrat cursor-pointer truncate"
                    onClick={() =>
                      navigate(`/insights-&-news-details/${data._id}`)
                    }
                  >
                    {formatTitle(data.title)}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <NoDataIcon />
            <div className="text-[#717171] text-[20px] text-center font-semibold font-Montserrat">
              No Insights & News available
            </div>
          </div>
        )}
        {loadingMore && (
          <div className="text-[#717171] text-[18px] md:text-[20px] font-semibold font-Montserrat text-center mt-4">
            <LoadingSkeletons count={Skeletons} />
          </div>
        )}
      </div>
      <div className="flex justify-center items-center mt-[40px] md:mt-[60px]">
        {hasMorePosts && !loadingMore && (
          <Button className={className} onClick={onClick} disabled={isLoading}>
            {Title}
            <span></span>
          </Button>
        )}
      </div>
    </div>
  );
};

const LoadingSkeletons: React.FC<{ count: number | null | undefined }> = ({
  count,
}) => {
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
            <div className="insights-skeleton">
              <div className="skeleton-right">
                <div className="square"></div>
              </div>
              <div className="skeleton-left">
                <div className="line h17 w40 m10"></div>
                <div className="line"></div>
                <div className="line  w75"></div>
              </div>
            </div>
            <div className="insights-skeleton">
              <div className="skeleton-right">
                <div className="square"></div>
              </div>
              <div className="skeleton-left">
                <div className="line h17 w40 m10"></div>
                <div className="line"></div>
                <div className="line  w75"></div>
              </div>
            </div>
            <div className="insights-skeleton">
              <div className="skeleton-right">
                <div className="square"></div>
              </div>
              <div className="skeleton-left">
                <div className="line h17 w40 m10"></div>
                <div className="line"></div>
                <div className="line  w75"></div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
