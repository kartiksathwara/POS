import { useEffect, useState } from "react";
import TitleBanner from "./TitleBanner";
import DigitalClock from "./DigitalClock/DigitalClock";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type UserDet = {
  email: string,
  password: string,
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const defaultData: UserDet = {
    email: "abcd@gmail.com",
    password: "1234",
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  useEffect(() => {
    localStorage.setItem("User", JSON.stringify(defaultData))
    const storedUser = localStorage.getItem("User")
    if (storedUser) {
      const parsedUser: UserDet = JSON.parse(storedUser);
      console.log("Default User Set:", parsedUser);
    }
  }, [])

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const storedUser = localStorage.getItem("User")
    if (!storedUser) return;
    const user: UserDet = JSON.parse(storedUser);
    if (email === user.email && password === user.password) {
      setError("")
      console.log("Login success!");
      navigate("/")
    } else {
      console.log("Invalid credential");
      setError("Invalid credential");
    }
  };



  return (
    <div className="min-h-screen flex flex-col items-center">
      <TitleBanner />
      <div className="flex flex-col gap-10 items-center justify-start flex-1 w-full max-w-md sm:mt-16 ">
        <div className="text-center">
          <DigitalClock />
        </div>
        <div className="flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <input
              type="text"
              placeholder="Email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-(--main)/50 p-2 rounded-lg w-xs placeholder:font-semibold focus:outline-none"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-(--main)/50 p-2 rounded-lg w-xs placeholder:font-semibold focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-6 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </button>
            </div>
            <div className="min-h-[1.25rem]">
              {error && (
                <p className="text-red-600 font-medium text-sm ">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-(--main) border-2 text-white px-16 py-2 text-lg rounded-md hover:cursor-pointer disabled:bg-(--main)/90"
              disabled={email == "" || password == ""}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
