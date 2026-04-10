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




// import { useEffect, useState } from "react";
// import SearchBar from "../SearchBar";
// import { IoClose } from "react-icons/io5";
// import { FaTrash } from "react-icons/fa";
// import { IoIosArrowBack } from "react-icons/io";
// import { Link } from "react-router-dom";
// import AdminSidebar from "./AdminSidebar";
// import { updateUserPin } from "../../api/apiServices";

// import {
//   createUser,
//   getUsers,
//   deleteUser,
//   verifyAdmin, // ✅ NEW
// } from "../../api/apiServices";
// import AdminHeader from "./AdminHeader";

// const CreateUser = () => {
//   const [users, setUsers] = useState<any[]>([]);
//   const [showForm, setShowForm] = useState(false);

//   const [selectedUser, setSelectedUser] = useState<any>(null); // ✅ NEW
//   const [adminPassword, setAdminPassword] = useState(""); // ✅ NEW
//   const [showDeleteModal, setShowDeleteModal] = useState(false); // ✅ NEW
//   const [deleteId, setDeleteId] = useState(""); // ✅ NEW
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showPinModal, setShowPinModal] = useState(false);
//   const [newPin, setNewPin] = useState("");
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     pin: "",
//   });

//   /* ================= FETCH USERS ================= */
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const data = await getUsers();

//       console.log("FULL RESPONSE:", data);

//       let list: any[] = [];

//       if (Array.isArray(data)) list = data;
//       else if (Array.isArray(data.users)) list = data.users;
//       else if (Array.isArray(data.data)) list = data.data;

//       // ✅ FILTER ONLY USERS (REMOVE ADMIN)
//       const onlyUsers = list.filter((u) => u.role === "user");

//       setUsers(onlyUsers);

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   /* ================= SEARCH ================= */
//   const handleSearch = (query: string) => {
//     if (!query.trim()) {
//       fetchUsers();
//       return;
//     }

//     const filtered = users.filter(
//       (u) =>
//         u.name.toLowerCase().includes(query.toLowerCase()) ||
//         u.email.toLowerCase().includes(query.toLowerCase())
//     );

//     setUsers(filtered);
//   };

//   /* ================= CREATE USER ================= */
//   const handleCreateUser = async () => {
//     if (form.pin.length !== 4) {
//       return alert("PIN must be 4 digits");
//     }

//     try {
//       await createUser(form);

//       setForm({
//         name: "",
//         email: "",
//         password: "",
//         pin: "",
//       });

//       setSelectedUser(null); // ✅ reset
//       setShowForm(false);
//       fetchUsers();
//     } catch (err: any) {
//       alert(err.message);
//     }
//   };

//   /* ================= CLICK USER ================= */
//   // const handleSelectUser = (user: any) => {
//   //   setSelectedUser(user);
//   //   setShowForm(true);

//   //   setForm({
//   //     name: user.name,
//   //     email: user.email,
//   //     password: "",
//   //     pin: "",
//   //   });
//   // };

//   const handleSelectUser = (user: any) => {
//     setSelectedUser(user);
//     setShowPinModal(true);
//   };
//   /* ================= DELETE ================= */
//   const openDeleteModal = (id: string) => {
//     setDeleteId(id);
//     setShowDeleteModal(true);
//   };

//   const handleDelete = async () => {
//     try {
//       await verifyAdmin(adminPassword); // 🔐 check password
//       await deleteUser(deleteId);

//       setShowDeleteModal(false);
//       setAdminPassword("");
//       fetchUsers();
//     } catch (err: any) {
//       alert(err.message);
//     }
//   };

//   const handleUpdatePin = async () => {
//     try {
//       if (newPin.length !== 4) {
//         return alert("PIN must be 4 digits");
//       }

//       await verifyAdmin(adminPassword); 
//       await updateUserPin(selectedUser._id, newPin, adminPassword);

//       alert("PIN updated successfully");

//       setShowPinModal(false);
//       setAdminPassword("");
//       setNewPin("");
//       fetchUsers();

//     } catch (err: any) {
//       alert(err.message);
//     }
//   };
//   return (
//     <div className="flex min-h-screen bg-[#FAF6F1]">
//       <AdminSidebar
//         isOpen={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//       />
//       <div
//         className={`
//              flex-1 flex flex-col transition-all duration-300
//              ${sidebarOpen ? "ml-[240px]" : "ml-0"}
//            `}
//       >
//         <AdminHeader
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//         />
//         <div className="flex-1 overflow-y-auto p-4">

//           <SearchBar onSearch={handleSearch} />

//           {/* HEADER */}
//           <div className="flex justify-between items-center px-2 sm:px-6 mt-4">
//             <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--main)]">
//               <Link to="/">
//                 <IoIosArrowBack />
//               </Link>
//               USER MANAGEMENT
//             </h2>

//             <button
//               onClick={() => {
//                 setSelectedUser(null);
//                 setForm({ name: "", email: "", password: "", pin: "" });
//                 setShowForm(true);
//               }}
//               className="bg-[var(--main)] text-white px-4 py-2 rounded-lg"
//             >
//               Add User
//             </button>
//           </div>

//           {/* ================= TABLE ================= */}
//           <div className="px-2 sm:px-6 mt-6">
//             <div className="overflow-auto shadow-md rounded-xl bg-white">

//               <table className="min-w-full text-sm">
//                 <thead className="bg-[var(--main)] text-white">
//                   <tr>
//                     <th className="p-3 text-left">Name</th>
//                     <th className="p-3 text-center">Email</th>
//                     <th className="p-3 text-center">PIN</th>
//                     <th className="p-3 text-center">Delete</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {users.map((u) => (
//                     <tr key={u._id} className="border-b cursor-pointer">
//                       <td
//                         className="p-3"
//                         onClick={() => handleSelectUser(u)}
//                       >
//                         {u.name}
//                       </td>
//                       <td className="p-3 text-center">{u.email}</td>
//                       <td className="p-3 text-center">****</td>

//                       <td className="p-3 text-center">
//                         <FaTrash
//                           className="text-red-500 cursor-pointer"
//                           onClick={() => openDeleteModal(u._id)}
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>

//               </table>

//             </div>
//           </div>

//         </div>

//         {/* ================= FORM MODAL ================= */}
//         {showForm && (
//           <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

//             <div className="bg-white p-6 rounded-xl w-[90%] max-w-md relative shadow-xl">

//               <IoClose
//                 className="absolute top-3 right-3 cursor-pointer text-xl"
//                 onClick={() => setShowForm(false)}
//               />

//               <h3 className="text-center font-semibold text-lg mb-4">
//                 {selectedUser ? "User Details" : "Create User"}
//               </h3>

//               <div className="flex flex-col gap-3">

//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={form.name}
//                   className="p-2 border rounded-lg"
//                   onChange={(e) =>
//                     setForm({ ...form, name: e.target.value })
//                   }
//                 />

//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={form.email}
//                   className="p-2 border rounded-lg"
//                   onChange={(e) =>
//                     setForm({ ...form, email: e.target.value })
//                   }
//                 />

//                 {!selectedUser && (
//                   <>
//                     <input
//                       type="password"
//                       placeholder="Password"
//                       value={form.password}
//                       className="p-2 border rounded-lg"
//                       onChange={(e) =>
//                         setForm({ ...form, password: e.target.value })
//                       }
//                     />

//                     <input
//                       type="text"
//                       placeholder="4 Digit PIN"
//                       value={form.pin}
//                       maxLength={4}
//                       className="p-2 border rounded-lg text-center"
//                       onChange={(e) =>
//                         setForm({
//                           ...form,
//                           pin: e.target.value.replace(/\D/g, ""),
//                         })
//                       }
//                     />
//                   </>
//                 )}

//                 {!selectedUser && (
//                   <button
//                     onClick={handleCreateUser}
//                     className="bg-[var(--main)] text-white py-2 rounded-lg"
//                   >
//                     Create User
//                   </button>
//                 )}

//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= DELETE MODAL ================= */}
//         {showDeleteModal && (
//           <div className="absolute inset-0 bg-black/40 flex items-center justify-center">

//             <div className="bg-white p-6 rounded-xl w-80 text-center">

//               <h3 className="font-semibold mb-2">
//                 Enter Admin Password
//               </h3>

//               <input
//                 type="password"
//                 value={adminPassword}
//                 onChange={(e) => setAdminPassword(e.target.value)}
//                 className="border p-2 w-full"
//               />

//               <button
//                 onClick={handleDelete}
//                 className="bg-red-500 text-white px-4 py-2 mt-3 rounded"
//               >
//                 Confirm Delete
//               </button>

//             </div>
//           </div>
//         )}
//         {showPinModal && (
//           <div className="absolute inset-0 bg-black/40 flex items-center justify-center">

//             <div className="bg-white p-6 rounded-xl w-80 text-center">

//               <h3 className="font-semibold mb-2">
//                 Update User PIN
//               </h3>

//               <input
//                 type="text"
//                 placeholder="Enter new 4 digit PIN"
//                 maxLength={4}
//                 value={newPin}
//                 onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))}
//                 className="border p-2 w-full mb-2 text-center"
//               />

//               <input
//                 type="password"
//                 placeholder="Enter admin password"
//                 value={adminPassword}
//                 onChange={(e) => setAdminPassword(e.target.value)}
//                 className="border p-2 w-full mb-2"
//               />

//               <button
//                 onClick={handleUpdatePin}
//                 className="bg-[var(--main)] text-white px-4 py-2 mt-2 rounded"
//               >
//                 Update PIN
//               </button>

//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default CreateUser;




















import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import { IoClose } from "react-icons/io5";
import { FaTrash, FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import AdminSidebar from "./AdminSidebar";
import { updateUserPin } from "../../api/apiServices";
import {
  createUser,
  getUsers,
  deleteUser,
  verifyAdmin,
} from "../../api/apiServices";
import AdminHeader from "./AdminHeader";

const COLORS = ["#5C4033", "#8B6F5E", "#C8A882", "#E9DCCF", "#A0856C"];

const CreateUser = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [showAdminPassPin, setShowAdminPassPin] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    pin: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      let list: any[] = [];
      if (Array.isArray(data)) list = data;
      else if (Array.isArray(data.users)) list = data.users;
      else if (Array.isArray(data.data)) list = data.data;
      setUsers(list.filter((u) => u.role === "user"));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) { fetchUsers(); return; }
    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase())
    );
    setUsers(filtered);
  };

  const handleCreateUser = async () => {
    if (form.pin.length !== 4) return alert("PIN must be 4 digits");
    setLoading(true);
    try {
      await createUser(form);
      setForm({ name: "", email: "", password: "", pin: "" });
      setSelectedUser(null);
      setShowForm(false);
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
    setShowPinModal(true);
  };

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await verifyAdmin(adminPassword);
      await deleteUser(deleteId);
      setShowDeleteModal(false);
      setAdminPassword("");
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePin = async () => {
    if (newPin.length !== 4) return alert("PIN must be 4 digits");
    setLoading(true);
    try {
      await verifyAdmin(adminPassword);
      await updateUserPin(selectedUser._id, newPin, adminPassword);
      alert("PIN updated successfully");
      setShowPinModal(false);
      setAdminPassword("");
      setNewPin("");
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) =>
    name?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || "U";

  const getAvatarColor = (index: number) => COLORS[index % COLORS.length];

  return (
    <div className="flex min-h-screen bg-[#FAF6F1]">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-[240px]" : "ml-0"}`}>
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">

          {/* ── PAGE HEADER ── */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl font-bold text-[#3D2314] tracking-tight">User Management</h1>
                <p className="text-xs text-[#A0856C] mt-0.5">{users.length} registered users</p>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedUser(null);
                setForm({ name: "", email: "", password: "", pin: "" });
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-gradient-to-br from-[#5C4033] to-[#3D2314] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-[0_4px_14px_rgba(61,35,20,0.3)] hover:shadow-[0_6px_20px_rgba(61,35,20,0.4)] transition-all duration-200 hover:-translate-y-0.5"
            >
              <FaUserPlus size={14} />
              Add User
            </button>
          </div>

          {/* ── TABLE CARD ── */}
          <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(92,64,51,0.06)] border border-[#EFE8DF] overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-1 border-b border-[#EFE8DF]">
              <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-br from-[#C8A882] to-[#8B6F5E]" />
              <h2 className="text-sm font-bold text-[#3D2314] tracking-tight">All Users</h2>
              {/* ── SEARCH ── */}
              <div className="w-full max-w-sm ml-auto">
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>

            <div className="overflow-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#FAF6F1]">
                    <th className="p-4 text-left text-[11px] font-bold text-[#A0856C] uppercase tracking-widest">User</th>
                    <th className="p-4 text-center text-[11px] font-bold text-[#A0856C] uppercase tracking-widest">Email</th>
                    <th className="p-4 text-center text-[11px] font-bold text-[#A0856C] uppercase tracking-widest">PIN</th>
                    <th className="p-4 text-center text-[11px] font-bold text-[#A0856C] uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-12 text-[#A0856C] text-sm">
                        No users found. Add your first user!
                      </td>
                    </tr>
                  ) : (
                    users.map((u, idx) => (
                      <tr key={u._id} className="border-t border-[#F5F0EB] hover:bg-[#FAF6F1] transition-colors group">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                              style={{ background: getAvatarColor(idx) }}
                            >
                              {getInitials(u.name)}
                            </div>
                            <div>
                              <p className="font-semibold text-[#3D2314] text-sm">{u.name}</p>
                              <p className="text-[11px] text-[#A0856C]">User</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center text-[#5C4033] text-sm">{u.email}</td>
                        <td className="p-4 text-center">
                          <span className="bg-[#F5EDE3] text-[#8B6F5E] rounded-lg px-3 py-1 text-xs font-bold tracking-widest">
                            ••••
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleSelectUser(u)}
                              className="w-8 h-8 rounded-lg bg-[#F5EDE3] hover:bg-[#EDD9C8] text-[#8B6F5E] flex items-center justify-center transition-colors"
                              title="Edit PIN"
                            >
                              <MdEdit size={14} />
                            </button>
                            <button
                              onClick={() => openDeleteModal(u._id)}
                              className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-500 flex items-center justify-center transition-colors"
                              title="Delete User"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          CREATE USER MODAL
      ══════════════════════════════════════ */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">

            {/* Modal top accent */}
            <div className="h-1.5 bg-gradient-to-r from-[#5C4033] via-[#8B6F5E] to-[#C8A882]" />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5C4033] to-[#3D2314] flex items-center justify-center shadow-md">
                    <FaUserPlus className="text-white" size={14} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3D2314] text-base">Create New User</h3>
                    <p className="text-xs text-[#A0856C]">Fill in the details below</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-8 h-8 rounded-lg hover:bg-[#F5EDE3] flex items-center justify-center text-[#A0856C] hover:text-[#5C4033] transition-colors"
                >
                  <IoClose size={18} />
                </button>
              </div>

              {/* Form Fields */}
              <div className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={form.name}
                    className="w-full px-4 py-3 border-2 border-[#EFE8DF] rounded-xl text-sm text-[#3D2314] placeholder-[#C8A882] bg-[#FAF6F1] focus:outline-none focus:border-[#8B6F5E] focus:bg-white transition-all"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. john@example.com"
                    value={form.email}
                    className="w-full px-4 py-3 border-2 border-[#EFE8DF] rounded-xl text-sm text-[#3D2314] placeholder-[#C8A882] bg-[#FAF6F1] focus:outline-none focus:border-[#8B6F5E] focus:bg-white transition-all"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter secure password"
                      value={form.password}
                      className="w-full px-4 py-3 pr-12 border-2 border-[#EFE8DF] rounded-xl text-sm text-[#3D2314] placeholder-[#C8A882] bg-[#FAF6F1] focus:outline-none focus:border-[#8B6F5E] focus:bg-white transition-all"
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A0856C] hover:text-[#5C4033] transition-colors"
                    >
                      {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                </div>

                {/* PIN */}
                <div>
                  <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase tracking-wider">4-Digit PIN</label>
                  <div className="flex gap-3 justify-center">
                    {[0, 1, 2, 3].map((i) => (
                      <input
                        key={i}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={form.pin[i] || ""}
                        className="w-14 h-14 text-center text-xl font-bold border-2 border-[#EFE8DF] rounded-xl text-[#3D2314] bg-[#FAF6F1] focus:outline-none focus:border-[#8B6F5E] focus:bg-white transition-all"
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 1);
                          const pinArr = (form.pin + "    ").slice(0, 4).split("");
                          pinArr[i] = val;
                          setForm({ ...form, pin: pinArr.join("").trim() });
                          if (val && e.target.nextElementSibling) {
                            (e.target.nextElementSibling as HTMLInputElement).focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !form.pin[i] && e.currentTarget.previousElementSibling) {
                            (e.currentTarget.previousElementSibling as HTMLInputElement).focus();
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleCreateUser}
                  disabled={loading}
                  className="w-full bg-gradient-to-br from-[#5C4033] to-[#3D2314] text-white py-3.5 rounded-xl font-semibold text-sm mt-2 shadow-[0_4px_14px_rgba(61,35,20,0.3)] hover:shadow-[0_6px_20px_rgba(61,35,20,0.4)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      <FaUserPlus size={13} />
                      Create User
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          DELETE MODAL
      ══════════════════════════════════════ */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-red-400 to-red-500" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <FaTrash className="text-red-400" size={14} />
                </div>
                <div>
                  <h3 className="font-bold text-[#3D2314] text-base">Delete User</h3>
                  <p className="text-xs text-[#A0856C]">This action cannot be undone</p>
                </div>
              </div>

              <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase tracking-wider">Admin Password</label>
              <div className="relative mb-4">
                <input
                  type={showAdminPass ? "text" : "password"}
                  placeholder="Enter your admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-2 border-[#EFE8DF] rounded-xl text-sm text-[#3D2314] placeholder-[#C8A882] bg-[#FAF6F1] focus:outline-none focus:border-red-300 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPass(!showAdminPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A0856C] hover:text-[#5C4033] transition-colors"
                >
                  {showAdminPass ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setShowDeleteModal(false); setAdminPassword(""); }}
                  className="flex-1 py-2.5 rounded-xl border-2 border-[#EFE8DF] text-[#8B6F5E] text-sm font-semibold hover:bg-[#FAF6F1] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-1.5"
                >
                  {loading ? (
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      <FaTrash size={11} />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          UPDATE PIN MODAL
      ══════════════════════════════════════ */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-[#5C4033] via-[#8B6F5E] to-[#C8A882]" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C8A882] to-[#8B6F5E] flex items-center justify-center text-white font-bold text-sm">
                    {getInitials(selectedUser?.name)}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3D2314] text-base">Update PIN</h3>
                    <p className="text-xs text-[#A0856C]">{selectedUser?.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => { setShowPinModal(false); setAdminPassword(""); setNewPin(""); }}
                  className="w-8 h-8 rounded-lg hover:bg-[#F5EDE3] flex items-center justify-center text-[#A0856C] transition-colors"
                >
                  <IoClose size={18} />
                </button>
              </div>

              {/* New PIN boxes */}
              <label className="block text-xs font-semibold text-[#5C4033] mb-2 uppercase tracking-wider">New 4-Digit PIN</label>
              <div className="flex gap-3 justify-center mb-4">
                {[0, 1, 2, 3].map((i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={newPin[i] || ""}
                    className="w-14 h-14 text-center text-xl font-bold border-2 border-[#EFE8DF] rounded-xl text-[#3D2314] bg-[#FAF6F1] focus:outline-none focus:border-[#8B6F5E] focus:bg-white transition-all"
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 1);
                      const pinArr = (newPin + "    ").slice(0, 4).split("");
                      pinArr[i] = val;
                      setNewPin(pinArr.join("").trim());
                      if (val && e.target.nextElementSibling) {
                        (e.target.nextElementSibling as HTMLInputElement).focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !newPin[i] && e.currentTarget.previousElementSibling) {
                        (e.currentTarget.previousElementSibling as HTMLInputElement).focus();
                      }
                    }}
                  />
                ))}
              </div>

              {/* Admin password */}
              <label className="block text-xs font-semibold text-[#5C4033] mb-1.5 uppercase tracking-wider">Admin Password</label>
              <div className="relative mb-4">
                <input
                  type={showAdminPassPin ? "text" : "password"}
                  placeholder="Enter your admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-2 border-[#EFE8DF] rounded-xl text-sm text-[#3D2314] placeholder-[#C8A882] bg-[#FAF6F1] focus:outline-none focus:border-[#8B6F5E] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassPin(!showAdminPassPin)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A0856C] hover:text-[#5C4033] transition-colors"
                >
                  {showAdminPassPin ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>

              <button
                onClick={handleUpdatePin}
                disabled={loading}
                className="w-full bg-gradient-to-br from-[#5C4033] to-[#3D2314] text-white py-3.5 rounded-xl font-semibold text-sm shadow-[0_4px_14px_rgba(61,35,20,0.3)] hover:shadow-[0_6px_20px_rgba(61,35,20,0.4)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  "Update PIN"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateUser;