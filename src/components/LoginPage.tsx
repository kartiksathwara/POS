import { useState } from "react";
import TitleBanner from "./TitleBanner";
import DigitalClock from "./DigitalClock/DigitalClock";
import { IoEye, IoEyeOff } from "react-icons/io5";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    console.log("success");
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <TitleBanner />
      <div className="flex flex-col gap-10 items-center justify-start flex-1 w-full max-w-md sm:mt-16 ">
        <div className="text-center">
          <DigitalClock />
        </div>
        <div className="flex flex-col gap-4">
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
        </div>
        <button
          onClick={handleSubmit}
          className="bg-(--main) border-2 text-white px-16 py-2 text-lg rounded-md hover:cursor-pointer disabled:bg-(--main)/90"
          disabled={email == "" || password == ""}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
