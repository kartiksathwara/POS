// import { useEffect, useState } from "react";
// import TitleBanner from "./TitleBanner";
// import DigitalClock from "./DigitalClock/DigitalClock";
// import { IoEye, IoEyeOff } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import type { AppDispatch } from "../app/store";
// import { login } from "../auth/authSlice";
// import { loginUser } from "../api/apiServices";

// type UserDet = {
//   name: string;
//   email: string;
//   password: string;
//   role: "admin" | "user";
// };

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const userToken = "POS-token";

//   // SET DEFAULT USERS
//   useEffect(() => {
//     const users: UserDet[] = [
//       {
//         name: "Admin",
//         email: "admin@gmail.com",
//         password: "admin123",
//         role: "admin",
//       },
//       {
//         name: "User",
//         email: "user@gmail.com",
//         password: "1234",
//         role: "user",
//       },
//     ];

//     // Only set if not already present
//     if (!localStorage.getItem("Users")) {
//       localStorage.setItem("Users", JSON.stringify(users));
//     }
//   }, []);

//   const validateEmail = (email: string) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault();

//   //   if (!validateEmail(email)) {
//   //     setError("Please enter a valid email address.");
//   //     return;
//   //   }

//   //   const storedUsers = localStorage.getItem("Users");
//   //   if (!storedUsers) {
//   //     setError("No users found");
//   //     return;
//   //   }

//   //   const users: UserDet[] = JSON.parse(storedUsers);

//   //   const foundUser = users.find(
//   //     (u) => u.email === email && u.password === password
//   //   );

//   //   if (!foundUser) {
//   //     setError("Invalid credential");
//   //     return;
//   //   }

//   //   // LOGIN SUCCESS
//   //   dispatch(login(userToken));

//   //   // ROLE BASED NAVIGATION
//   //   if (foundUser.role === "admin") {
//   //     navigate("/admin");
//   //   } else {
//   //     navigate("/lock");
//   //   }
//   // };



//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   if (!validateEmail(email)) {
//     setError("Please enter a valid email address.");
//     return;
//   }

//   try {
//     const data = await loginUser({ email, password });

//     localStorage.setItem("POS-token", data.token);

//     dispatch(login(data.token));

//     if (data.role === "admin") {
//       navigate("/admin-products");
//     } else {
//       navigate("/lock");
//     }
//   } catch (error: any) {
//     setError(error.message);
//   }
// };
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center sm:justify-start">
//       <TitleBanner />

//       <div className="flex flex-col items-center flex-1 w-full pt-28 sm:pt-16 gap-10 px-4">
//         <div className="text-center">
//           <DigitalClock />
//         </div>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             type="text"
//             placeholder="Email id"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border-2 border-(--main)/50 p-2 rounded-lg w-xs placeholder:font-semibold focus:outline-none"
//           />

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="border-2 border-(--main)/50 p-2 rounded-lg w-xs placeholder:font-semibold focus:outline-none"
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-2 top-6 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//             >
//               {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
//             </button>
//           </div>

//           <div className="min-h-[1.25rem]">
//             {error && (
//               <p className="text-red-600 font-medium text-sm">{error}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="bg-(--main) border-2 text-white px-16 py-2 text-lg rounded-md hover:cursor-pointer disabled:bg-(--main)/90"
//             disabled={email === "" || password === ""}
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;




import { useEffect, useState } from "react";
import TitleBanner from "./TitleBanner";
import DigitalClock from "./DigitalClock/DigitalClock";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { login } from "../auth/authSlice";
import { loginUser } from "../api/apiServices";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // 🔥 BLOCK LOGIN PAGE IF ALREADY LOGGED IN
  useEffect(() => {
  const token = localStorage.getItem("POS-token");
  const role = localStorage.getItem("POS-role");

  if (token && role) {
    if (role === "admin") {
      navigate("/admin-products", { replace: true });
    } else {
      navigate("/lock", { replace: true });
    }
  }
}, [navigate]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const data = await loginUser({ email, password });

      // ✅ STORE TOKEN
      localStorage.setItem("POS-token", data.token);
      localStorage.setItem("POS-role", data.role);

      // ✅ UPDATE REDUX
      dispatch(login(data.token));

      // ✅ ROLE BASED NAVIGATION (REPLACE HISTORY)
      if (data.role === "admin") {
        navigate("/admin-products", { replace: true });
      } else {
        navigate("/lock", { replace: true });
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center sm:justify-start">
      <TitleBanner />

      <div className="flex flex-col items-center flex-1 w-full pt-28 sm:pt-16 gap-10 px-4">
        <div className="text-center">
          <DigitalClock />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            >
              {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
            </button>
          </div>

          <div className="min-h-[1.25rem]">
            {error && (
              <p className="text-red-600 font-medium text-sm">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-(--main) border-2 text-white px-16 py-2 text-lg rounded-md hover:cursor-pointer disabled:bg-(--main)/90"
            disabled={email === "" || password === ""}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;