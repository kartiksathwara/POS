import { useEffect, useState } from "react";
import { FaBackspace, FaAngleRight } from "react-icons/fa";
import Header from "./Header";
import {useNavigate } from "react-router-dom"; 
// import { useAuth } from "../auth/AuthContext";
import type { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { logout } from "../auth/authSlice";

const Lock = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const Numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const CORRECT_PIN = "1234";
  // const { logout } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if (/^[0-9]$/.test(key) && pin.length < 4) {
        setPin((prev) => prev + key);
      }

      if (key === "Backspace" && pin.length > 0) {
        setPin((prev) => prev.slice(0, -1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pin]);

  const handleClick = (num: number) => {
    if (pin.length < 4) {
      setPin(pin + num);
    }
  };

  const handleLogout = () => {
    navigate("/login");
    dispatch(logout())
    // logout();
  };

  useEffect(() => {
    if (pin.length === 4) {
      if (pin === CORRECT_PIN) {
        setError("");
        navigate("/");
      } else {
        setError("Incorrect PIN. Enter correct PIN.");
        setTimeout(() => setPin(""), 1000);
      }
    }
  }, [pin]);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = (date: Date) => {
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${dayOfWeek} | ${month} ${day}, ${year}`;
  };

  return (
    <div className="flex flex-col h-screen ">
      <Header />
      <div className="flex flex-col h-[calc(100%-6rem)] gap-4 items-center justify-center text-center py-6">
        <div>
          <h2 className="font-bold text-[30px] text-(--main)">
            {formattedTime}
          </h2>
          <p className="font-bold text-[14px] text-(--main)">
            {formattedDate(currentTime)}
          </p>
        </div>
        <div className="font-bold">
          <div className="text-[16px] text-(--eye-icon)">Welcome back</div>
          <div className="text-[22px] text-(--main)">User</div>
        </div>

        <input
          type="password"
          value={pin}
          readOnly
          className="border-2 border-(--main)/50 rounded-xl py-2 px-15 text-center text-2xl w-2xs"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="grid grid-cols-3 gap-5 text-2xl">
          {Numbers.map((num, index) => (
            <button
              key={index}
              onClick={() => handleClick(num)}
              className="w-15 h-16 rounded-full bg-(--pin-button) text-xl font-medium shadow"
            >
              {num}
            </button>
          ))}
          <FaBackspace
            onClick={() => setPin(pin.slice(0, -1))}
            className="w-15 h-16 p-5 rounded-full bg-(--pin-button) font-medium shadow cursor-pointer"
          />
        </div>
      </div>
      <div className="fixed bottom-4 left-0 right-0 px-4">
        <button
          onClick={handleLogout}
          className="flex items-center text-xl cursor-pointer "
        >
          Log Out <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default Lock;
