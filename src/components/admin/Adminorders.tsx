// import {
//   AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
//   PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar
// } from "recharts";
// import { useEffect, useMemo, useState, type ReactNode } from "react";
// import { getAdminDashboard } from "../../api/apiServices";
// import AdminHeader from "./AdminHeader";
// import AdminSidebar from "./AdminSidebar";
// import { FaAngleDown, FaSearch, FaBox, FaCheckCircle, FaClock, FaTruck, FaTimes } from "react-icons/fa";

// /* ─── Constants ─────────────────────────────────────── */
// const COLORS = ["#5C4033", "#8B6F5E", "#C8A882", "#E9DCCF", "#A0856C"];
// const STATUS_META: Record<string, { color: string; bg: string; icon: ReactNode }> = {
//   pending:    { color: "#C8A882", bg: "#FDF7F0", icon: <FaClock size={11} /> },
//   processing: { color: "#8B6F5E", bg: "#F5EDE3", icon: <FaBox size={11} /> },
//   shipped:    { color: "#5C4033", bg: "#EDE0D5", icon: <FaTruck size={11} /> },
//   delivered:  { color: "#3D7A5C", bg: "#EAF5EF", icon: <FaCheckCircle size={11} /> },
//   cancelled:  { color: "#B94A4A", bg: "#FAEAEA", icon: <FaTimes size={11} /> },
// };

// const formatINR = (v: number) => `₹${Number(v).toLocaleString("en-IN")}`;
// const fmtDate = (d: string) =>
//   new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

// /* ─── Custom Tooltip ─────────────────────────────────── */
// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (!active || !payload?.length) return null;
//   return (
//     <div className="bg-white border border-[#E9DCCF] rounded-xl px-4 py-3 shadow-lg text-sm text-[#5C4033]">
//       <div className="font-bold mb-1 text-[#3D2314]">{label}</div>
//       {payload.map((p: any, i: number) => (
//         <div key={i} className="text-[#8B6F5E]">
//           {p.name}:{" "}
//           <strong className="text-[#5C4033]">
//             {p.name === "revenue" ? formatINR(p.value) : Number(p.value).toLocaleString("en-IN")}
//           </strong>
//         </div>
//       ))}
//     </div>
//   );
// };

// /* ─── Time Filter ─────────────────────────────────────── */
// const filterByTime = (orders: any[], filter: string) => {
//   const now = new Date();
//   return orders.filter((o) => {
//     const d = new Date(o.createdAt);
//     if (filter === "week")   { const w = new Date(); w.setDate(now.getDate() - 7);  return d >= w; }
//     if (filter === "2weeks") { const w = new Date(); w.setDate(now.getDate() - 14); return d >= w; }
//     if (filter === "month")  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
//     if (filter === "year")   return d.getFullYear() === now.getFullYear();
//     return true;
//   });
// };

// /* ─── Helpers ─────────────────────────────────────────── */
// const getUserId   = (o: any): string =>
//   typeof o.userId === "string" ? o.userId : o.userId?._id || "";

// const getUserName = (o: any): string =>
//   typeof o.userId === "object"
//     ? o.userId?.name || o.userId?.email || "Unknown"
//     : o.userId || "Unknown";

// /* ─── Main Component ──────────────────────────────────── */
// const AdminOrders = () => {
//   const [data, setData]                   = useState<any>(null);
//   const [timeFilter, setTimeFilter]       = useState("month");
//   const [statusFilter, setStatusFilter]   = useState("all");
//   const [selectedUser, setSelectedUser]   = useState("all");
//   const [search, setSearch]               = useState("");
//   const [sidebarOpen, setSidebarOpen]     = useState(false);
//   const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
//   const [page, setPage]                   = useState(1);
//   const PER_PAGE = 8;

//   useEffect(() => { getAdminDashboard().then(setData); }, []);

//   const orders: any[] = data?.orders || [];

//   /* ── Unique users list from all orders ── */
//   const userList = useMemo(() => {
//     const map = new Map<string, string>();
//     orders.forEach((o) => {
//       const id   = getUserId(o);
//       const name = getUserName(o);
//       if (id && !map.has(id)) map.set(id, name);
//     });
//     return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
//   }, [orders]);

//   /* ── Base = time + user filtered (used for charts & KPIs) ── */
//   const chartBase = useMemo(() => {
//     let base = filterByTime(orders, timeFilter);
//     if (selectedUser !== "all") {
//       base = base.filter((o) => String(getUserId(o)) === String(selectedUser));
//     }
//     return base;
//   }, [orders, timeFilter, selectedUser]);

//   /* ── Table filtered orders (also applies status + search) ── */
//   const filteredOrders = useMemo(() => {
//     let result = [...chartBase];
//     if (statusFilter !== "all") {
//       result = result.filter((o) => o.status === statusFilter);
//     }
//     if (search.trim()) {
//       const q = search.toLowerCase();
//       result = result.filter((o) => {
//         const name = getUserName(o).toLowerCase();
//         const oid  = (o._id || "").toLowerCase();
//         return name.includes(q) || oid.includes(q);
//       });
//     }
//     return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//   }, [chartBase, statusFilter, search]);

//   const totalPages = Math.ceil(filteredOrders.length / PER_PAGE);
//   const pageOrders = filteredOrders.slice((page - 1) * PER_PAGE, page * PER_PAGE);

//   /* ── Chart data ── */
//   const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

//   const chartData = useMemo(() => {
//     if (timeFilter === "week" || timeFilter === "2weeks") {
//       const map: Record<string, number> = {};
//       chartBase.forEach((o) => {
//         const k = new Date(o.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//         map[k] = (map[k] || 0) + (o.totalAmount || 0);
//       });
//       return Object.entries(map).map(([name, revenue]) => ({ name, revenue }));
//     }
//     const m = Array(12).fill(0);
//     chartBase.forEach((o) => { m[new Date(o.createdAt).getMonth()] += o.totalAmount || 0; });
//     return m.map((revenue, i) => ({ name: months[i], revenue }));
//   }, [chartBase, timeFilter]);

//   const statusData = useMemo(() => {
//     const map: Record<string, number> = {};
//     chartBase.forEach((o) => { map[o.status] = (map[o.status] || 0) + 1; });
//     return Object.entries(map).map(([name, value]) => ({ name, value }));
//   }, [chartBase]);

//   const valueRanges = useMemo(() => {
//     const buckets: Record<string, number> = { "<500": 0, "500-2K": 0, "2K-5K": 0, "5K-10K": 0, ">10K": 0 };
//     chartBase.forEach(({ totalAmount: a }) => {
//       if (a < 500)        buckets["<500"]++;
//       else if (a < 2000)  buckets["500-2K"]++;
//       else if (a < 5000)  buckets["2K-5K"]++;
//       else if (a < 10000) buckets["5K-10K"]++;
//       else                buckets[">10K"]++;
//     });
//     return Object.entries(buckets).map(([name, count]) => ({ name, count }));
//   }, [chartBase]);

//   const kpi = useMemo(() => {
//     const revenue   = chartBase.reduce((s, o) => s + (o.totalAmount || 0), 0);
//     const avg       = chartBase.length ? revenue / chartBase.length : 0;
//     const delivered = chartBase.filter((o) => o.status === "delivered").length;
//     return { revenue, count: chartBase.length, avg, delivered };
//   }, [chartBase]);

//   const axProps = { fontSize: 11, fill: "#A0856C" };

//   const selectedUserName = useMemo(
//     () => userList.find((u) => u.id === selectedUser)?.name || null,
//     [selectedUser, userList]
//   );

//   const clearUser = () => { setSelectedUser("all"); setPage(1); };

//   if (!data) return (
//     <div className="h-screen flex flex-col items-center justify-center bg-[#FAF6F1] gap-4">
//       <div className="w-11 h-11 rounded-full border-[3px] border-[#E9DCCF] border-t-[#8B6F5E] animate-spin" />
//       <span className="text-[#8B6F5E] text-sm tracking-widest">Loading orders…</span>
//     </div>
//   );

//   return (
//     <div className="flex min-h-screen bg-[#FAF6F1]">
//       <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-[240px]" : "ml-0"}`}>
//         <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         <main className="flex-1 px-7 py-7 overflow-y-auto flex flex-col gap-5">

//           {/* ── Header Bar ── */}
//           <div className="flex justify-between items-center bg-white rounded-2xl px-6 py-4 shadow-sm border border-[#EFE8DF]">
//             <div>
//               <h2 className="text-[19px] font-bold text-[#3D2314] tracking-tight">
//                 Orders Management
//                 {selectedUserName && (
//                   <span className="ml-2 text-sm font-normal text-[#8B6F5E]">
//                     — {selectedUserName}
//                   </span>
//                 )}
//               </h2>
//               <p className="text-xs text-[#A0856C] mt-0.5">
//                 {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
//               </p>
//             </div>

//             <div className="flex items-center gap-3">
//               {/* ── User Filter Dropdown ── */}
//               <Dropdown
//                 value={selectedUser}
//                 onChange={(v) => { setSelectedUser(v); setPage(1); }}
//                 options={[
//                   { value: "all", label: "All Users" },
//                   ...userList.map((u) => ({ value: u.id, label: u.name })),
//                 ]}
//               />

//               {/* ── Time Filter Dropdown ── */}
//               <Dropdown
//                 value={timeFilter}
//                 onChange={(v) => { setTimeFilter(v); setPage(1); }}
//                 options={[
//                   { value: "week",   label: "This Week" },
//                   { value: "2weeks", label: "Last 2 Weeks" },
//                   { value: "month",  label: "This Month" },
//                   { value: "year",   label: "This Year" },
//                 ]}
//               />

//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8A882] to-[#8B6F5E] flex items-center justify-center text-white font-bold text-sm cursor-pointer">
//                 A
//               </div>
//             </div>
//           </div>

//           {/* ── Active User Filter Badge ── */}
//           {selectedUserName && (
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2 bg-[#3D2314] text-[#E9DCCF] rounded-xl px-4 py-2 text-xs font-medium">
//                 <div className="w-5 h-5 rounded-full bg-[#C8A882] flex items-center justify-center text-[#3D2314] font-bold text-[10px]">
//                   {selectedUserName.charAt(0).toUpperCase()}
//                 </div>
//                 Viewing: {selectedUserName}
//                 <button onClick={clearUser} className="ml-1 text-[#C8A882] hover:text-white transition-colors">
//                   <FaTimes size={10} />
//                 </button>
//               </div>
//               <span className="text-xs text-[#A0856C]">
//                 {kpi.count} order{kpi.count !== 1 ? "s" : ""} · {formatINR(kpi.revenue)} total
//               </span>
//             </div>
//           )}

//           {/* ── KPI Cards ── */}
//           <div className="grid grid-cols-4 gap-5">
//             <StatCard label="Total Revenue"   value={formatINR(kpi.revenue)}          gradient="from-[#5C4033] to-[#3D2314]" sub={selectedUserName ? `${selectedUserName}'s revenue` : "Selected period"} />
//             <StatCard label="Total Orders"    value={kpi.count}                        gradient="from-[#8B6F5E] to-[#5C4033]" sub="All statuses" />
//             <StatCard label="Avg Order Value" value={formatINR(Math.round(kpi.avg))}  gradient="from-[#C8A882] to-[#8B6F5E]" sub="Per order" />
//             <StatCard label="Delivered"       value={kpi.delivered}                    gradient="from-[#3D7A5C] to-[#2D5C44]" sub="Successfully delivered" />
//           </div>

//           {/* ── Charts Row ── */}
//           <div className="grid grid-cols-3 gap-5">

//             <Box title={`Revenue Trend${selectedUserName ? ` · ${selectedUserName}` : ""}`} className="col-span-2">
//               <ResponsiveContainer width="100%" height={220}>
//                 <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 0 }}>
//                   <defs>
//                     <linearGradient id="ordRevGrad" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%"  stopColor="#8B6F5E" stopOpacity={0.25} />
//                       <stop offset="95%" stopColor="#8B6F5E" stopOpacity={0} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid stroke="#F0E8DF" strokeDasharray="4 4" vertical={false} />
//                   <XAxis dataKey="name" tick={axProps} axisLine={false} tickLine={false} />
//                   <YAxis width={80} tickFormatter={(v) => `₹${Number(v / 1000).toFixed(0)}K`} tick={axProps} axisLine={false} tickLine={false} />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Area type="monotone" dataKey="revenue" name="revenue" stroke="#8B6F5E" strokeWidth={2.5} fill="url(#ordRevGrad)" dot={false} activeDot={{ r: 5, fill: "#5C4033", stroke: "#fff", strokeWidth: 2 }} />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </Box>

//             <Box title="Order Status">
//               <ResponsiveContainer width="100%" height={140}>
//                 <PieChart>
//                   <Pie data={statusData} dataKey="value" outerRadius={60} innerRadius={35} paddingAngle={3}>
//                     {statusData.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
//                   </Pie>
//                   <Tooltip content={<CustomTooltip />} />
//                 </PieChart>
//               </ResponsiveContainer>
//               <div className="mt-1 space-y-1.5">
//                 {statusData.length === 0 && (
//                   <p className="text-xs text-[#A0856C] text-center mt-4">No data for this filter.</p>
//                 )}
//                 {statusData.map((s: any, i: number) => (
//                   <div key={s.name} className="flex items-center gap-2 text-xs text-[#5C4033]">
//                     <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
//                     <span className="flex-1 capitalize">{s.name}</span>
//                     <span className="font-bold text-[#3D2314]">{s.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </Box>

//           </div>

//           {/* ── Order Value Distribution ── */}
//           <Box title="Order Value Distribution">
//             <ResponsiveContainer width="100%" height={180}>
//               <BarChart data={valueRanges} margin={{ top: 5, right: 20, left: 20, bottom: 0 }} barSize={32}>
//                 <CartesianGrid stroke="#F0E8DF" strokeDasharray="4 4" vertical={false} />
//                 <XAxis dataKey="name" tick={axProps} axisLine={false} tickLine={false} />
//                 <YAxis width={50} tick={axProps} axisLine={false} tickLine={false} />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Bar dataKey="count" name="orders" radius={[6, 6, 0, 0]}>
//                   {valueRanges.map((_: any, i: number) => (
//                     <Cell key={i} fill={i % 2 === 0 ? "#8B6F5E" : "#C8A882"} />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </Box>

//           {/* ── Orders Table ── */}
//           <Box title="All Orders">
//             <div className="flex items-center gap-3 mb-4">
//               {/* Search */}
//               <div className="flex items-center gap-2 flex-1 bg-[#FAF6F1] border border-[#E9DCCF] rounded-xl px-4 py-2.5">
//                 <FaSearch size={12} className="text-[#A0856C]" />
//                 <input
//                   value={search}
//                   onChange={(e) => { setSearch(e.target.value); setPage(1); }}
//                   placeholder="Search by order ID or customer name…"
//                   className="flex-1 bg-transparent text-sm text-[#3D2314] placeholder:text-[#C8A882] outline-none"
//                 />
//               </div>

//               {/* Status filter */}
//               <Dropdown
//                 value={statusFilter}
//                 onChange={(v) => { setStatusFilter(v); setPage(1); }}
//                 options={[
//                   { value: "all",        label: "All Status" },
//                   { value: "pending",    label: "Pending" },
//                   { value: "processing", label: "Processing" },
//                   { value: "shipped",    label: "Shipped" },
//                   { value: "delivered",  label: "Delivered" },
//                   { value: "cancelled",  label: "Cancelled" },
//                 ]}
//               />

//               {/* Clear user filter shortcut */}
//               {selectedUser !== "all" && (
//                 <button
//                   onClick={clearUser}
//                   className="flex items-center gap-1.5 text-xs text-[#8B6F5E] border border-[#E9DCCF] hover:bg-[#F5EDE3] rounded-xl px-3 py-2.5 transition-colors whitespace-nowrap"
//                 >
//                   <FaTimes size={10} /> Clear User Filter
//                 </button>
//               )}
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto rounded-xl border border-[#EFE8DF]">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="bg-[#FAF6F1] text-[#A0856C] text-xs uppercase tracking-wider">
//                     <th className="text-left px-5 py-3.5 font-semibold">Order ID</th>
//                     <th className="text-left px-5 py-3.5 font-semibold">Customer</th>
//                     <th className="text-left px-5 py-3.5 font-semibold">Date</th>
//                     <th className="text-left px-5 py-3.5 font-semibold">Items</th>
//                     <th className="text-left px-5 py-3.5 font-semibold">Amount</th>
//                     <th className="text-left px-5 py-3.5 font-semibold">Status</th>
//                     <th className="text-left px-5 py-3.5 font-semibold">Details</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {pageOrders.length === 0 && (
//                     <tr>
//                       <td colSpan={7} className="text-center py-12 text-[#A0856C] text-sm">
//                         No orders found for the selected filters.
//                       </td>
//                     </tr>
//                   )}

//                   {pageOrders.map((order: any) => {
//                     const oid     = order._id || "—";
//                     const shortId = oid.slice(-8).toUpperCase();
//                     const uname   = getUserName(order);
//                     const uid     = getUserId(order);
//                     const status  = (order.status || "pending").toLowerCase();
//                     const meta    = STATUS_META[status] || STATUS_META["pending"];
//                     const isOpen  = expandedOrder === oid;
//                     const isActiveUser = selectedUser === uid;

//                     return (
//                       <>
//                         <tr key={oid} className="border-t border-[#F5F0EB] hover:bg-[#FAF6F1] transition-colors">
//                           <td className="px-5 py-4 font-mono text-[#3D2314] font-semibold text-xs">
//                             #{shortId}
//                           </td>

//                           {/* ── Clickable Customer Cell – filters by this user ── */}
//                           <td className="px-5 py-4">
//                             <button
//                               onClick={() => { setSelectedUser(isActiveUser ? "all" : uid); setPage(1); }}
//                               title={isActiveUser ? "Clear user filter" : `Filter orders by ${uname}`}
//                               className="flex items-center gap-2.5 group"
//                             >
//                               <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 transition-all
//                                 ${isActiveUser
//                                   ? "bg-[#3D2314] ring-2 ring-[#C8A882]"
//                                   : "bg-gradient-to-br from-[#C8A882] to-[#8B6F5E] group-hover:ring-2 group-hover:ring-[#C8A882]/50"
//                                 }`}
//                               >
//                                 {uname.charAt(0).toUpperCase()}
//                               </div>
//                               <span className={`font-medium transition-colors ${isActiveUser ? "text-[#3D2314]" : "text-[#3D2314] group-hover:text-[#8B6F5E]"}`}>
//                                 {uname}
//                               </span>
//                               {isActiveUser && (
//                                 <span className="text-[10px] text-[#C8A882] bg-[#3D2314] rounded-full px-1.5 py-0.5 leading-none">
//                                   active
//                                 </span>
//                               )}
//                             </button>
//                           </td>

//                           <td className="px-5 py-4 text-[#8B6F5E]">{fmtDate(order.createdAt)}</td>
//                           <td className="px-5 py-4 text-[#8B6F5E]">
//                             {order.cartItems?.length ?? 0} item{(order.cartItems?.length ?? 0) !== 1 ? "s" : ""}
//                           </td>
//                           <td className="px-5 py-4 font-bold text-[#3D2314]">
//                             {formatINR(order.totalAmount || 0)}
//                           </td>
//                           <td className="px-5 py-4">
//                             <span
//                               className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
//                               style={{ color: meta.color, background: meta.bg }}
//                             >
//                               {meta.icon}
//                               <span className="capitalize">{status}</span>
//                             </span>
//                           </td>
//                           <td className="px-5 py-4">
//                             <button
//                               onClick={() => setExpandedOrder(isOpen ? null : oid)}
//                               className="text-xs text-[#8B6F5E] border border-[#E9DCCF] hover:bg-[#F5EDE3] rounded-lg px-3 py-1.5 transition-colors font-medium"
//                             >
//                               {isOpen ? "Hide" : "View"}
//                             </button>
//                           </td>
//                         </tr>

//                         {/* Expanded Row */}
//                         {isOpen && (
//                           <tr key={`${oid}-expanded`} className="bg-[#FAF6F1]">
//                             <td colSpan={7} className="px-5 py-4">
//                               <div className="rounded-xl border border-[#E9DCCF] bg-white p-4">
//                                 <p className="text-xs font-bold text-[#A0856C] uppercase tracking-wider mb-3">Order Items</p>
//                                 {order.cartItems?.length ? (
//                                   <div className="grid grid-cols-2 gap-2">
//                                     {order.cartItems.map((item: any, idx: number) => (
//                                       <div key={idx} className="flex items-center gap-3 bg-[#FAF6F1] rounded-xl p-3">
//                                         {item.image ? (
//                                           <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover border border-[#E9DCCF]" />
//                                         ) : (
//                                           <div className="w-10 h-10 rounded-lg bg-[#EFE8DF] flex items-center justify-center text-[#C8A882]">
//                                             <FaBox size={14} />
//                                           </div>
//                                         )}
//                                         <div className="flex-1 min-w-0">
//                                           <p className="text-sm font-semibold text-[#3D2314] truncate">{item.title}</p>
//                                           <p className="text-xs text-[#A0856C]">Qty: {item.quantity} × {formatINR(item.price || 0)}</p>
//                                         </div>
//                                         <span className="text-sm font-bold text-[#5C4033]">
//                                           {formatINR((item.quantity || 1) * (item.price || 0))}
//                                         </span>
//                                       </div>
//                                     ))}
//                                   </div>
//                                 ) : (
//                                   <p className="text-sm text-[#A0856C]">No items found.</p>
//                                 )}

//                                 <div className="mt-4 pt-3 border-t border-[#EFE8DF] flex items-center gap-6 text-xs text-[#8B6F5E]">
//                                   <span>Order ID: <strong className="text-[#3D2314] font-mono">#{oid.toUpperCase()}</strong></span>
//                                   {order.paymentMethod && <span>Payment: <strong className="text-[#3D2314]">{order.paymentMethod}</strong></span>}
//                                   {order.address && (
//                                     <span className="truncate max-w-xs">
//                                       Ship to: <strong className="text-[#3D2314]">
//                                         {[order.address.street, order.address.city, order.address.state].filter(Boolean).join(", ")}
//                                       </strong>
//                                     </span>
//                                   )}
//                                   <span className="ml-auto font-bold text-base text-[#3D2314]">
//                                     Total: {formatINR(order.totalAmount || 0)}
//                                   </span>
//                                 </div>
//                               </div>
//                             </td>
//                           </tr>
//                         )}
//                       </>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F0E8DF]">
//                 <span className="text-xs text-[#A0856C]">
//                   Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filteredOrders.length)} of {filteredOrders.length} orders
//                 </span>
//                 <div className="flex items-center gap-1.5">
//                   <PaginationBtn disabled={page === 1} onClick={() => setPage(p => p - 1)} label="←" />
//                   {Array.from({ length: totalPages }, (_, i) => i + 1)
//                     .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
//                     .reduce<(number | "…")[]>((acc, p, i, arr) => {
//                       if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("…");
//                       acc.push(p);
//                       return acc;
//                     }, [])
//                     .map((p, i) =>
//                       p === "…"
//                         ? <span key={`e${i}`} className="text-[#A0856C] px-1">…</span>
//                         : <PaginationBtn key={p} active={page === p} onClick={() => setPage(p as number)} label={String(p)} />
//                     )}
//                   <PaginationBtn disabled={page === totalPages} onClick={() => setPage(p => p + 1)} label="→" />
//                 </div>
//               </div>
//             )}
//           </Box>

//         </main>
//       </div>
//     </div>
//   );
// };

// /* ── UI Helpers ─────────────────────────────────────────── */
// const StatCard = ({ label, value, gradient, sub }: any) => (
//   <div className={`relative overflow-hidden rounded-[18px] p-6 bg-gradient-to-br ${gradient} shadow-[0_8px_28px_rgba(61,35,20,0.18)]`}>
//     <div className="absolute -right-4 -top-4 w-[90px] h-[90px] rounded-full bg-white/[0.07]" />
//     <div className="absolute right-6 -bottom-6 w-[60px] h-[60px] rounded-full bg-white/[0.05]" />
//     <p className="text-[11px] text-white/65 tracking-widest uppercase">{label}</p>
//     <h2 className="text-[26px] font-extrabold text-white mt-2 tracking-tight">{value}</h2>
//     <p className="mt-2.5 text-[11px] text-white/45">{sub}</p>
//   </div>
// );

// const Box = ({ title, children, className = "" }: any) => (
//   <div className={`bg-white rounded-[18px] p-6 shadow-[0_2px_16px_rgba(92,64,51,0.06)] border border-[#EFE8DF] ${className}`}>
//     <div className="flex items-center gap-2 text-sm font-bold text-[#3D2314] mb-4 tracking-tight">
//       <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-br from-[#C8A882] to-[#8B6F5E]" />
//       {title}
//     </div>
//     {children}
//   </div>
// );

// const Dropdown = ({ value, onChange, options }: {
//   value: string;
//   onChange: (v: string) => void;
//   options: { value: string; label: string }[];
// }) => (
//   <div className="relative">
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="appearance-none bg-[#3D2314] text-[#E9DCCF] border border-[#C8A882]/30 rounded-xl pl-5 pr-10 py-3.5 text-sm shadow-sm outline-none cursor-pointer transition-all duration-200 hover:bg-[#4b2e1d] focus:ring-2 focus:ring-[#C8A882]/40"
//     >
//       {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
//     </select>
//     <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#C8A882] text-xs">
//       <FaAngleDown />
//     </span>
//   </div>
// );

// const PaginationBtn = ({ label, onClick, active = false, disabled = false }: any) => (
//   <button
//     onClick={onClick}
//     disabled={disabled}
//     className={`
//       w-8 h-8 rounded-lg text-xs font-semibold transition-all
//       ${active   ? "bg-[#3D2314] text-white shadow-md" : ""}
//       ${!active && !disabled ? "text-[#8B6F5E] hover:bg-[#F5EDE3]" : ""}
//       ${disabled ? "text-[#D4C5BB] cursor-not-allowed" : "cursor-pointer"}
//     `}
//   >
//     {label}
//   </button>
// );

// export default AdminOrders;













import {
    AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
    PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar
} from "recharts";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { getAdminDashboard } from "../../api/apiServices";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import {
    FaAngleDown, FaSearch, FaBox, FaCheckCircle,
    FaClock, FaTruck, FaTimes, FaFire, FaChartLine,
    FaShoppingBag, FaStar
} from "react-icons/fa";

/* ───────────────────────────────────────────────────────────
   CONSTANTS
─────────────────────────────────────────────────────────── */
const PALETTE = {
    espresso: "#2C1810",
    mahogany: "#3D2314",
    walnut: "#5C4033",
    sienna: "#8B6F5E",
    caramel: "#C8A882",
    cream: "#E9DCCF",
    parchment: "#FAF6F1",
    linen: "#F5EDE3",
    sage: "#3D7A5C",
    rosewood: "#B94A4A",
};

const CHART_COLORS = [PALETTE.walnut, PALETTE.sienna, PALETTE.caramel, PALETTE.cream, "#A0856C"];

const STATUS_META: Record<string, { color: string; bg: string; glow: string; icon: ReactNode; label: string }> = {
    pending: { color: "#C8A882", bg: "rgba(200,168,130,0.12)", glow: "rgba(200,168,130,0.3)", icon: <FaClock size={10} />, label: "Pending" },
    processing: { color: "#8B6F5E", bg: "rgba(139,111,94,0.12)", glow: "rgba(139,111,94,0.3)", icon: <FaBox size={10} />, label: "Processing" },
    shipped: { color: "#A07040", bg: "rgba(160,112,64,0.12)", glow: "rgba(160,112,64,0.3)", icon: <FaTruck size={10} />, label: "Shipped" },
    delivered: { color: "#3D7A5C", bg: "rgba(61,122,92,0.12)", glow: "rgba(61,122,92,0.3)", icon: <FaCheckCircle size={10} />, label: "Delivered" },
    cancelled: { color: "#B94A4A", bg: "rgba(185,74,74,0.12)", glow: "rgba(185,74,74,0.3)", icon: <FaTimes size={10} />, label: "Cancelled" },
};

const formatINR = (v: number) => `₹${Number(v).toLocaleString("en-IN")}`;
const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

/* ───────────────────────────────────────────────────────────
   CUSTOM TOOLTIP
─────────────────────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: "rgba(44,24,16,0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(200,168,130,0.2)",
            borderRadius: 14,
            padding: "10px 16px",
            boxShadow: "0 8px 32px rgba(44,24,16,0.4)",
        }}>
            <div style={{ color: PALETTE.caramel, fontSize: 11, fontWeight: 700, marginBottom: 6, letterSpacing: "0.05em" }}>
                {label}
            </div>
            {payload.map((p: any, i: number) => (
                <div key={i} style={{ color: PALETTE.cream, fontSize: 12 }}>
                    {p.name}:{" "}
                    <strong style={{ color: "#fff" }}>
                        {p.name === "revenue" ? formatINR(p.value) : Number(p.value).toLocaleString("en-IN")}
                    </strong>
                </div>
            ))}
        </div>
    );
};

/* ───────────────────────────────────────────────────────────
   TIME FILTER
─────────────────────────────────────────────────────────── */
const filterByTime = (orders: any[], filter: string) => {
    const now = new Date();
    return orders.filter((o) => {
        const d = new Date(o.createdAt);
        if (filter === "week") { const w = new Date(); w.setDate(now.getDate() - 7); return d >= w; }
        if (filter === "2weeks") { const w = new Date(); w.setDate(now.getDate() - 14); return d >= w; }
        if (filter === "month") return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        if (filter === "year") return d.getFullYear() === now.getFullYear();
        return true;
    });
};

const getUserId = (o: any): string => typeof o.userId === "string" ? o.userId : o.userId?._id || "";
const getUserName = (o: any): string =>
    typeof o.userId === "object" ? o.userId?.name || o.userId?.email || "Unknown" : o.userId || "Unknown";

/* ───────────────────────────────────────────────────────────
   MAIN COMPONENT
─────────────────────────────────────────────────────────── */
const AdminOrders = () => {
    const [data, setData] = useState<any>(null);
    const [timeFilter, setTimeFilter] = useState("month");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedUser, setSelectedUser] = useState("all");
    const [search, setSearch] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const PER_PAGE = 8;

    useEffect(() => { getAdminDashboard().then(setData); }, []);

    const orders: any[] = data?.orders || [];

    const userList = useMemo(() => {
        const map = new Map<string, string>();
        orders.forEach((o) => {
            const id = getUserId(o), name = getUserName(o);
            if (id && !map.has(id)) map.set(id, name);
        });
        return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
    }, [orders]);

    const chartBase = useMemo(() => {
        let base = filterByTime(orders, timeFilter);
        if (selectedUser !== "all") base = base.filter((o) => String(getUserId(o)) === String(selectedUser));
        return base;
    }, [orders, timeFilter, selectedUser]);

    const filteredOrders = useMemo(() => {
        let result = [...chartBase];
        if (statusFilter !== "all") result = result.filter((o) => o.status === statusFilter);
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter((o) => getUserName(o).toLowerCase().includes(q) || (o._id || "").toLowerCase().includes(q));
        }
        return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [chartBase, statusFilter, search]);

    const totalPages = Math.ceil(filteredOrders.length / PER_PAGE);
    const pageOrders = filteredOrders.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const chartData = useMemo(() => {
        if (timeFilter === "week" || timeFilter === "2weeks") {
            const map: Record<string, number> = {};
            chartBase.forEach((o) => {
                const k = new Date(o.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
                map[k] = (map[k] || 0) + (o.totalAmount || 0);
            });
            return Object.entries(map).map(([name, revenue]) => ({ name, revenue }));
        }
        const m = Array(12).fill(0);
        chartBase.forEach((o) => { m[new Date(o.createdAt).getMonth()] += o.totalAmount || 0; });
        return m.map((revenue, i) => ({ name: months[i], revenue }));
    }, [chartBase, timeFilter]);

    const statusData = useMemo(() => {
        const map: Record<string, number> = {};
        chartBase.forEach((o) => { map[o.status] = (map[o.status] || 0) + 1; });
        return Object.entries(map).map(([name, value]) => ({ name, value }));
    }, [chartBase]);

    const valueRanges = useMemo(() => {
        const buckets: Record<string, number> = { "<500": 0, "500-2K": 0, "2K-5K": 0, "5K-10K": 0, ">10K": 0 };
        chartBase.forEach(({ totalAmount: a }) => {
            if (a < 500) buckets["<500"]++;
            else if (a < 2000) buckets["500-2K"]++;
            else if (a < 5000) buckets["2K-5K"]++;
            else if (a < 10000) buckets["5K-10K"]++;
            else buckets[">10K"]++;
        });
        return Object.entries(buckets).map(([name, count]) => ({ name, count }));
    }, [chartBase]);

    const kpi = useMemo(() => {
        const revenue = chartBase.reduce((s, o) => s + (o.totalAmount || 0), 0);
        const avg = chartBase.length ? revenue / chartBase.length : 0;
        const delivered = chartBase.filter((o) => o.status === "delivered").length;
        return { revenue, count: chartBase.length, avg, delivered };
    }, [chartBase]);

    const selectedUserName = useMemo(
        () => userList.find((u) => u.id === selectedUser)?.name || null,
        [selectedUser, userList]
    );

    const clearUser = () => { setSelectedUser("all"); setPage(1); };

    const axProps = { fontSize: 10, fill: "#A0856C" };

    if (!data) return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#FAF6F1] gap-4">
            <div className="w-12 h-12 rounded-full border-[3px] border-[#E9DCCF] border-t-[#8B6F5E] animate-spin" />
            <span className="text-[#8B6F5E] text-xs tracking-[0.2em] uppercase">Loading orders</span>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#FAF6F1]">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-[240px]" : "ml-0"}`}>
                <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 px-6 py-6 overflow-y-auto flex flex-col gap-5">

                    {/* ══════════════════════════════════════════
              HERO HEADER — dark immersive strip
          ══════════════════════════════════════════ */}
                    <div
                        className="relative rounded-2xl overflow-hidden"
                        style={{
                            background: `linear-gradient(135deg, ${PALETTE.espresso} 0%, ${PALETTE.mahogany} 50%, ${PALETTE.walnut} 100%)`,
                            boxShadow: "0 20px 60px rgba(44,24,16,0.35)",
                        }}
                    >
                        {/* Decorative orbs */}
                        <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full opacity-10"
                            style={{ background: `radial-gradient(circle, ${PALETTE.caramel}, transparent)` }} />
                        <div className="absolute -bottom-8 left-20 w-40 h-40 rounded-full opacity-10"
                            style={{ background: `radial-gradient(circle, ${PALETTE.sienna}, transparent)` }} />
                        {/* Grid texture overlay */}
                        <div className="absolute inset-0 opacity-[0.04]"
                            style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 30px,rgba(255,255,255,1) 30px,rgba(255,255,255,1) 31px),repeating-linear-gradient(90deg,transparent,transparent 30px,rgba(255,255,255,1) 30px,rgba(255,255,255,1) 31px)" }} />

                        <div className="relative px-8 py-6 flex justify-between items-center">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C8A882] animate-pulse" />
                                    <span className="text-[#C8A882] text-[10px] tracking-[0.25em] uppercase font-semibold">
                                        Admin Panel
                                    </span>
                                </div>
                                <h1 className="text-2xl font-black text-white tracking-tight leading-tight">
                                    Orders Management
                                    {selectedUserName && (
                                        <span className="ml-3 text-base font-normal text-[#C8A882]">
                                            · {selectedUserName}
                                        </span>
                                    )}
                                </h1>
                                <p className="text-[#A0856C] text-xs mt-1">
                                    {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                                </p>
                            </div>

                            {/* Controls cluster */}
                            <div className="flex items-center gap-3">
                                <StyledSelect
                                    value={selectedUser}
                                    onChange={(v: string) => { setSelectedUser(v); setPage(1); }}
                                    options={[{ value: "all", label: "All Users" }, ...userList.map((u) => ({ value: u.id, label: u.name }))]}
                                    icon={<FaStar size={10} />}
                                />
                                <StyledSelect
                                    value={timeFilter}
                                    onChange={(v: string) => { setTimeFilter(v); setPage(1); }}
                                    options={[
                                        { value: "week", label: "This Week" },
                                        { value: "2weeks", label: "Last 2 Weeks" },
                                        { value: "month", label: "This Month" },
                                        { value: "year", label: "This Year" },
                                    ]}
                                    icon={<FaChartLine size={10} />}
                                />
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C8A882] to-[#8B6F5E] flex items-center justify-center text-white font-black text-sm shadow-lg cursor-pointer">
                                    A
                                </div>
                            </div>
                        </div>

                        {/* Active user pill inside hero */}
                        {selectedUserName && (
                            <div className="px-8 pb-4 flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-3.5 py-1.5 text-xs">
                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#C8A882] to-[#8B6F5E] flex items-center justify-center text-white font-bold text-[10px]">
                                        {selectedUserName.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-[#E9DCCF] font-medium">{selectedUserName}</span>
                                    <button onClick={clearUser} className="text-[#A0856C] hover:text-white transition-colors ml-1">
                                        <FaTimes size={9} />
                                    </button>
                                </div>
                                <span className="text-[#7A6050] text-xs">
                                    {kpi.count} orders · {formatINR(kpi.revenue)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* ══════════════════════════════════════════
              KPI CARDS — 4-up with accent strips
          ══════════════════════════════════════════ */}
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            {
                                label: "Total Revenue",
                                value: formatINR(kpi.revenue),
                                sub: selectedUserName ? `${selectedUserName}'s spend` : "Selected period",
                                icon: <FaFire size={16} />,
                                accent: PALETTE.walnut,
                                accentLight: "rgba(92,64,51,0.08)",
                            },
                            {
                                label: "Total Orders",
                                value: kpi.count,
                                sub: "All statuses",
                                icon: <FaShoppingBag size={16} />,
                                accent: PALETTE.sienna,
                                accentLight: "rgba(139,111,94,0.08)",
                            },
                            {
                                label: "Avg Order Value",
                                value: formatINR(Math.round(kpi.avg)),
                                sub: "Per transaction",
                                icon: <FaChartLine size={16} />,
                                accent: "#A07040",
                                accentLight: "rgba(160,112,64,0.08)",
                            },
                            {
                                label: "Delivered",
                                value: kpi.delivered,
                                sub: "Successfully fulfilled",
                                icon: <FaCheckCircle size={16} />,
                                accent: PALETTE.sage,
                                accentLight: "rgba(61,122,92,0.08)",
                            },
                        ].map((card, i) => (
                            <div
                                key={i}
                                className="relative rounded-2xl overflow-hidden"
                                style={{
                                    background: "#fff",
                                    border: `1px solid ${PALETTE.cream}`,
                                    boxShadow: "0 2px 20px rgba(92,64,51,0.07)",
                                }}
                            >
                                {/* left accent bar */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: card.accent }} />

                                <div className="px-5 py-5 pl-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <p className="text-[10px] text-[#A0856C] tracking-[0.15em] uppercase font-semibold">{card.label}</p>
                                        <div
                                            className="w-9 h-9 rounded-xl flex items-center justify-center"
                                            style={{ background: card.accentLight, color: card.accent }}
                                        >
                                            {card.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-[22px] font-black text-[#2C1810] tracking-tight leading-none mb-1">
                                        {card.value}
                                    </h3>
                                    <p className="text-[10px] text-[#C8A882]">{card.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ══════════════════════════════════════════
              CHARTS ROW 1 — Area + Donut
          ══════════════════════════════════════════ */}
                    <div className="grid grid-cols-5 gap-4">

                        {/* Revenue Trend — spans 3 cols */}
                        <GlassCard title="Revenue Trend" subtitle={selectedUserName || "All users"} icon={<FaChartLine size={12} />} className="col-span-3">
                            <ResponsiveContainer width="100%" height={210}>
                                <AreaChart data={chartData} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="revGradPremium" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={PALETTE.sienna} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={PALETTE.sienna} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid stroke="#F0E8DF" strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" tick={axProps} axisLine={false} tickLine={false} />
                                    <YAxis width={72} tickFormatter={(v) => `₹${Number(v / 1000).toFixed(0)}K`} tick={axProps} axisLine={false} tickLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone" dataKey="revenue" name="revenue"
                                        stroke={PALETTE.sienna} strokeWidth={2.5}
                                        fill="url(#revGradPremium)" dot={false}
                                        activeDot={{ r: 5, fill: PALETTE.walnut, stroke: "#fff", strokeWidth: 2 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </GlassCard>

                        {/* Status Donut — spans 2 cols */}
                        <GlassCard title="Order Status" subtitle="Breakdown" icon={<FaBox size={12} />} className="col-span-2">
                            <div className="flex flex-col items-center">
                                <ResponsiveContainer width="100%" height={130}>
                                    <PieChart>
                                        <Pie data={statusData} dataKey="value" outerRadius={58} innerRadius={34} paddingAngle={3} startAngle={90} endAngle={-270}>
                                            {statusData.map((_: any, i: number) => (
                                                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                                {statusData.length === 0 && (
                                    <p className="text-xs text-[#C8A882] text-center mt-2">No data</p>
                                )}
                                <div className="w-full mt-2 space-y-2">
                                    {statusData.map((s: any, i: number) => {
                                        const total = statusData.reduce((acc: number, x: any) => acc + x.value, 0);
                                        const pct = total ? Math.round((s.value / total) * 100) : 0;
                                        return (
                                            <div key={s.name} className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                                                <span className="flex-1 text-[11px] text-[#5C4033] capitalize">{s.name}</span>
                                                <span className="text-[11px] text-[#A0856C]">{pct}%</span>
                                                <span className="text-[11px] font-bold text-[#3D2314] w-5 text-right">{s.value}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </GlassCard>

                    </div>

                    {/* ══════════════════════════════════════════
              CHARTS ROW 2 — Bar full width
          ══════════════════════════════════════════ */}
                    <GlassCard title="Order Value Distribution" subtitle="Basket size breakdown" icon={<FaShoppingBag size={12} />}>
                        <ResponsiveContainer width="100%" height={160}>
                            <BarChart data={valueRanges} margin={{ top: 4, right: 16, left: 8, bottom: 0 }} barSize={36}>
                                <CartesianGrid stroke="#F0E8DF" strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={axProps} axisLine={false} tickLine={false} />
                                <YAxis width={40} tick={axProps} axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="count" name="orders" radius={[6, 6, 0, 0]}>
                                    {valueRanges.map((_: any, i: number) => (
                                        <Cell key={i} fill={i % 2 === 0 ? PALETTE.sienna : PALETTE.caramel} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </GlassCard>

                    {/* ══════════════════════════════════════════
              ORDERS TABLE
          ══════════════════════════════════════════ */}
                    <div
                        className="rounded-2xl overflow-hidden"
                        style={{
                            background: "#fff",
                            border: `1px solid ${PALETTE.cream}`,
                            boxShadow: "0 4px 24px rgba(92,64,51,0.08)",
                        }}
                    >
                        {/* Table header band */}
                        <div
                            className="px-6 py-4 flex items-center justify-between"
                            style={{
                                background: `linear-gradient(90deg, ${PALETTE.espresso} 0%, ${PALETTE.mahogany} 100%)`,
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#C8A882]">
                                    <FaShoppingBag size={13} />
                                </div>
                                <div>
                                    <h3 className="text-white text-sm font-bold tracking-tight">All Orders</h3>
                                    <p className="text-[#7A6050] text-[10px]">{filteredOrders.length} results</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Search */}
                                <div
                                    className="flex items-center gap-2 rounded-xl px-4 py-2"
                                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                                >
                                    <FaSearch size={11} style={{ color: PALETTE.sienna }} />
                                    <input
                                        value={search}
                                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                        placeholder="Search orders…"
                                        className="bg-transparent text-sm outline-none w-44 placeholder:text-[#6A5048] text-[#E9DCCF]"
                                    />
                                    {search && (
                                        <button onClick={() => setSearch("")} className="text-[#6A5048] hover:text-[#C8A882] transition-colors">
                                            <FaTimes size={9} />
                                        </button>
                                    )}
                                </div>

                                {/* Status filter pills */}
                                <div className="flex items-center gap-1.5">
                                    {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => { setStatusFilter(s); setPage(1); }}
                                            className="text-[10px] px-2.5 py-1 rounded-lg font-semibold capitalize transition-all"
                                            style={statusFilter === s
                                                ? { background: PALETTE.caramel, color: PALETTE.mahogany }
                                                : { background: "rgba(255,255,255,0.07)", color: PALETTE.sienna }
                                            }
                                        >
                                            {s === "all" ? "All" : s}
                                        </button>
                                    ))}
                                </div>

                                {selectedUser !== "all" && (
                                    <button
                                        onClick={clearUser}
                                        className="flex items-center gap-1.5 text-[10px] text-[#8B6F5E] hover:text-[#C8A882] transition-colors border border-[rgba(200,168,130,0.2)] rounded-lg px-2.5 py-1.5"
                                    >
                                        <FaTimes size={8} /> Clear user
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr style={{ background: PALETTE.parchment, borderBottom: `1px solid ${PALETTE.cream}` }}>
                                        {["Order ID", "Customer", "Date", "Items", "Amount", "Status", ""].map((h) => (
                                            <th key={h} className="text-left px-5 py-3 text-[10px] text-[#A0856C] uppercase tracking-[0.12em] font-semibold">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageOrders.length === 0 && (
                                        <tr>
                                            <td colSpan={7}>
                                                <div className="flex flex-col items-center justify-center py-16 gap-3">
                                                    <div className="w-14 h-14 rounded-2xl bg-[#FAF6F1] flex items-center justify-center text-[#D4C5BB]">
                                                        <FaShoppingBag size={22} />
                                                    </div>
                                                    <p className="text-sm text-[#C8A882] font-medium">No orders found</p>
                                                    <p className="text-xs text-[#D4C5BB]">Try adjusting your filters</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    {pageOrders.map((order: any, rowIdx: number) => {
                                        const oid = order._id || "—";
                                        const shortId = oid.slice(-8).toUpperCase();
                                        const uname = getUserName(order);
                                        const uid = getUserId(order);
                                        const status = (order.status || "pending").toLowerCase();
                                        const meta = STATUS_META[status] || STATUS_META["pending"];
                                        const isOpen = expandedOrder === oid;
                                        const isActiveUser = selectedUser === uid;

                                        return (
                                            <>
                                                <tr
                                                    key={oid}
                                                    className="group transition-colors"
                                                    style={{
                                                        borderBottom: `1px solid ${PALETTE.linen}`,
                                                        background: rowIdx % 2 === 0 ? "#fff" : PALETTE.parchment,
                                                    }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FDF7F2")}
                                                    onMouseLeave={(e) => (e.currentTarget.style.background = rowIdx % 2 === 0 ? "#fff" : PALETTE.parchment)}
                                                >
                                                    {/* Order ID */}
                                                    <td className="px-5 py-4">
                                                        <span
                                                            className="font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg"
                                                            style={{ background: PALETTE.linen, color: PALETTE.walnut }}
                                                        >
                                                            #{shortId}
                                                        </span>
                                                    </td>

                                                    {/* Customer — clickable to filter */}
                                                    <td className="px-5 py-4">
                                                        <button
                                                            onClick={() => { setSelectedUser(isActiveUser ? "all" : uid); setPage(1); }}
                                                            title={isActiveUser ? "Clear filter" : `Filter by ${uname}`}
                                                            className="flex items-center gap-2.5 group/user"
                                                        >
                                                            <div
                                                                className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-black transition-all flex-shrink-0"
                                                                style={{
                                                                    background: isActiveUser
                                                                        ? `linear-gradient(135deg, ${PALETTE.mahogany}, ${PALETTE.walnut})`
                                                                        : `linear-gradient(135deg, ${PALETTE.caramel}, ${PALETTE.sienna})`,
                                                                    boxShadow: isActiveUser ? `0 0 0 2px ${PALETTE.caramel}` : "none",
                                                                }}
                                                            >
                                                                {uname.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className="text-left">
                                                                <div className="flex items-center gap-1.5">
                                                                    <span
                                                                        className="text-sm font-semibold transition-colors"
                                                                        style={{ color: isActiveUser ? PALETTE.mahogany : PALETTE.walnut }}
                                                                    >
                                                                        {uname}
                                                                    </span>
                                                                    {isActiveUser && (
                                                                        <span
                                                                            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                                                                            style={{ background: PALETTE.mahogany, color: PALETTE.caramel }}
                                                                        >
                                                                            active
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </button>
                                                    </td>

                                                    {/* Date */}
                                                    <td className="px-5 py-4 text-[#8B6F5E] text-sm">{fmtDate(order.createdAt)}</td>

                                                    {/* Items */}
                                                    <td className="px-5 py-4">
                                                        <span className="text-sm text-[#8B6F5E]">
                                                            {order.cartItems?.length ?? 0}
                                                            <span className="text-[#C8A882]"> item{(order.cartItems?.length ?? 0) !== 1 ? "s" : ""}</span>
                                                        </span>
                                                    </td>

                                                    {/* Amount */}
                                                    <td className="px-5 py-4">
                                                        <span className="text-sm font-black text-[#2C1810]">
                                                            {formatINR(order.totalAmount || 0)}
                                                        </span>
                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-5 py-4">
                                                        <span
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold"
                                                            style={{
                                                                color: meta.color,
                                                                background: meta.bg,
                                                                boxShadow: `0 0 0 1px ${meta.glow}`,
                                                            }}
                                                        >
                                                            {meta.icon}
                                                            {meta.label}
                                                        </span>
                                                    </td>

                                                    {/* View button */}
                                                    <td className="px-5 py-4">
                                                        <button
                                                            onClick={() => setExpandedOrder(isOpen ? null : oid)}
                                                            className="text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-all"
                                                            style={isOpen
                                                                ? { background: PALETTE.mahogany, color: PALETTE.caramel }
                                                                : { background: PALETTE.linen, color: PALETTE.sienna }
                                                            }
                                                        >
                                                            {isOpen ? "Close ↑" : "View ↓"}
                                                        </button>
                                                    </td>
                                                </tr>

                                                {/* ── Expanded Detail Row ── */}
                                                {isOpen && (
                                                    <tr key={`${oid}-exp`}>
                                                        <td colSpan={7} style={{ background: PALETTE.linen, borderBottom: `1px solid ${PALETTE.cream}` }}>
                                                            <div className="px-6 py-5">
                                                                {/* Header */}
                                                                <div className="flex items-center justify-between mb-4">
                                                                    <div className="flex items-center gap-2">
                                                                        <div
                                                                            className="w-1 h-5 rounded-full"
                                                                            style={{ background: PALETTE.sienna }}
                                                                        />
                                                                        <span className="text-xs font-bold text-[#3D2314] tracking-widest uppercase">
                                                                            Order Details
                                                                        </span>
                                                                        <span
                                                                            className="text-[10px] font-mono px-2 py-0.5 rounded"
                                                                            style={{ background: PALETTE.cream, color: PALETTE.walnut }}
                                                                        >
                                                                            #{oid.slice(-12).toUpperCase()}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-4 text-xs text-[#8B6F5E]">
                                                                        {order.paymentMethod && (
                                                                            <span className="flex items-center gap-1">
                                                                                <span className="text-[#C8A882]">Payment:</span>
                                                                                <strong className="text-[#3D2314]">{order.paymentMethod}</strong>
                                                                            </span>
                                                                        )}
                                                                        {order.address && (
                                                                            <span className="flex items-center gap-1 truncate max-w-xs">
                                                                                <span className="text-[#C8A882]">Ship to:</span>
                                                                                <strong className="text-[#3D2314]">
                                                                                    {[order.address.street, order.address.city, order.address.state].filter(Boolean).join(", ")}
                                                                                </strong>
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {/* Cart items grid */}
                                                                {order.cartItems?.length ? (
                                                                    <div className="grid grid-cols-3 gap-3">
                                                                        {order.cartItems.map((item: any, idx: number) => (
                                                                            <div
                                                                                key={idx}
                                                                                className="flex items-center gap-3 rounded-xl p-3"
                                                                                style={{
                                                                                    background: "#fff",
                                                                                    border: `1px solid ${PALETTE.cream}`,
                                                                                    boxShadow: "0 2px 8px rgba(92,64,51,0.05)",
                                                                                }}
                                                                            >
                                                                                {item.image ? (
                                                                                    <img
                                                                                        src={item.image}
                                                                                        alt={item.title}
                                                                                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                                                                                        style={{ border: `1px solid ${PALETTE.cream}` }}
                                                                                    />
                                                                                ) : (
                                                                                    <div
                                                                                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                                                                        style={{ background: PALETTE.linen, color: PALETTE.caramel }}
                                                                                    >
                                                                                        <FaBox size={16} />
                                                                                    </div>
                                                                                )}
                                                                                <div className="flex-1 min-w-0">
                                                                                    <p className="text-sm font-semibold text-[#2C1810] truncate">{item.title}</p>
                                                                                    <p className="text-[10px] text-[#A0856C] mt-0.5">
                                                                                        {item.quantity} × {formatINR(item.price || 0)}
                                                                                    </p>
                                                                                </div>
                                                                                <span
                                                                                    className="text-xs font-black flex-shrink-0"
                                                                                    style={{ color: PALETTE.walnut }}
                                                                                >
                                                                                    {formatINR((item.quantity || 1) * (item.price || 0))}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    <p className="text-sm text-[#A0856C]">No items.</p>
                                                                )}

                                                                {/* Total footer */}
                                                                <div
                                                                    className="mt-4 flex items-center justify-end gap-2 pt-3"
                                                                    style={{ borderTop: `1px solid ${PALETTE.cream}` }}
                                                                >
                                                                    <span className="text-xs text-[#A0856C]">Order Total</span>
                                                                    <span
                                                                        className="text-lg font-black"
                                                                        style={{ color: PALETTE.mahogany }}
                                                                    >
                                                                        {formatINR(order.totalAmount || 0)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* ── Pagination ── */}
                        {totalPages > 1 && (
                            <div
                                className="flex items-center justify-between px-6 py-3.5"
                                style={{ borderTop: `1px solid ${PALETTE.cream}`, background: PALETTE.parchment }}
                            >
                                <span className="text-[11px] text-[#A0856C]">
                                    {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filteredOrders.length)} of {filteredOrders.length} orders
                                </span>
                                <div className="flex items-center gap-1">
                                    <PagBtn disabled={page === 1} onClick={() => setPage(p => p - 1)} label="←" />
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                        .reduce<(number | "…")[]>((acc, p, i, arr) => {
                                            if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("…");
                                            acc.push(p);
                                            return acc;
                                        }, [])
                                        .map((p, i) =>
                                            p === "…"
                                                ? <span key={`e${i}`} className="text-[#C8A882] px-1 text-xs">…</span>
                                                : <PagBtn key={p} active={page === p} onClick={() => setPage(p as number)} label={String(p)} />
                                        )}
                                    <PagBtn disabled={page === totalPages} onClick={() => setPage(p => p + 1)} label="→" />
                                </div>
                            </div>
                        )}
                    </div>

                </main>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════
   REUSABLE SUB-COMPONENTS
═══════════════════════════════════════════════════════ */

/** Frosted-glass style card */
const GlassCard = ({ title, subtitle, icon, children, className = "" }: any) => (
    <div
        className={`rounded-2xl overflow-hidden ${className}`}
        style={{
            background: "#fff",
            border: `1px solid ${PALETTE.cream}`,
            boxShadow: "0 2px 20px rgba(92,64,51,0.06)",
        }}
    >
        <div
            className="flex items-center gap-2.5 px-5 pt-4 pb-3"
            style={{ borderBottom: `1px solid ${PALETTE.linen}` }}
        >
            <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: PALETTE.linen, color: PALETTE.sienna }}
            >
                {icon}
            </div>
            <div>
                <h4 className="text-sm font-bold text-[#3D2314] leading-none">{title}</h4>
                {subtitle && <p className="text-[10px] text-[#A0856C] mt-0.5">{subtitle}</p>}
            </div>
        </div>
        <div className="px-5 py-4">{children}</div>
    </div>
);

/** Styled select for the header */
const StyledSelect = ({ value, onChange, options, icon }: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  icon: React.ReactNode;
}) => (
    <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6050] pointer-events-none">{icon}</div>
        <select
            value={value}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
            className="appearance-none text-[#E9DCCF] text-xs rounded-xl pl-8 pr-8 py-2.5 outline-none cursor-pointer transition-all"
            style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(200,168,130,0.2)",
            }}
        >
            {options.map((o: any) => (
                <option key={o.value} value={o.value} style={{ background: PALETTE.mahogany }}>
                    {o.label}
                </option>
            ))}
        </select>
        <FaAngleDown size={9} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6050]" />
    </div>
);

/** Pagination button */
const PagBtn = ({ label, onClick, active = false, disabled = false }: any) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="w-8 h-8 rounded-lg text-[11px] font-bold transition-all"
        style={
            active
                ? { background: PALETTE.mahogany, color: PALETTE.caramel, boxShadow: "0 2px 8px rgba(44,24,16,0.25)" }
                : disabled
                    ? { color: "#D4C5BB", cursor: "not-allowed" }
                    : { color: PALETTE.sienna, background: "transparent" }
        }
    >
        {label}
    </button>
);

export default AdminOrders;