// // components/admin/CreateUser.tsx
// import { useState } from "react";
// import { createUser } from "../../api/apiServices";

// const CreateUser = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     pin: "",
//   });

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     try {
//       await createUser(form);
//       alert("User Created");
//     } catch (err: any) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="p-6 flex justify-center">
//       <form className="bg-white p-6 shadow rounded-xl w-[350px] space-y-4" onSubmit={handleSubmit}>
//         <h2 className="text-xl font-bold text-center">Create User</h2>

//         <input placeholder="Name" className="input" onChange={(e)=>setForm({...form,name:e.target.value})}/>
//         <input placeholder="Email" className="input" onChange={(e)=>setForm({...form,email:e.target.value})}/>
//         <input type="password" placeholder="Password" className="input" onChange={(e)=>setForm({...form,password:e.target.value})}/>
//         <input type="password" placeholder="4 Digit PIN" className="input" onChange={(e)=>setForm({...form,pin:e.target.value})}/>

//         <button className="btn">Create User</button>
//       </form>
//     </div>
//   );
// };

// export default CreateUser;









import { useState } from "react";
import { createUser } from "../../api/apiServices";
import { IoEye, IoEyeOff } from "react-icons/io5";

const CreateUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    pin: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (form.pin.length !== 4) {
      return alert("PIN must be exactly 4 digits");
    }

    try {
      await createUser(form);
      alert("User Created Successfully");

      // reset form
      setForm({
        name: "",
        email: "",
        password: "",
        pin: "",
      });
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-8 space-y-5"
      >
        {/* TITLE */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            Create User
          </h2>
          <p className="text-sm text-white/80 mt-1">
            Add a new staff account
          </p>
        </div>

        {/* NAME */}
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          className="input-modern"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          className="input-modern"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* PASSWORD */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            className="input-modern pr-10"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
          >
            {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
          </button>
        </div>

        {/* PIN */}
        <div className="relative">
          <input
            type={showPin ? "text" : "password"}
            placeholder="4 Digit PIN"
            value={form.pin}
            maxLength={4}
            className="input-modern pr-10 tracking-[8px] text-center"
            onChange={(e) =>
              setForm({
                ...form,
                pin: e.target.value.replace(/\D/g, ""), // only numbers
              })
            }
          />

          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
          >
            {showPin ? <IoEyeOff size={20} /> : <IoEye size={20} />}
          </button>
        </div>

        {/* INFO */}
        <p className="text-xs text-white/70 text-center">
          PIN is used to unlock the system for this user
        </p>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-white text-indigo-600 font-semibold py-2 rounded-xl hover:bg-indigo-100 transition duration-200"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;