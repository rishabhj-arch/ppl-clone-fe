import axios, { AxiosResponse } from "axios";
import middlewareNoAuth from "../middleware/middlewareNoAuth";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqpakqzo";

interface SignInResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}
export const loginSignIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<SignInResponse> => {
  const res: AxiosResponse<SignInResponse> = await middlewareNoAuth.request({
    url: "/auth/signin",
    method: "POST",
    data: { email, password },
  });

  return res.data;
};

export const searchPost = async (
  search: string,
  limit: number,
  page: number,
  status?: string
): Promise<AxiosResponse> => {
  const url =
    `/post/posts?limit=${limit}&page=${page}&search=${search}` +
    (status ? `&status=${status}` : "");

  const res = await middlewareNoAuth.request({
    url,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const createPost = async (data: FormData) => {
  const res = await middlewareNoAuth.request({
    url: `/post/createpost`,
    method: "POST",
    data: data,
  });
  return res;
};

export const getPost = async (postId: any) => {
  const res = await middlewareNoAuth.request({
    url: `/post/${postId}`,
    method: "GET",
  });
  return res;
};

export const editPost = async (postId: string, data: any) => {
  const formData = new FormData();

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];

      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, value);
      }
    }
  }

  const res = await middlewareNoAuth.request({
    url: `/post/editpost/${postId}`,
    method: "PUT",
    data: formData,
  });
  return res;
};

export const deletePost = async (postId: string) => {
  const res = await middlewareNoAuth.request({
    url: `/post/deletepost/${postId}`,
    method: "DELETE",
  });
  return res;
};

export const contactUs = async (data: any) => {
  const res = await axios.request({
    url: FORMSPREE_ENDPOINT,
    method: "POST",
    data: data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return res;
};
