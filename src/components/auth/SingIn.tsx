import { useEffect, useState, ChangeEvent } from "react";
import { Button, Input } from "@headlessui/react";
import PPLImg from "../../components/Image/PAUL & PAUL LAWYERS.svg";
import Show from "../../components/Image/passShow.svg";
import Hide from "../../components/Image/PassHide.svg";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "../../api/auth/hooks";
import { ErrorIcon } from "../createNew/CreateNew";
import { useDocumentTitle } from "../shared/helpers";

export const SignIn: React.FC = () => {
  useDocumentTitle("Paul & Paul Lawyers Admin");
  const { mutate: signIn, isLoading } = useSignIn();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    setIsFormValid(username.trim() !== "" && password.trim() !== "");
  }, [username, password]);  

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validate = () => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username) {
      newErrors.username = "Please enter email";
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      newErrors.username = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Please enter password";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    if (!validate()) return;

    const userData = {
      email: username.trim(),
      password: password.trim(),
    };

    signIn(userData, {
      onSuccess: (data) => {
        if (data.formatted.success) {
          localStorage.setItem("token", data.formatted.data.token);
          navigate("/admin/dashboard");
        }
      },
      onError: (error: any) => {
        const apiError = error?.data || "Sign-in failed. Please try again.";
        setPasswordError(apiError);
        setErrors({});
      },
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center animate__animated animate__fadeIn">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-[32px]">
          <div className="mb-[60px]">
            <img src={PPLImg} alt="PAUL & PAUL LAWYERS" />
          </div>
          <div className="text-white font-Montserrat text-[20px] font-normal">
            Sign in with your account
          </div>
        </div>
        <div className="flex flex-col gap-5 mb-[40px]">
          <div>
            <Input
              name="Username"
              placeholder="Email"
              type="text"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value);
                if (e.target.value) {
                  if (/\S+@\S+\.\S+/.test(e.target.value)) {
                    setErrors((prev) => ({ ...prev, username: "" }));
                  }
                } else {
                  setErrors((prev) => ({
                    ...prev,
                    username: "Please enter email",
                  }));
                }
              }}
              className={
                "w-[370px] h-[50px] focus:outline-none focus:ring-0 border border-[#717171] p-[10px] bg-black text-white"
              }
            />
            {errors.username && (
              <div className="flex mt-2 gap-[5px]">
                <ErrorIcon />
                <p className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                  {errors.username}
                </p>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center border border-[#717171]">
              <Input
                name="Password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                  if (e.target.value) {
                    setErrors((prev) => ({ ...prev, password: "" }));
                    setPasswordError("");
                  }
                }}
                onKeyDown={handleKeyDown}
                className={
                  "w-[calc(100%-50px)] h-[50px] focus:outline-none focus:ring-0 p-[10px] bg-black text-white"
                }
              />
              <button type="button" className="w-[50px] flex justify-center items-center h-[50px]" onClick={togglePasswordVisibility}>
                <img src={showPassword ? Show : Hide} alt="Hide-Show icon" />
              </button>
            </div>
            {(errors.password || passwordError) && (
              <div className="flex mt-2 gap-[5px]">
                <ErrorIcon />
                <p className="text-[#CC000D] text-[14px] font-medium font-Montserrat">
                  {errors.password || passwordError}
                </p>
              </div>
            )}
          </div>
        </div>
        <div>
          <Button
            className={
              "bg-white text-black w-[370px] h-[50px] text-[16px] font-Montserrat font-semibold flex items-center justify-center"
            }
            onClick={handleSignIn}
            disabled={!isFormValid || isLoading}
            style={
              !isFormValid
                ? { opacity: 1, backgroundColor: "white", color: "#0000004D" }
                : {}
            }
          >
            {isLoading ? (
              <div className="loader border-t-2 border-black rounded-full w-5 h-5 mr-2 animate-spin"></div>
            ) : (
              "SIGN IN"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
