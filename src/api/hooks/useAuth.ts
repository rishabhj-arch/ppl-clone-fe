import { AUTH_TOKEN } from "../../components/shared/helpers";

type TokenType = string | null;

export const useAuth = () => {
  const setToken = (token: TokenType): void => {
    localStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
  };

  const getToken = (): TokenType => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return token ? JSON.parse(token) : null;
  };

  const removeToken = (callbackFn?: () => void): void => {
    localStorage.clear();
    if (callbackFn) {
      callbackFn();
    }
  };

  const isLoggedIn = getToken() ? true : false;

  const parseJwt = (token: string): { exp: number } | null => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  };

  const isTokenExpired = (token: string): boolean => {
    const decoded = parseJwt(token);
    if (!decoded) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  };

  return {
    isLoggedIn: isLoggedIn,
    getToken,
    setToken,
    removeToken,
    isTokenExpired,
  };
};
