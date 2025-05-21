import { useEffect, useState } from "react";
import { FaBackspace,FaAngleRight } from "react-icons/fa";
import Header from "./Header";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Lock = () => {
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState('')
  // const [showPassword, setShowPassword] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pin, setPin] = useState("");
  const Numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  //keybord code

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if (/^[0-9]$/ .test(key) && pin.length<4) {
        setPin((prev) => prev + key);
      }

      if (key === "Backspace" && pin.length > 0) {
        setPin((prev) => prev.slice(0,-1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return() => window.removeEventListener("keydown", handleKeyDown);
  }, [pin]);
  //regular code
  const handleClick = (num: any) => {
    if (pin.length < 4) {
      setPin(pin + num)
    }
  }

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = (date: any) => {
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" }); // tuesday,
    const month = date.toLocaleDateString("en-US", { month: "long" }); // May
    const day = date.getDate(); // 20
    const year = date.getFullYear(); // 2025

    return `${dayOfWeek} | ${month} ${day} , ${year}`;
  };
  return (
    <div className="h-screen">
      <Header />
      <div className=" flex flex-col gap-5 items-center justify-center text-center py-6">
        <div>
          <h2 className=" font-syne font-bold text-[30px] bold text-(--background)">{formattedTime}</h2>
          <p className=" font-syne font-bold text-[14px] text-(--background)">{formattedDate(currentTime)}</p>
        </div>
        <div className="font-syne font-bold">
          <div className="text-[16px] text-(--eye-icon)">Welcome back</div>
          <div className="text-[22px] text-(--background)">Kartik</div>
        </div>

        <input
          type="password"
          value={pin}
          className="border-2 border-(--background)/50 rounded-xl
          py-2 px-15 mb-5 text-center text-2xl w-2xs" />

        <div className="grid grid-cols-3 gap-5 text-2xl">
          {
            Numbers.map((num, index) => (
              <button key={index} onClick={() => handleClick(num)} className="w-15 h-16 rounded-full bg-(--pin-button) text-xl font-medium shadow">{num}</button>
            ))}
            <FaBackspace onClick={() => setPin(pin.slice(0, -1))} className=" w-15 h-16 p-5 rounded-full bg-(--pin-button)  font-medium shadow"/> 
        </div>
      
      </div>

      <div>
        <button className="flex items-center text-xl">Log Out <FaAngleRight/></button>
      </div>

    </div>
  )
}

export default Lock
