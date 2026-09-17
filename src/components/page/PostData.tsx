import { Button, Input } from "@headlessui/react";
import { Navbar } from "../../layouts/utils/Navbar";
import { SVGProps, useEffect, useRef, useState } from "react";
import { cn, columns } from "../shared/helpers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../shared/Table/PureTableComp";
import { useNavigate } from "react-router-dom";
import { useDeletePost, useSearchData } from "../../api/auth/hooks";
import ModalLayout from "../shared/ModalLayout";
import Modal from "../shared/Modal";
import { toast } from "react-toastify";

interface Post {
  _id: string;
  idx: number;
  actionType: string;
  name: string;
  date: string;
  title: string;
  status: string;
}

type UserPostData = Post[] | null;

const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      d="M17.5 4.9842C14.725 4.7092 11.9333 4.56754 9.15 4.56754C7.5 4.56754 5.85 4.65087 4.2 4.81754L2.5 4.9842"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.08331 4.14251L7.26665 3.05084C7.39998 2.25918 7.49998 1.66751 8.90831 1.66751H11.0916C12.5 1.66751 12.6083 2.29251 12.7333 3.05918L12.9166 4.14251"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.7084 7.61752L15.1667 16.0092C15.075 17.3175 15 18.3342 12.675 18.3342H7.32502C5.00002 18.3342 4.92502 17.3175 4.83335 16.0092L4.29169 7.61752"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.60834 13.7509H11.3833"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.91669 10.4175H12.0834"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      d="M11.05 3.00084L4.20835 10.2425C3.95002 10.5175 3.70002 11.0592 3.65002 11.4342L3.34169 14.1342C3.23335 15.1092 3.93335 15.7758 4.90002 15.6092L7.58335 15.1508C7.95835 15.0842 8.48335 14.8092 8.74168 14.5258L15.5834 7.28418C16.7667 6.03417 17.3 4.60918 15.4583 2.86751C13.625 1.14251 12.2334 1.75084 11.05 3.00084Z"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.90833 4.2092C10.2667 6.5092 12.1333 8.26753 14.45 8.50086"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.5 18.3342H17.5"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const PostData = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  // const [isReset, setIsReset] = useState(false);
  const [isOpen, setIsopen] = useState(false);
  const [postId, setPostId] = useState("");
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const PAGE_PER_LIMIT = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_PER_LIMIT;
  const [isDeletingPost, setIsDeletingPost] = useState(false);

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { data, isLoading, isFetching, isError } = useSearchData(
    debouncedSearch,
    PAGE_PER_LIMIT,
    currentPage,
    undefined,
    reloadTrigger
  );

  const { mutate: DeletePost } = useDeletePost();

  // useEffect(() => {
  //   if (!isReset && search.trim().length === 0) return;
  //   const handler = setTimeout(() => {
  //     setDebouncedSearch(search);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setReloadTrigger((prev) => prev + 1);
  };

  const totalPages = Math.ceil(data?.data.totalPosts / PAGE_PER_LIMIT);
  const totalPost = data?.data.totalPosts;

  const posts: UserPostData = data?.data.post;

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    setIsDeletingPost(false);
  }, [data]);

  const handleDeletePost = () => {
    if (!posts) return;
    setIsDeletingPost(true);
    DeletePost(postId, {
      onSuccess: () => {
        const isLastPageEmpty =
          currentPage === totalPages && posts.length === 1;
        if (isLastPageEmpty && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        } else {
          setReloadTrigger((prev) => prev + 1);
        }
        toast.success("Insights and news have been deleted.", {
          position: "bottom-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "w-[350px] right-[34px]",
        });
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
      onSettled: () => {
        setIsopen(false);
      },
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.startsWith(" ")) {
      value = value.trimStart();
    }
    setSearch(value);
  };

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

  const formatTitle = (title: string) => {
    return title.length > 51 ? title.slice(0, 51) + "...." : title;
  };

  const formatName = (title: string) => {
    return title.length > 16 ? title.slice(0, 16) + "...." : title;
  };

  const onClickCreate = () => {
    setSearch("");
    navigate("/admin/create");
  };

  const CloseIcon = (props: any) => (
    <svg
      {...props}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="1.75896"
        height="12.3127"
        transform="matrix(0.704451 -0.709753 0.704451 0.709753 0.0874023 1.24841)"
        fill="currentColor"
      />
      <rect
        width="1.75896"
        height="12.3127"
        transform="matrix(0.704451 0.709753 -0.704451 0.709753 8.67383 0.0125732)"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div className="w-full max-h-screen overflow-auto">
      <div>
        <Navbar title="INSIGHTS & NEWS" className="mt-[43px]" />
      </div>
      <div className="mx-5 mb-5 mt-[30px] flex gap-5">
        <div className="relative flex px-[13px] bg-[#F1F1F1] w-full h-[50px] items-center gap-4 cursor-pointer">
          <SearchIcon onClick={handleIconClick} />
          <Input
            ref={inputRef}
            className={
              "bg-[#F1F1F1] w-full h-full font-Montserrat focus:outline-none focus:ring-0"
            }
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search here..."
          />
          <button
            onClick={() => {
              setSearch("");
            }}
            className={cn(
              "p-[2px] absolute flex items-center right-0 top-0 w-[50px] h-full justify-center text-black hover:text-white hover:bg-[#717171]",
              search.length === 0 ? "hidden" : "flex"
            )}
          >
            <CloseIcon />
          </button>
        </div>
        <div>
          <Button
            className={
              "w-[201px] h-[50px] border border-black text-black text-[16px] font-Montserrat font-semibold bg-white hover:bg-black hover:text-white hover:border-white"
            }
            onClick={onClickCreate}
          >
            CREATE NEW
          </Button>
        </div>
      </div>
      <ModalLayout isOpen={isOpen}>
        <Modal
          onCancel={() => setIsopen(false)}
          onAction={handleDeletePost}
          // isLoading={isDeletePost}
          isLoading={isDeletingPost}
          title={"DELETE INSIGHTS & NEWS"}
          descriptionLine1={"Are your sure you want to delete?"}
          confirmButtonText={"DELETE"}
        />
      </ModalLayout>
      <div className="flex flex-col justify-between min-h-[calc(100vh-192px)]">
        <div className="mx-5">
          {isError && (
            <div className="w-full h-full flex justify-center items-center">
              <div className="flex flex-col items-center justify-center w-fit">
                <p className="text-lg mb-[20px]">Something Went Wrong</p>
                <button
                  className="bg-gray-500 px-4 py-2"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
          {!isError && (isLoading || isFetching) && <LoadingSkeletons />}
          {!isError &&
            !isLoading &&
            !isFetching &&
            posts &&
            posts.length > 0 && (
              <div className="rounded-md flex justify-between items-center gap-14">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((col) => (
                        <TableHead
                          key={col.key}
                          className={cn(
                            "text-[12px] font-medium font-Montserrat text-[#3B3C43]",
                            col.key === "more" && "w-[50px]"
                          )}
                        >
                          {col.title}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((data, idx) => (
                      <TableRow
                        key={`table-${idx}`}
                        className="border-none hover:bg-[#F1F1F1]"
                      >
                        <TableCell className="xl:w-14">
                          {totalPost - startIndex - idx}
                        </TableCell>
                        <TableCell className="xl:w-56 lg:w-14 !font-medium !font-Montserrat !text-[16px] !text-black">
                          {formatName(data.name)}
                        </TableCell>
                        <TableCell className="xl:w-56 lg:w-[134px] !font-medium !font-Montserrat !text-[16px] !text-black">
                          {formatDate(data.date)}
                        </TableCell>
                        <TableCell className="xl:w-auto lg:w-[300px] !font-medium !font-Montserrat !text-[16px] !text-black">
                          {formatTitle(data.title)}
                        </TableCell>
                        <TableCell className="xl:w-16">
                          {data.status === "PUBLISHED" ? (
                            <Published />
                          ) : (
                            <Scheduled />
                          )}
                        </TableCell>
                        <TableCell
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/admin/edit/${data._id}`);
                          }}
                          className="hover:bg-[#717171] group xl:w-[60px] cursor-pointer"
                        >
                          <Button
                            className={
                              "flex justify-center items-center w-full"
                            }
                          >
                            <EditIcon className="text-black group-hover:text-white" />
                          </Button>
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            setPostId(data._id);
                            setIsopen(true);
                          }}
                          className="group hover:bg-[#717171] xl:w-[60px] cursor-pointer"
                        >
                          <Button className="flex justify-center items-center w-full">
                            <DeleteIcon className="text-black group-hover:text-white" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          {!isError &&
            !isLoading &&
            !isFetching &&
            (!posts || posts.length === 0) && (
              <div className="flex flex-col justify-center items-center min-h-[79vh]">
                <NoDataIcon />
                <div className="text-[#717171] text-[20px] font-semibold font-Montserrat">
                  No data available
                </div>
              </div>
            )}
        </div>
        {totalPages > 1 && posts && posts.length > 0 && (
          <div className="flex justify-end mx-5 mb-5">
            {isLoading ? (
              <PaginationSkeletons />
            ) : (
              <>
                <div className="flex gap-[10px] items-center mt-5">
                  <h1 className="text-[#717171] font-normal text-[16px]">
                    Page
                  </h1>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    aria-label="Previous Page"
                    className="group hover:bg-[#717171] w-6 h-6 flex justify-center items-center"
                  >
                    <PreviewPageIcon className="text-black group-hover:text-white" />
                  </button>
                  <span className={cn("font-bold text-base text-black")}>
                    {currentPage}
                  </span>
                  <span className="text-[#717171]">of</span>
                  <span className="font-normal text-base text-[#717171] opacity-50 ">
                    {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    aria-label="Next Page"
                    className="group hover:bg-[#717171] w-6 h-6 flex justify-center items-center"
                  >
                    <NextPageIcon className="text-black group-hover:text-white" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const SearchIcon: React.FC<{ className?: string; onClick?: () => void }> = ({
  className,
  onClick,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="red"
    className={className}
    onClick={onClick}
  >
    <path
      d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
      fill="#717171"
    />
    <path
      d="M22 22.75C21.81 22.75 21.62 22.68 21.47 22.53L19.47 20.53C19.18 20.24 19.18 19.76 19.47 19.47C19.76 19.18 20.24 19.18 20.53 19.47L22.53 21.47C22.82 21.76 22.82 22.24 22.53 22.53C22.38 22.68 22.19 22.75 22 22.75Z"
      fill="#717171"
    />
  </svg>
);

interface MoreIconProps extends React.SVGProps<SVGSVGElement> {
  isActive: boolean;
}

export const MoreIcon: React.FC<MoreIconProps> = ({ isActive, ...rest }) => {
  return (
    <>
      {isActive && (
        <svg
          {...rest}
          xmlns="http://www.w3.org/2000/svg"
          width="4"
          height="16"
          viewBox="0 0 4 16"
          fill="none"
          style={{ fill: "black" }}
        >
          <path d="M2 4C1.60444 4 1.21776 3.8827 0.88886 3.66294C0.559962 3.44318 0.303617 3.13082 0.152241 2.76537C0.000866172 2.39992 -0.0387404 1.99778 0.03843 1.60982C0.1156 1.22186 0.306083 0.865493 0.585788 0.585788C0.865493 0.306083 1.22186 0.115601 1.60982 0.038431C1.99778 -0.0387403 2.39992 0.000867704 2.76537 0.152243C3.13082 0.303617 3.44318 0.559962 3.66294 0.888861C3.8827 1.21776 4 1.60444 4 2C4 2.53043 3.78929 3.03914 3.41421 3.41422C3.03914 3.78929 2.53043 4 2 4ZM4 14C4 13.6044 3.8827 13.2178 3.66294 12.8889C3.44318 12.56 3.13082 12.3036 2.76537 12.1522C2.39991 12.0009 1.99778 11.9613 1.60982 12.0384C1.22186 12.1156 0.865492 12.3061 0.585787 12.5858C0.306082 12.8655 0.115599 13.2219 0.038429 13.6098C-0.0387414 13.9978 0.000865122 14.3999 0.15224 14.7654C0.303616 15.1308 0.559961 15.4432 0.888859 15.6629C1.21776 15.8827 1.60444 16 2 16C2.53043 16 3.03914 15.7893 3.41421 15.4142C3.78929 15.0391 4 14.5304 4 14ZM4 8C4 7.60444 3.8827 7.21776 3.66294 6.88886C3.44318 6.55996 3.13082 6.30362 2.76537 6.15224C2.39992 6.00087 1.99778 5.96126 1.60982 6.03843C1.22186 6.1156 0.865492 6.30608 0.585787 6.58579C0.306082 6.86549 0.1156 7.22186 0.0384295 7.60982C-0.0387409 7.99778 0.000865647 8.39991 0.152241 8.76537C0.303616 9.13082 0.559962 9.44318 0.88886 9.66294C1.21776 9.8827 1.60444 10 2 10C2.53043 10 3.03914 9.78929 3.41421 9.41421C3.78929 9.03914 4 8.53043 4 8Z" />
        </svg>
      )}
    </>
  );
};

export const LoadingSkeletons: React.FC = () =>
  Array(4)
    .fill({})
    .map((_, idx) => (
      <TableRow
        key={`skeleton-${idx}`}
        className="border-none flex justify-start items-center"
      >
        <TableCell>
          <div role="status" className="max-w-sm w-10">
            <div className="h-4 bg-gray-200 rounded-full skeleton-effect w-full"></div>
          </div>
        </TableCell>
        <TableCell>
          <div role="status" className="max-w-sm w-[86px] xl:mr-[96px]">
            <div className="h-4 bg-gray-200 rounded-full skeleton-effect w-full"></div>
          </div>
        </TableCell>
        <TableCell>
          <div role="status" className="max-w-sm w-[103px] xl:mr-[79px]">
            <div className="h-4 bg-gray-200 rounded-full skeleton-effect w-full"></div>
          </div>
        </TableCell>
        <TableCell>
          <div role="status" className="max-w-md xl:w-[439px] w-[190px]">
            <div className="h-4 bg-gray-200 rounded-full skeleton-effect w-full"></div>
          </div>
        </TableCell>
      </TableRow>
    ));

export const PaginationSkeletons: React.FC = () => (
  <div className="flex items-center justify-center space-x-2 mt-4">
    <div className="w-8 h-8 bg-gray-300 rounded-md"></div>

    <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
    <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
    <div className="w-8 h-8 bg-gray-300 rounded-md"></div>

    <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
  </div>
);

export const NoDataIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
  >
    <path
      d="M79.1838 36.5188C78.5258 35.2397 77.5014 34.1858 76.2416 33.4917L76.2545 33.4836L37.7268 13.3333L0.00317383 32.7257L0.123578 32.7935L38.387 52.863C41.9385 54.7257 43.3195 59.1386 41.4739 62.7192C40.8912 63.8467 40.0226 64.8014 38.9551 65.4877L38.905 65.5531L38.8719 65.5774L77.4828 45.3923C79.9717 43.238 80.7636 39.5766 79.1838 36.5188Z"
      fill="#EBECED"
    />
    <path
      d="M38.3871 52.863L0 32.7281V49.2048L31.7051 65.8351C32.7335 66.3761 33.8779 66.6593 35.04 66.6602C36.371 66.6589 37.6759 66.2904 38.811 65.5954C39.9462 64.9004 40.8676 63.9057 41.4739 62.7208C43.3188 59.1386 41.9378 54.7256 38.3871 52.863Z"
      fill="#BDC3C7"
    />
    <path
      d="M14.8444 31.3584L18.5406 33.221L12.3281 32.6263L10.3992 33.5976L17.082 36.9624L19.023 35.9846L15.3551 34.1366L21.5264 34.7257L23.4723 33.7455L16.7895 30.3806L14.8444 31.3584ZM25.3963 31.2509L24.0784 30.5883L27.2921 28.9705L25.9281 28.2828L22.7143 29.9006L21.6541 29.3665L25.1167 27.6226L23.6897 26.9034L18.1559 29.6897L24.8388 33.0545L30.4735 30.2166L28.96 29.4554L25.3963 31.2509ZM31.6137 22.9123L34.6424 25.1515L29.8699 23.7915L27.9159 24.7758L30.6246 27.1806L26.1778 25.6517L24.2165 26.6392L32.3838 29.2558L34.4089 28.236L31.3689 25.5289L36.7475 27.0578L38.7725 26.0372L33.5644 21.9305L31.6137 22.9123ZM45.2784 21.7657C45.1539 21.4642 44.8776 21.2065 44.4485 20.9907C44.0848 20.8057 43.6654 20.6861 43.1935 20.6271C42.72 20.5681 42.1899 20.5867 41.5984 20.6828C41.0085 20.779 40.1664 21.0044 39.0691 21.3616C38.6287 21.5079 38.3143 21.5822 38.1301 21.5871C37.945 21.5952 37.7996 21.5709 37.6929 21.5176C37.5458 21.444 37.4836 21.3519 37.5038 21.2388C37.524 21.1257 37.6549 21.0093 37.8933 20.8873C38.1702 20.7445 38.4743 20.6621 38.7854 20.6457C39.0868 20.6303 39.4141 20.6869 39.7673 20.8113L41.6008 19.7745C40.8226 19.4683 40.0517 19.3487 39.2881 19.415C38.5212 19.4804 37.7115 19.7285 36.8574 20.1584C36.1608 20.5091 35.6994 20.8283 35.4755 21.1184C35.2517 21.4069 35.1911 21.6792 35.2978 21.9329C35.4044 22.1867 35.6283 22.4016 35.9725 22.5737C36.4945 22.8372 37.1192 22.9568 37.844 22.9293C38.5681 22.9051 39.4836 22.7152 40.5923 22.362C41.2662 22.1447 41.7487 22.0323 42.0363 22.0259C42.324 22.017 42.5584 22.0574 42.7281 22.1438C42.9123 22.2352 42.9899 22.3572 42.9697 22.5067C42.9503 22.6562 42.7895 22.8049 42.4961 22.9543C42.0879 23.1569 41.6324 23.2449 41.1782 23.2089C40.88 23.1903 40.5527 23.1111 40.1883 22.9721L38.3483 24.0234C39.0788 24.3345 39.8828 24.4889 40.7572 24.4889C41.6315 24.4889 42.6384 24.2028 43.7737 23.6307C44.4218 23.3051 44.8638 22.9875 45.1022 22.6788C45.3462 22.3733 45.4028 22.0671 45.2784 21.7657Z"
      fill="#7E8B8C"
    />
    <path
      d="M51.8974 25.6525L22.4565 40.4792L24.6109 41.5644L54.0533 26.737L51.8974 25.6525ZM27.4828 43.0101L33.9458 46.2634L42.5616 41.9249L36.0986 38.6707L27.4828 43.0101ZM41.844 37.9467L59.0763 29.2687L56.922 28.1834L39.6897 36.8622L41.844 37.9467ZM61.2307 30.3531L43.9976 39.0319L46.1519 40.118L63.385 31.4392L61.2307 30.3531Z"
      fill="#BDC2C6"
    />
    <path
      d="M33.962 57.8012L0 39.6743V41.5265L33.2307 59.2606C33.3428 59.3209 33.4679 59.3525 33.5952 59.3527C33.8812 59.3527 34.1584 59.1911 34.3006 58.9091C34.3983 58.7165 34.4176 58.4935 34.3545 58.2869C34.2914 58.0804 34.1507 57.9063 33.962 57.8012Z"
      fill="#7E8B8C"
    />
  </svg>
);

export const Scheduled: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
  >
    <g clipPath="url(#clip0_1316_140)">
      <path
        d="M11.657 0.672938C11.657 0.303416 12.0244 0 12.4841 0C12.9421 0 13.3113 0.300025 13.3113 0.672938V3.61387C13.3113 3.98339 12.9438 4.2868 12.4841 4.2868C12.0261 4.2868 11.657 3.98678 11.657 3.61387V0.672938ZM2.25073 9.51945C2.20459 9.51945 2.16187 9.31604 2.16187 9.06518C2.16187 8.81431 2.19946 8.61259 2.25073 8.61259H4.50659C4.55273 8.61259 4.59546 8.816 4.59546 9.06518C4.59546 9.31604 4.55786 9.51945 4.50659 9.51945H2.25073ZM5.84644 9.51945C5.80029 9.51945 5.75757 9.31604 5.75757 9.06518C5.75757 8.81431 5.79517 8.61259 5.84644 8.61259H8.10229C8.14844 8.61259 8.19116 8.816 8.19116 9.06518C8.19116 9.31604 8.15356 9.51945 8.10229 9.51945H5.84644ZM9.44214 9.51945C9.396 9.51945 9.35327 9.31604 9.35327 9.06518C9.35327 8.81431 9.38916 8.61259 9.44214 8.61259H11.698C11.7441 8.61259 11.7869 8.81431 11.7869 9.06348C11.5613 9.20248 11.3442 9.35503 11.1357 9.51945H9.44214ZM2.25586 12.1231C2.20972 12.1231 2.16699 11.9197 2.16699 11.6688C2.16699 11.4179 2.20459 11.2145 2.25586 11.2145H4.51172C4.55786 11.2145 4.60059 11.4179 4.60059 11.6688C4.60059 11.9197 4.56299 12.1231 4.51172 12.1231H2.25586ZM5.85156 12.1231C5.80542 12.1231 5.7627 11.9197 5.7627 11.6688C5.7627 11.4179 5.80029 11.2145 5.85156 11.2145H8.10742C8.15356 11.2145 8.19629 11.4179 8.19629 11.6688C8.19629 11.9197 8.15869 12.1231 8.10742 12.1231H5.85156ZM2.26099 14.7267C2.21484 14.7267 2.17212 14.5233 2.17212 14.2724C2.17212 14.0215 2.20972 13.8181 2.26099 13.8181H4.51685C4.56299 13.8181 4.60571 14.0215 4.60571 14.2724C4.60571 14.5233 4.56812 14.7267 4.51685 14.7267H2.26099ZM5.85669 14.7267C5.81055 14.7267 5.76782 14.5233 5.76782 14.2724C5.76782 14.0215 5.80542 13.8181 5.85669 13.8181H8.11255C8.15869 13.8181 8.20142 14.0215 8.20142 14.2724C8.20142 14.5233 8.16382 14.7267 8.11255 14.7267H5.85669ZM4.23145 0.672938C4.23145 0.30172 4.60059 0 5.05859 0C5.5166 0 5.88574 0.300025 5.88574 0.672938V3.61387C5.88574 3.98339 5.5166 4.2868 5.05859 4.2868C4.60059 4.2868 4.23145 3.98678 4.23145 3.61387V0.672938ZM0.910889 6.42936H16.6541V3.04433C16.6541 2.92737 16.6062 2.82736 16.5327 2.75278C16.4575 2.67819 16.3499 2.63243 16.2388 2.63243H14.7297C14.4768 2.63243 14.2717 2.42902 14.2717 2.17815C14.2717 1.92728 14.4785 1.72387 14.7297 1.72387H16.2388C16.6079 1.72387 16.9395 1.87135 17.1821 2.11204C17.4248 2.35274 17.5735 2.68158 17.5735 3.04772V8.42275C17.2727 8.31935 16.9634 8.23629 16.6455 8.17527V7.33621H16.6558H0.910889V16.1031C0.910889 16.22 0.957031 16.32 1.03223 16.3946C1.10742 16.4692 1.21509 16.515 1.32617 16.515H8.80811C8.89355 16.8302 9.00122 17.137 9.12939 17.4337H1.33472C0.967285 17.4337 0.634033 17.2862 0.391357 17.0455C0.148682 16.8065 0 16.4777 0 16.1115V3.04772C0 2.68328 0.148682 2.35274 0.391357 2.11204C0.634033 1.87135 0.965576 1.72387 1.33472 1.72387H2.94629C3.19922 1.72387 3.4043 1.92728 3.4043 2.17815C3.4043 2.42902 3.19922 2.63243 2.94629 2.63243H1.33472C1.2168 2.63243 1.11597 2.67819 1.04077 2.75278C0.965576 2.82736 0.919434 2.93415 0.919434 3.04433V6.42936H0.910889ZM7.20679 2.63073C6.95386 2.63073 6.74878 2.42732 6.74878 2.17646C6.74878 1.92559 6.95386 1.72218 7.20679 1.72218H10.2795C10.5325 1.72218 10.7375 1.92559 10.7375 2.17646C10.7375 2.42732 10.5325 2.63073 10.2795 2.63073H7.20679Z"
        fill="#393939"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.6611 9.41266C16.3823 9.41266 17.0728 9.55504 17.7017 9.81439C18.3579 10.0822 18.9441 10.4755 19.4363 10.9636C19.9268 11.4501 20.3232 12.0349 20.595 12.6824C20.8564 13.3079 21 13.991 21 14.7063C21 15.4216 20.8564 16.1064 20.595 16.7302C20.3232 17.3794 19.9285 17.9625 19.4363 18.4507C18.9441 18.9372 18.3562 19.3304 17.7034 19.6C17.0728 19.8593 16.384 20.0017 15.6628 20.0017C14.9417 20.0017 14.2512 19.8593 13.6223 19.6C12.9678 19.3304 12.3799 18.9389 11.8877 18.4507C11.3955 17.9642 11.0007 17.3794 10.729 16.7302C10.4675 16.1048 10.324 15.4216 10.324 14.7063C10.324 13.991 10.4675 13.3079 10.729 12.6824C11.0007 12.0332 11.3955 11.4501 11.8877 10.9619C12.3782 10.4755 12.9678 10.0822 13.6206 9.81269C14.2512 9.55504 14.9382 9.41266 15.6611 9.41266ZM15.104 12.6502C15.104 12.5672 15.1211 12.4875 15.1519 12.4129C15.1843 12.3366 15.2305 12.2688 15.2869 12.2112C15.3433 12.1536 15.4133 12.1078 15.4902 12.0773C15.5654 12.0468 15.6458 12.0298 15.7295 12.0298C15.8132 12.0298 15.8936 12.0468 15.9687 12.0773C16.0474 12.1095 16.1157 12.1553 16.1721 12.2112C16.2285 12.2671 16.2764 12.3366 16.3071 12.4129C16.3379 12.4858 16.355 12.5672 16.355 12.6502V14.8775L17.77 15.62C17.782 15.6267 17.7939 15.6352 17.8059 15.642C17.8708 15.6844 17.9238 15.7369 17.9666 15.7946C18.0127 15.8573 18.0452 15.9285 18.064 16.003C18.0828 16.0793 18.0879 16.1607 18.0776 16.2404C18.0674 16.3183 18.0417 16.3946 18.0007 16.4641L17.9854 16.4895L17.9734 16.5048C17.9307 16.5658 17.8794 16.6184 17.823 16.6573C17.7598 16.7031 17.688 16.7353 17.6145 16.754C17.5376 16.7726 17.4556 16.7777 17.3752 16.7675C17.2966 16.7573 17.2197 16.7319 17.1497 16.6912L15.4338 15.781C15.3843 15.7556 15.3398 15.7234 15.3022 15.6861C15.2629 15.6488 15.2271 15.6064 15.198 15.5589L15.1946 15.5522C15.1655 15.5047 15.1433 15.4555 15.1279 15.403C15.1125 15.3488 15.104 15.2928 15.104 15.2352V12.6502Z"
        fill="#FF7900"
      />
    </g>
    <defs>
      <clipPath id="clip0_1316_140">
        <rect width="21" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const Published = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
  >
    <g clip-path="url(#clip0_2349_6489)">
      <path
        d="M11.8655 0.674466C11.8655 0.304774 12.2397 0.00169373 12.7063 0.00169373C13.1729 0.00169373 13.5471 0.301444 13.5471 0.674466V3.61535C13.5471 3.98504 13.1729 4.28812 12.7063 4.28812C12.2397 4.28812 11.8655 3.98837 11.8655 3.61535V0.674466ZM2.29175 9.52209C2.2439 9.52209 2.20117 9.31726 2.20117 9.06747C2.20117 8.81768 2.23877 8.61452 2.29175 8.61452H4.58862C4.63647 8.61452 4.6792 8.81935 4.6792 9.06747C4.6792 9.31726 4.6416 9.52209 4.58862 9.52209H2.29175ZM5.95068 9.52209C5.90283 9.52209 5.86011 9.31726 5.86011 9.06747C5.86011 8.81768 5.89771 8.61452 5.95068 8.61452H8.24756C8.29541 8.61452 8.33813 8.81935 8.33813 9.06747C8.33813 9.31726 8.30054 9.52209 8.24756 9.52209H5.95068ZM9.61133 9.52209C9.56348 9.52209 9.52075 9.31726 9.52075 9.06747C9.52075 8.81768 9.55835 8.61452 9.61133 8.61452H11.9082C11.9561 8.61452 11.9988 8.81768 11.9988 9.06581C11.7681 9.20569 11.5476 9.35723 11.3357 9.52209H9.61133ZM2.29688 12.1249C2.24902 12.1249 2.2063 11.9201 2.2063 11.6703C2.2063 11.4205 2.2439 11.2157 2.29688 11.2157H4.59375C4.6416 11.2157 4.68433 11.4205 4.68433 11.6703C4.68433 11.9218 4.64673 12.1249 4.59375 12.1249H2.29688ZM5.95581 12.1249C5.90796 12.1249 5.86523 11.9201 5.86523 11.6703C5.86523 11.4205 5.90283 11.2157 5.95581 11.2157H8.25269C8.30054 11.2157 8.34326 11.4205 8.34326 11.6703C8.34326 11.9218 8.30566 12.1249 8.25269 12.1249H5.95581ZM2.30029 14.7278C2.25244 14.7278 2.20972 14.5229 2.20972 14.2731C2.20972 14.0217 2.24731 13.8185 2.30029 13.8185H4.59717C4.64502 13.8185 4.68774 14.0233 4.68774 14.2731C4.68774 14.5229 4.65015 14.7278 4.59717 14.7278H2.30029ZM5.96094 14.7278C5.91309 14.7278 5.87036 14.5229 5.87036 14.2731C5.87036 14.0217 5.90796 13.8185 5.96094 13.8185H8.25781C8.30566 13.8185 8.34839 14.0233 8.34839 14.2731C8.34839 14.5229 8.31079 14.7278 8.25781 14.7278H5.96094ZM4.30835 0.674466C4.30835 0.303109 4.68262 0.00169373 5.14917 0.00169373C5.61572 0.00169373 5.98999 0.301444 5.98999 0.674466V3.61535C5.98999 3.98504 5.61401 4.28812 5.14917 4.28812C4.68262 4.28812 4.30835 3.98837 4.30835 3.61535V0.674466ZM0.92627 6.43134H16.9514V3.04582C16.9514 2.92925 16.9036 2.82767 16.8267 2.7544C16.7498 2.67946 16.6404 2.63283 16.5276 2.63283H14.9912C14.7332 2.63283 14.5247 2.42801 14.5247 2.17821C14.5247 1.92842 14.7332 1.72359 14.9912 1.72359H16.5276C16.9036 1.72359 17.2419 1.8718 17.488 2.1116C17.7358 2.35307 17.8862 2.68113 17.8862 3.04749V8.42301C17.5803 8.31976 17.2642 8.2365 16.9412 8.17488V7.33558H16.9514H0.92627V16.1049C0.92627 16.2215 0.974121 16.3231 1.05103 16.3964C1.12793 16.4713 1.2373 16.5179 1.3501 16.5179H8.96533C9.05249 16.8327 9.16187 17.1407 9.29175 17.4355H1.35864C0.984375 17.4355 0.644287 17.2873 0.398193 17.0475C0.1521 16.8077 0 16.4796 0 16.1133V3.04915C0 2.68446 0.1521 2.35307 0.398193 2.11327C0.645996 1.8718 0.982666 1.72526 1.35864 1.72526H2.99927C3.25561 1.72526 3.46582 1.93009 3.46582 2.17988C3.46582 2.42967 3.25561 2.6345 2.99927 2.6345H1.35864C1.23901 2.6345 1.13477 2.68113 1.05957 2.75607C0.982666 2.831 0.934814 2.93758 0.934814 3.04749V6.433L0.92627 6.43134ZM7.33667 2.63283C7.08032 2.63283 6.87012 2.42801 6.87012 2.17821C6.87012 1.92842 7.08032 1.72359 7.33667 1.72359H10.4641C10.7222 1.72359 10.9307 1.92842 10.9307 2.17821C10.9307 2.42967 10.7205 2.63283 10.4641 2.63283H7.33667Z"
        fill="black"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.5676 9.41551C17.0681 9.41551 18.4268 10.0084 19.4094 10.9659C20.3904 11.9251 20.9988 13.249 20.9988 14.7094C20.9988 16.1699 20.3904 17.4954 19.4094 18.453C18.425 19.4105 17.0664 20.0034 15.5676 20.0034C14.0688 20.0034 12.7085 19.4105 11.7258 18.453C10.7432 17.4938 10.1348 16.1699 10.1348 14.7094C10.1348 13.249 10.7432 11.9234 11.7258 10.9659C12.7085 10.0084 14.0671 9.41551 15.5676 9.41551ZM13.175 15.2723C13.1494 15.2457 13.1272 15.2173 13.1084 15.1874C13.0879 15.1574 13.0725 15.1258 13.0571 15.0924C13.0093 14.9825 12.9973 14.866 13.0178 14.7527C13.0383 14.6412 13.0896 14.5346 13.1716 14.448L13.2024 14.418C13.4058 14.2298 13.7134 14.1949 13.9543 14.3364C13.9885 14.3564 14.021 14.3797 14.0518 14.408L14.0552 14.4113C14.2261 14.5712 14.5149 14.8327 14.7046 14.9959L14.8669 15.1374L16.8596 13.1008C16.887 13.0725 16.9177 13.0475 16.9519 13.0258C16.9861 13.0025 17.0203 12.9842 17.0562 12.9692C17.092 12.9542 17.1313 12.9409 17.1707 12.9326C17.21 12.9243 17.251 12.9193 17.2903 12.9193H17.292C17.3313 12.9193 17.3706 12.9209 17.4099 12.9276C17.4492 12.9342 17.4868 12.9442 17.5278 12.9592C17.5654 12.9725 17.6013 12.9909 17.6355 13.0108C17.668 13.0308 17.6987 13.0541 17.7295 13.0825L17.7432 13.0958C17.7705 13.1224 17.7961 13.1524 17.8184 13.184C17.8406 13.2157 17.8611 13.2506 17.8765 13.2856C17.8936 13.3206 17.9055 13.3589 17.9141 13.3972C17.9226 13.4355 17.9277 13.4738 17.9294 13.5138V13.5337C17.9294 13.5687 17.926 13.6037 17.9192 13.637C17.9124 13.6736 17.9021 13.7119 17.8884 13.7469C17.8748 13.7835 17.856 13.8185 17.8354 13.8518C17.8149 13.8851 17.7893 13.9151 17.762 13.9434L15.3523 16.403C15.3232 16.433 15.2942 16.458 15.2617 16.4796C15.2292 16.5029 15.1934 16.5213 15.1575 16.5379C15.1216 16.5546 15.0823 16.5662 15.043 16.5762C15.0037 16.5862 14.9644 16.5912 14.9233 16.5929H14.9131C14.8755 16.5929 14.8379 16.5912 14.8037 16.5862L14.7952 16.5845C14.7593 16.5779 14.7234 16.5696 14.6892 16.5579C14.6516 16.5446 14.6157 16.5279 14.5815 16.5079L14.5764 16.5046C14.5439 16.4846 14.5132 16.463 14.4841 16.4397L14.479 16.4347C14.3389 16.3081 14.1868 16.1799 14.0347 16.05C13.7664 15.8252 13.3972 15.5004 13.175 15.2723Z"
        fill="#0CBF2E"
      />
    </g>
    <defs>
      <clipPath id="clip0_2349_6489">
        <rect
          width="21"
          height="20"
          fill="white"
          transform="translate(0 0.00169373)"
        />
      </clipPath>
    </defs>
  </svg>
);

const NextPageIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="12"
    viewBox="0 0 8 12"
    fill="none"
    {...props}
  >
    <path
      d="M1.82432 12L0.5 10.6L4.85135 6L0.5 1.4L1.82432 0L7.5 6L1.82432 12Z"
      fill="currentColor"
    />
  </svg>
);

const PreviewPageIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="12"
    viewBox="0 0 8 12"
    fill="none"
    {...props}
  >
    <path
      d="M6.17568 12L7.5 10.6L3.14865 6L7.5 1.4L6.17568 0L0.5 6L6.17568 12Z"
      fill="currentColor"
    />
  </svg>
);
