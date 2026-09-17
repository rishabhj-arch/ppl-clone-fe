import { useMutation, useQuery } from "react-query";
import {
  contactUs,
  createPost,
  deletePost,
  editPost,
  getPost,
  loginSignIn,
  searchPost,
} from "./endpoints";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SignInResponse {
  [x: string]: any;
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export const useSignIn = () => {
  return useMutation<
    SignInResponse,
    Error,
    { email: string; password: string }
  >(loginSignIn);
};

export const useSearchData = (
  search: string,
  limit: number,
  page: number,
  status?: string,
  reloadTrigger = 0
) => {
  return useQuery<AxiosResponse, unknown>(
    ["postList", search, limit, page, reloadTrigger, status],
    () => searchPost(search, limit, page, status),
    {
      keepPreviousData: true,
      staleTime: 5000,
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (error) => {
        console.error("Error fetching post data:", error);
      },
    }
  );
};

export const useCreatePost = () => {
  return useMutation((data: FormData) => createPost(data), {
    onSuccess: () => {
      toast.success("Insights and News are Created", {
        position: "bottom-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });
};

export const useFetchPost = (postId: any) => {
  return useQuery(["post", postId], () => getPost(postId), {
    keepPreviousData: true,
    staleTime: 5000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useEditPost = () => {
  return useMutation(
    ({ postId, data }: { postId: string; data: any }) => editPost(postId, data),
    {
      onSuccess: () => {
        toast.success("Insights and News are Updated", {
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

export const useDeletePost = () => {
  return useMutation((postId: string) => deletePost(postId));
};

export const useContactUs = () => {
  return useMutation((data: any) => contactUs(data));
};
