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









// import { useState } from "react";
// import { createUser } from "../../api/apiServices";
// import { IoEye, IoEyeOff } from "react-icons/io5";

// const CreateUser = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     pin: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showPin, setShowPin] = useState(false);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     if (form.pin.length !== 4) {
//       return alert("PIN must be exactly 4 digits");
//     }

//     try {
//       await createUser(form);
//       alert("User Created Successfully");

//       // reset form
//       setForm({
//         name: "",
//         email: "",
//         password: "",
//         pin: "",
//       });
//     } catch (err: any) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 px-4">

//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-8 space-y-5"
//       >
//         {/* TITLE */}
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-white">
//             Create User
//           </h2>
//           <p className="text-sm text-white/80 mt-1">
//             Add a new staff account
//           </p>
//         </div>

//         {/* NAME */}
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={form.name}
//           className="input-modern"
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         {/* EMAIL */}
//         <input
//           type="email"
//           placeholder="Email Address"
//           value={form.email}
//           className="input-modern"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         {/* PASSWORD */}
//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={form.password}
//             className="input-modern pr-10"
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />

//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
//           >
//             {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
//           </button>
//         </div>

//         {/* PIN */}
//         <div className="relative">
//           <input
//             type={showPin ? "text" : "password"}
//             placeholder="4 Digit PIN"
//             value={form.pin}
//             maxLength={4}
//             className="input-modern pr-10 tracking-[8px] text-center"
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 pin: e.target.value.replace(/\D/g, ""), // only numbers
//               })
//             }
//           />

//           <button
//             type="button"
//             onClick={() => setShowPin(!showPin)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
//           >
//             {showPin ? <IoEyeOff size={20} /> : <IoEye size={20} />}
//           </button>
//         </div>

//         {/* INFO */}
//         <p className="text-xs text-white/70 text-center">
//           PIN is used to unlock the system for this user
//         </p>

//         {/* BUTTON */}
//         <button
//           type="submit"
//           className="w-full bg-white text-indigo-600 font-semibold py-2 rounded-xl hover:bg-indigo-100 transition duration-200"
//         >
//           Create User
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateUser;




import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import { IoClose } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

import {
  createUser,
  getUsers,
  deleteUser,
  verifyAdmin, // ✅ NEW
} from "../../api/apiServices";
import AdminHeader from "./AdminHeader";

const CreateUser = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [selectedUser, setSelectedUser] = useState<any>(null); // ✅ NEW
  const [adminPassword, setAdminPassword] = useState(""); // ✅ NEW
  const [showDeleteModal, setShowDeleteModal] = useState(false); // ✅ NEW
  const [deleteId, setDeleteId] = useState(""); // ✅ NEW

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    pin: "",
  });

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();

      console.log("FULL RESPONSE:", data);

      let list: any[] = [];

      if (Array.isArray(data)) list = data;
      else if (Array.isArray(data.users)) list = data.users;
      else if (Array.isArray(data.data)) list = data.data;

      // ✅ FILTER ONLY USERS (REMOVE ADMIN)
      const onlyUsers = list.filter((u) => u.role === "user");

      setUsers(onlyUsers);

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= SEARCH ================= */
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      fetchUsers();
      return;
    }

    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase())
    );

    setUsers(filtered);
  };

  /* ================= CREATE USER ================= */
  const handleCreateUser = async () => {
    if (form.pin.length !== 4) {
      return alert("PIN must be 4 digits");
    }

    try {
      await createUser(form);

      setForm({
        name: "",
        email: "",
        password: "",
        pin: "",
      });

      setSelectedUser(null); // ✅ reset
      setShowForm(false);
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  /* ================= CLICK USER ================= */
  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
    setShowForm(true);

    setForm({
      name: user.name,
      email: user.email,
      password: "",
      pin: "",
    });
  };

  /* ================= DELETE ================= */
  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await verifyAdmin(adminPassword); // 🔐 check password
      await deleteUser(deleteId);

      setShowDeleteModal(false);
      setAdminPassword("");
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="h-screen flex flex-col relative">
      <AdminHeader />

      <div className="flex-1 overflow-y-auto p-4">

        <SearchBar onSearch={handleSearch} />

        {/* HEADER */}
        <div className="flex justify-between items-center px-2 sm:px-6 mt-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--main)]">
            <Link to="/">
              <IoIosArrowBack />
            </Link>
            USER MANAGEMENT
          </h2>

          <button
            onClick={() => {
              setSelectedUser(null);
              setForm({ name: "", email: "", password: "", pin: "" });
              setShowForm(true);
            }}
            className="bg-[var(--main)] text-white px-4 py-2 rounded-lg"
          >
            Add User
          </button>
        </div>

        {/* ================= TABLE ================= */}
        <div className="px-2 sm:px-6 mt-6">
          <div className="overflow-auto shadow-md rounded-xl bg-white">

            <table className="min-w-full text-sm">
              <thead className="bg-[var(--main)] text-white">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-center">Email</th>
                  <th className="p-3 text-center">PIN</th>
                  <th className="p-3 text-center">Delete</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b cursor-pointer">
                    <td
                      className="p-3"
                      onClick={() => handleSelectUser(u)}
                    >
                      {u.name}
                    </td>
                    <td className="p-3 text-center">{u.email}</td>
                    <td className="p-3 text-center">****</td>

                    <td className="p-3 text-center">
                      <FaTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => openDeleteModal(u._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>

      </div>

      {/* ================= FORM MODAL ================= */}
      {showForm && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md relative shadow-xl">

            <IoClose
              className="absolute top-3 right-3 cursor-pointer text-xl"
              onClick={() => setShowForm(false)}
            />

            <h3 className="text-center font-semibold text-lg mb-4">
              {selectedUser ? "User Details" : "Create User"}
            </h3>

            <div className="flex flex-col gap-3">

              <input
                type="text"
                placeholder="Name"
                value={form.name}
                className="p-2 border rounded-lg"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                className="p-2 border rounded-lg"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              {!selectedUser && (
                <>
                  <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    className="p-2 border rounded-lg"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="4 Digit PIN"
                    value={form.pin}
                    maxLength={4}
                    className="p-2 border rounded-lg text-center"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        pin: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                </>
              )}

              {!selectedUser && (
                <button
                  onClick={handleCreateUser}
                  className="bg-[var(--main)] text-white py-2 rounded-lg"
                >
                  Create User
                </button>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {showDeleteModal && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-80 text-center">

            <h3 className="font-semibold mb-2">
              Enter Admin Password
            </h3>

            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="border p-2 w-full"
            />

            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 mt-3 rounded"
            >
              Confirm Delete
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default CreateUser;