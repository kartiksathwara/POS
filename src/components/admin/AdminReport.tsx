// import { useEffect, useMemo, useState } from "react";
// import { getAdminDashboard } from "../../api/apiServices";
// import AdminHeader from "./AdminHeader";
// import AdminSidebar from "./AdminSidebar";
// import { FaAngleDown, FaDownload, FaFilePdf, FaFileExcel, FaFileCsv, FaArrowUp, FaArrowDown } from "react-icons/fa";

// /* ═══════════════════════════════════════
//    CONSTANTS
// ═══════════════════════════════════════ */
// const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
// const COLORS  = ["#5C4033","#8B6F5E","#C8A882","#E9DCCF","#A0856C"];

// const filterByTime = (orders: any[], filter: string) => {
//   const now = new Date();
//   return orders.filter((o) => {
//     const d = new Date(o.createdAt);
//     if (filter === "week")   { const w = new Date(); w.setDate(now.getDate()-7);  return d >= w; }
//     if (filter === "2weeks") { const w = new Date(); w.setDate(now.getDate()-14); return d >= w; }
//     if (filter === "month")  return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
//     if (filter === "year")   return d.getFullYear()===now.getFullYear();
//     return true;
//   });
// };

// const fmt = (v: number) => Number(v).toLocaleString("en-IN");

// /* ═══════════════════════════════════════
//    COMPONENT
// ═══════════════════════════════════════ */
// const AdminReport = () => {
//   const [data,        setData       ] = useState<any>(null);
//   const [timeFilter,  setTimeFilter ] = useState("month");
//   const [activeTab,   setActiveTab  ] = useState<"sales"|"products"|"users"|"orders">("sales");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [exportOpen,  setExportOpen ] = useState(false);

//   useEffect(() => { getAdminDashboard().then(setData); }, []);

//   const orders = data?.orders || [];
//   const users  = data?.userStats || [];

//   const filteredOrders = useMemo(() => filterByTime(orders, timeFilter), [orders, timeFilter]);

//   /* ── KPIs ── */
//   const totalRevenue    = filteredOrders.reduce((a: number, b: any) => a + (b.totalAmount || 0), 0);
//   const totalOrders     = filteredOrders.length;
//   const avgOrderValue   = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;
//   const deliveredOrders = filteredOrders.filter((o: any) => o.status === "Delivered").length;
//   const cancelledOrders = filteredOrders.filter((o: any) => o.status === "Cancelled").length;
//   const pendingOrders   = filteredOrders.filter((o: any) => o.status === "Pending").length;
//   const deliveryRate    = totalOrders ? Math.round((deliveredOrders / totalOrders) * 100) : 0;

//   /* ── Monthly breakdown ── */
//   const monthlyData = useMemo(() => {
//     const rev = Array(12).fill(0), cnt = Array(12).fill(0), can = Array(12).fill(0);
//     filteredOrders.forEach((o: any) => {
//       const m = new Date(o.createdAt).getMonth();
//       rev[m] += o.totalAmount || 0;
//       cnt[m] += 1;
//       if (o.status === "Cancelled") can[m] += 1;
//     });
//     return months.map((name, i) => ({ name, revenue: rev[i], orders: cnt[i], cancelled: can[i] }));
//   }, [filteredOrders]);

//   /* ── Top products ── */
//   const topProducts = useMemo(() => {
//     const map: any = {};
//     filteredOrders.forEach((o: any) => {
//       o.cartItems?.forEach((item: any) => {
//         if (!map[item.title]) map[item.title] = { qty: 0, revenue: 0 };
//         map[item.title].qty     += item.quantity;
//         map[item.title].revenue += (item.price || 0) * item.quantity;
//       });
//     });
//     return Object.entries(map)
//       .map(([title, v]: any) => ({ title, ...v }))
//       .sort((a: any, b: any) => b.revenue - a.revenue)
//       .slice(0, 10);
//   }, [filteredOrders]);

//   /* ── User activity ── */
//   const userActivity = useMemo(() => {
//     const map: any = {};
//     filteredOrders.forEach((o: any) => {
//       const uid  = typeof o.userId === "string" ? o.userId : o.userId?._id;
//       const name = users.find((u: any) => String(u.userId) === String(uid))?.name || "Unknown";
//       if (!map[uid]) map[uid] = { name, orders: 0, revenue: 0 };
//       map[uid].orders  += 1;
//       map[uid].revenue += o.totalAmount || 0;
//     });
//     return Object.values(map).sort((a: any, b: any) => b.revenue - a.revenue);
//   }, [filteredOrders, users]);

//   /* ── Status counts ── */
//   const statusMap = useMemo(() => {
//     const map: any = {};
//     filteredOrders.forEach((o: any) => { map[o.status] = (map[o.status] || 0) + 1; });
//     return map;
//   }, [filteredOrders]);

//   if (!data) return (
//     <div className="h-screen flex flex-col items-center justify-center bg-[#FAF6F1] gap-4">
//       <div className="w-11 h-11 rounded-full border-[3px] border-[#E9DCCF] border-t-[#8B6F5E] animate-spin" />
//       <span className="text-[#8B6F5E] text-sm tracking-widest">Loading reports…</span>
//     </div>
//   );

//   const TABS = [
//     { id: "sales",    label: "Sales Report"   },
//     { id: "products", label: "Product Report" },
//     { id: "users",    label: "Customer Report"},
//     { id: "orders",   label: "Order Report"   },
//   ] as const;

//   return (
//     <div className="flex min-h-screen bg-[#FAF6F1]">
//       <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-[240px]" : "ml-0"}`}>
//         <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         <main className="flex-1 px-7 py-7 overflow-y-auto flex flex-col gap-5">

//           {/* ── TOP BAR ── */}
//           <div className="flex justify-between items-center bg-white rounded-2xl px-6 py-4 shadow-sm border border-[#EFE8DF]">
//             <div>
//               <h2 className="text-[19px] font-bold text-[#3D2314] tracking-tight">Reports</h2>
//               <p className="text-xs text-[#A0856C] mt-0.5">
//                 {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
//               </p>
//             </div>

//             <div className="flex items-center gap-3">
//               {/* Time Filter */}
//               <div className="relative">
//                 <select
//                   value={timeFilter}
//                   onChange={(e) => setTimeFilter(e.target.value)}
//                   className="appearance-none bg-[#3D2314] text-[#E9DCCF] border border-[#C8A882]/30 rounded-xl pl-5 pr-10 py-3 text-sm outline-none cursor-pointer hover:bg-[#4b2e1d] transition-all"
//                 >
//                   <option value="week">This Week</option>
//                   <option value="2weeks">Last 2 Weeks</option>
//                   <option value="month">This Month</option>
//                   <option value="year">This Year</option>
//                 </select>
//                 <FaAngleDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#C8A882] text-xs" />
//               </div>

//               {/* Export */}
//               <div className="relative">
//                 <button
//                   onClick={() => setExportOpen(!exportOpen)}
//                   className="flex items-center gap-2 bg-[#3D2314] text-[#E9DCCF] border border-[#C8A882]/30 rounded-xl px-4 py-3 text-sm hover:bg-[#4b2e1d] transition-all"
//                 >
//                   <FaDownload className="text-[#C8A882] text-xs" />
//                   Export
//                   <FaAngleDown className="text-[#C8A882] text-xs" />
//                 </button>
//                 {exportOpen && (
//                   <div className="absolute right-0 mt-2 w-44 bg-white border border-[#EFE8DF] rounded-xl shadow-lg z-50 overflow-hidden">
//                     {[
//                       { label: "PDF",   icon: <FaFilePdf  className="text-[#C44B2B]" />, f: "pdf"  },
//                       { label: "Excel", icon: <FaFileExcel className="text-[#217346]" />, f: "xlsx" },
//                       { label: "CSV",   icon: <FaFileCsv  className="text-[#5C4033]" />,  f: "csv"  },
//                     ].map((item) => (
//                       <button key={item.f} onClick={() => { console.log("export", item.f); setExportOpen(false); }}
//                         className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#5C4033] hover:bg-[#FAF6F1] transition-colors border-b border-[#F5F0EB] last:border-b-0">
//                         {item.icon} Export as {item.label}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C8A882] to-[#8B6F5E] flex items-center justify-center text-white font-bold text-sm">A</div>
//             </div>
//           </div>

//           {/* ── KPI CARDS ── */}
//           <div className="grid grid-cols-4 gap-4">
//             {[
//               { label: "Total Revenue",   value: `₹${fmt(totalRevenue)}`,  sub: "Period total"              },
//               { label: "Total Orders",    value: fmt(totalOrders),          sub: "All statuses"              },
//               { label: "Avg Order Value", value: `₹${fmt(avgOrderValue)}`,  sub: "Per transaction"           },
//               { label: "Delivery Rate",   value: `${deliveryRate}%`,        sub: `${deliveredOrders} delivered` },
//             ].map(({ label, value, sub }, i) => (
//               <div key={label} className={`relative overflow-hidden rounded-[18px] p-5 bg-gradient-to-br shadow-[0_8px_28px_rgba(61,35,20,0.18)] ${
//                 i===0?"from-[#5C4033] to-[#3D2314]":i===1?"from-[#8B6F5E] to-[#5C4033]":i===2?"from-[#C8A882] to-[#8B6F5E]":"from-[#A0856C] to-[#5C4033]"
//               }`}>
//                 <div className="absolute -right-4 -top-4 w-[80px] h-[80px] rounded-full bg-white/[0.07]" />
//                 <p className="text-[10px] text-white/60 tracking-widest uppercase">{label}</p>
//                 <h2 className="text-[24px] font-extrabold text-white mt-1.5 tracking-tight">{value}</h2>
//                 <p className="mt-2 text-[11px] text-white/40">{sub}</p>
//               </div>
//             ))}
//           </div>

//           {/* ── TABS ── */}
//           <div className="flex items-center gap-1 bg-white rounded-2xl p-1.5 shadow-sm border border-[#EFE8DF] w-fit">
//             {TABS.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
//                   activeTab === tab.id
//                     ? "bg-[#3D2314] text-[#E9DCCF] shadow-[0_4px_14px_rgba(61,35,20,0.25)]"
//                     : "text-[#A0856C] hover:text-[#5C4033] hover:bg-[#FAF6F1]"
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {/* ══════════════════════════
//               SALES REPORT
//           ══════════════════════════ */}
//           {activeTab === "sales" && (
//             <>
//               {/* Summary stats row */}
//               <div className="grid grid-cols-5 gap-3">
//                 {[
//                   { label: "Revenue",    value: `₹${fmt(totalRevenue)}` },
//                   { label: "Orders",     value: fmt(totalOrders)         },
//                   { label: "Delivered",  value: fmt(deliveredOrders)     },
//                   { label: "Pending",    value: fmt(pendingOrders)       },
//                   { label: "Cancelled",  value: fmt(cancelledOrders)     },
//                 ].map(({ label, value }) => (
//                   <div key={label} className="bg-white rounded-xl px-4 py-3.5 border border-[#EFE8DF] shadow-sm text-center">
//                     <p className="text-[10px] text-[#A0856C] tracking-widest uppercase mb-1">{label}</p>
//                     <p className="text-[17px] font-extrabold text-[#3D2314]">{value}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Monthly Sales Table */}
//               <Box title="Monthly Sales Breakdown">
//                 <table className="w-full text-sm">
//                   <thead>
//                     <Thead cols={["Month","Orders","Revenue","Cancelled","Avg Order Value","vs Prev Month"]} />
//                   </thead>
//                   <tbody>
//                     {monthlyData.map((row, i) => {
//                       const prev = monthlyData[i - 1];
//                       const diff = prev ? row.revenue - prev.revenue : 0;
//                       const hasData = row.orders > 0;
//                       return (
//                         <tr key={i} className={`border-b border-[#F5F0EB] transition-colors ${hasData ? "hover:bg-[#FAF6F1]" : "opacity-40"}`}>
//                           <td className="py-3 pr-5 font-bold text-[#3D2314]">{row.name}</td>
//                           <td className="py-3 pr-5 text-[#5C4033]">{row.orders}</td>
//                           <td className="py-3 pr-5 font-semibold text-[#3D2314]">
//                             {row.revenue > 0 ? `₹${fmt(row.revenue)}` : "—"}
//                           </td>
//                           <td className="py-3 pr-5">
//                             {row.cancelled > 0
//                               ? <Badge color="red">{row.cancelled}</Badge>
//                               : <span className="text-[#A0856C]">—</span>}
//                           </td>
//                           <td className="py-3 pr-5 text-[#8B6F5E]">
//                             {row.orders ? `₹${fmt(Math.round(row.revenue / row.orders))}` : "—"}
//                           </td>
//                           <td className="py-3 pr-5">
//                             {!prev || !hasData
//                               ? <span className="text-[#A0856C] text-xs">—</span>
//                               : diff > 0
//                                 ? <span className="flex items-center gap-1 text-emerald-600 text-xs font-semibold"><FaArrowUp className="text-[9px]"/>+₹{fmt(diff)}</span>
//                                 : diff < 0
//                                   ? <span className="flex items-center gap-1 text-rose-500 text-xs font-semibold"><FaArrowDown className="text-[9px]"/>-₹{fmt(Math.abs(diff))}</span>
//                                   : <span className="text-[#A0856C] text-xs">No change</span>}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                   <tfoot>
//                     <tr className="border-t-2 border-[#EFE8DF] bg-[#FAF6F1]">
//                       <td className="py-3 pr-5 font-black text-[#3D2314]">Total</td>
//                       <td className="py-3 pr-5 font-bold text-[#3D2314]">{totalOrders}</td>
//                       <td className="py-3 pr-5 font-black text-[#3D2314]">₹{fmt(totalRevenue)}</td>
//                       <td className="py-3 pr-5 font-bold text-rose-500">{cancelledOrders}</td>
//                       <td className="py-3 pr-5 font-bold text-[#3D2314]">₹{fmt(avgOrderValue)}</td>
//                       <td className="py-3 pr-5 text-[#A0856C]">—</td>
//                     </tr>
//                   </tfoot>
//                 </table>
//               </Box>
//             </>
//           )}

//           {/* ══════════════════════════
//               PRODUCT REPORT
//           ══════════════════════════ */}
//           {activeTab === "products" && (
//             <Box title="Product Performance">
//               {topProducts.length === 0
//                 ? <p className="text-[#A0856C] text-sm text-center py-10">No product data for selected range.</p>
//                 : (
//                   <table className="w-full text-sm">
//                     <thead>
//                       <Thead cols={["#","Product","Units Sold","Revenue","Revenue Share"]} />
//                     </thead>
//                     <tbody>
//                       {topProducts.map((p: any, i: number) => {
//                         const share = totalRevenue ? Math.round((p.revenue / totalRevenue) * 100) : 0;
//                         return (
//                           <tr key={i} className="border-b border-[#F5F0EB] hover:bg-[#FAF6F1] transition-colors">
//                             <td className="py-3 pr-5">
//                               <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
//                                 style={{ background: `${COLORS[i % COLORS.length]}18`, color: COLORS[i % COLORS.length] }}>
//                                 {i + 1}
//                               </div>
//                             </td>
//                             <td className="py-3 pr-5 font-medium text-[#3D2314] max-w-[220px]">
//                               <span className="line-clamp-1">{p.title}</span>
//                             </td>
//                             <td className="py-3 pr-5 text-[#5C4033]">×{fmt(p.qty)}</td>
//                             <td className="py-3 pr-5 font-semibold text-[#3D2314]">₹{fmt(p.revenue)}</td>
//                             <td className="py-3 pr-5">
//                               <div className="flex items-center gap-2.5">
//                                 <div className="w-28 h-[5px] rounded bg-[#F0E8DF] overflow-hidden">
//                                   <div className="h-full rounded transition-all"
//                                     style={{ width: `${share}%`, background: COLORS[i % COLORS.length] }} />
//                                 </div>
//                                 <span className="text-xs text-[#A0856C] w-8">{share}%</span>
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                     <tfoot>
//                       <tr className="border-t-2 border-[#EFE8DF] bg-[#FAF6F1]">
//                         <td colSpan={2} className="py-3 pr-5 font-black text-[#3D2314]">Total</td>
//                         <td className="py-3 pr-5 font-bold text-[#3D2314]">
//                           ×{fmt(topProducts.reduce((a: number, p: any) => a + p.qty, 0))}
//                         </td>
//                         <td className="py-3 pr-5 font-black text-[#3D2314]">₹{fmt(totalRevenue)}</td>
//                         <td className="py-3 pr-5 text-[#A0856C] text-xs">100%</td>
//                       </tr>
//                     </tfoot>
//                   </table>
//                 )}
//             </Box>
//           )}

//           {/* ══════════════════════════
//               CUSTOMER REPORT
//           ══════════════════════════ */}
//           {activeTab === "users" && (
//             <>
//               {/* User KPIs */}
//               <div className="grid grid-cols-3 gap-4">
//                 {[
//                   { label: "Total Users",      value: fmt(users.length)                                                                           },
//                   { label: "Active Buyers",    value: fmt(userActivity.length)                                                                    },
//                   { label: "Revenue / Buyer",  value: userActivity.length ? `₹${fmt(Math.round(totalRevenue / userActivity.length))}` : "₹0"     },
//                 ].map(({ label, value }, i) => (
//                   <div key={label} className={`relative overflow-hidden rounded-[18px] p-5 bg-gradient-to-br shadow-[0_8px_28px_rgba(61,35,20,0.18)] ${
//                     i===0?"from-[#5C4033] to-[#3D2314]":i===1?"from-[#8B6F5E] to-[#5C4033]":"from-[#C8A882] to-[#8B6F5E]"
//                   }`}>
//                     <div className="absolute -right-4 -top-4 w-[80px] h-[80px] rounded-full bg-white/[0.07]" />
//                     <p className="text-[10px] text-white/60 tracking-widest uppercase">{label}</p>
//                     <h2 className="text-[24px] font-extrabold text-white mt-1.5">{value}</h2>
//                   </div>
//                 ))}
//               </div>

//               <Box title="Customer Activity">
//                 {userActivity.length === 0
//                   ? <p className="text-[#A0856C] text-sm text-center py-10">No customer data for selected range.</p>
//                   : (
//                     <table className="w-full text-sm">
//                       <thead>
//                         <Thead cols={["#","Customer","Orders","Total Spent","Avg Order","Contribution"]} />
//                       </thead>
//                       <tbody>
//                         {(userActivity as any[]).map((u: any, i: number) => {
//                           const contrib = totalRevenue ? Math.round((u.revenue / totalRevenue) * 100) : 0;
//                           return (
//                             <tr key={i} className="border-b border-[#F5F0EB] hover:bg-[#FAF6F1] transition-colors">
//                               <td className="py-3 pr-5 text-[#A0856C] font-bold">#{i+1}</td>
//                               <td className="py-3 pr-5">
//                                 <div className="flex items-center gap-2.5">
//                                   <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
//                                     style={{ background: COLORS[i % COLORS.length] }}>
//                                     {u.name?.[0]?.toUpperCase() || "?"}
//                                   </div>
//                                   <span className="font-semibold text-[#3D2314]">{u.name}</span>
//                                 </div>
//                               </td>
//                               <td className="py-3 pr-5 text-[#5C4033]">{u.orders}</td>
//                               <td className="py-3 pr-5 font-semibold text-[#3D2314]">₹{fmt(u.revenue)}</td>
//                               <td className="py-3 pr-5 text-[#8B6F5E]">₹{fmt(Math.round(u.revenue / u.orders))}</td>
//                               <td className="py-3 pr-5">
//                                 <div className="flex items-center gap-2.5">
//                                   <div className="w-24 h-[5px] rounded bg-[#F0E8DF] overflow-hidden">
//                                     <div className="h-full rounded" style={{ width: `${contrib}%`, background: COLORS[i % COLORS.length] }} />
//                                   </div>
//                                   <span className="text-xs text-[#A0856C] w-7">{contrib}%</span>
//                                 </div>
//                               </td>
//                             </tr>
//                           );
//                         })}
//                       </tbody>
//                       <tfoot>
//                         <tr className="border-t-2 border-[#EFE8DF] bg-[#FAF6F1]">
//                           <td colSpan={2} className="py-3 pr-5 font-black text-[#3D2314]">Total</td>
//                           <td className="py-3 pr-5 font-bold text-[#3D2314]">{totalOrders}</td>
//                           <td className="py-3 pr-5 font-black text-[#3D2314]">₹{fmt(totalRevenue)}</td>
//                           <td className="py-3 pr-5 font-bold text-[#3D2314]">₹{fmt(avgOrderValue)}</td>
//                           <td className="py-3 pr-5 text-[#A0856C] text-xs">100%</td>
//                         </tr>
//                       </tfoot>
//                     </table>
//                   )}
//               </Box>
//             </>
//           )}

//           {/* ══════════════════════════
//               ORDER REPORT
//           ══════════════════════════ */}
//           {activeTab === "orders" && (
//             <>
//               {/* Status summary */}
//               <div className="grid grid-cols-4 gap-3">
//                 {Object.entries(statusMap).map(([status, count]: any, i) => (
//                   <div key={status} className="bg-white rounded-xl px-5 py-4 border border-[#EFE8DF] shadow-sm flex items-center gap-3">
//                     <div className="w-2 h-10 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
//                     <div>
//                       <p className="text-[10px] text-[#A0856C] tracking-widest uppercase">{status}</p>
//                       <p className="text-xl font-black text-[#3D2314]">{fmt(count)}</p>
//                       <p className="text-[10px] text-[#A0856C]">{totalOrders ? Math.round((count/totalOrders)*100) : 0}% of total</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Order list */}
//               <Box title="All Orders">
//                 {filteredOrders.length === 0
//                   ? <p className="text-[#A0856C] text-sm text-center py-10">No orders for selected range.</p>
//                   : (
//                     <div className="overflow-x-auto">
//                       <table className="w-full text-sm">
//                         <thead>
//                           <Thead cols={["Order ID","Customer","Items","Amount","Status","Date"]} />
//                         </thead>
//                         <tbody>
//                           {filteredOrders.map((o: any, i: number) => {
//                             const uid  = typeof o.userId === "string" ? o.userId : o.userId?._id;
//                             const name = users.find((u: any) => String(u.userId) === String(uid))?.name || "Guest";
//                             const itemCount = o.cartItems?.reduce((a: number, c: any) => a + (c.quantity || 1), 0) || 0;
//                             const statusStyle: any = {
//                               Delivered: "bg-emerald-50 text-emerald-700",
//                               Pending:   "bg-amber-50 text-amber-700",
//                               Cancelled: "bg-rose-50 text-rose-600",
//                             };
//                             return (
//                               <tr key={i} className="border-b border-[#F5F0EB] hover:bg-[#FAF6F1] transition-colors">
//                                 <td className="py-3 pr-5 font-mono text-xs text-[#A0856C]">
//                                   #{String(o._id || i).slice(-6).toUpperCase()}
//                                 </td>
//                                 <td className="py-3 pr-5 font-medium text-[#3D2314]">{name}</td>
//                                 <td className="py-3 pr-5 text-[#8B6F5E]">{itemCount} item{itemCount !== 1 ? "s" : ""}</td>
//                                 <td className="py-3 pr-5 font-semibold text-[#3D2314]">₹{fmt(o.totalAmount || 0)}</td>
//                                 <td className="py-3 pr-5">
//                                   <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusStyle[o.status] || "bg-[#F5EDE3] text-[#8B6F5E]"}`}>
//                                     {o.status}
//                                   </span>
//                                 </td>
//                                 <td className="py-3 pr-5 text-[#A0856C] text-xs">
//                                   {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//                                 </td>
//                               </tr>
//                             );
//                           })}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//               </Box>
//             </>
//           )}

//         </main>
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════
//    HELPERS
// ═══════════════════════════════════════ */
// const Thead = ({ cols }: { cols: string[] }) => (
//   <tr className="border-b border-[#EFE8DF]">
//     {cols.map((c) => (
//       <th key={c} className="text-left py-3 pr-5 font-semibold text-[#A0856C] text-[10px] tracking-[0.12em] uppercase whitespace-nowrap">
//         {c}
//       </th>
//     ))}
//   </tr>
// );

// const Badge = ({ color, children }: { color: "red"|"green"; children: React.ReactNode }) => (
//   <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
//     color === "red" ? "bg-[#FFF0EE] text-[#C44B2B]" : "bg-emerald-50 text-emerald-700"
//   }`}>
//     {children}
//   </span>
// );

// const Box = ({ title, children }: { title: string; children: React.ReactNode }) => (
//   <div className="bg-white rounded-[18px] p-6 shadow-[0_2px_16px_rgba(92,64,51,0.06)] border border-[#EFE8DF]">
//     <div className="flex items-center gap-2 text-sm font-bold text-[#3D2314] mb-4 tracking-tight">
//       <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-br from-[#C8A882] to-[#8B6F5E]" />
//       {title}
//     </div>
//     {children}
//   </div>
// );

// export default AdminReport;















import { useEffect, useMemo, useState } from "react";
import { getAdminDashboard } from "../../api/apiServices";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import {
  FaAngleDown, FaDownload, FaFilePdf, FaFileExcel, FaFileCsv,
  FaArrowUp, FaArrowDown, FaChartLine, FaBoxOpen, FaUsers, FaClipboardList,
  FaFire, FaGem, FaStar
} from "react-icons/fa";

/* ═══════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════ */
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const PALETTE = ["#C8965A","#8B6F5E","#5C4033","#A0856C","#E9DCCF"];
const STATUS_STYLE: Record<string, { dot: string; badge: string; text: string }> = {
  Delivered:  { dot: "#22c55e", badge: "rgba(34,197,94,0.12)",   text: "#16a34a" },
  Pending:    { dot: "#f59e0b", badge: "rgba(245,158,11,0.12)",  text: "#d97706" },
  Cancelled:  { dot: "#ef4444", badge: "rgba(239,68,68,0.12)",   text: "#dc2626" },
  Processing: { dot: "#3b82f6", badge: "rgba(59,130,246,0.12)",  text: "#2563eb" },
};

const filterByTime = (orders: any[], filter: string) => {
  const now = new Date();
  return orders.filter((o) => {
    const d = new Date(o.createdAt);
    if (filter === "week")   { const w = new Date(); w.setDate(now.getDate()-7);  return d >= w; }
    if (filter === "2weeks") { const w = new Date(); w.setDate(now.getDate()-14); return d >= w; }
    if (filter === "month")  return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
    if (filter === "year")   return d.getFullYear()===now.getFullYear();
    return true;
  });
};

const fmt = (v: number) => Number(v).toLocaleString("en-IN");

/* ═══════════════════════════════════════
   COMPONENT
═══════════════════════════════════════ */
const AdminReport = () => {
  const [data,         setData        ] = useState<any>(null);
  const [timeFilter,   setTimeFilter  ] = useState("month");
  const [selectedUser, setSelectedUser] = useState("all");
  const [activeTab,    setActiveTab   ] = useState<"sales"|"products"|"users"|"orders">("sales");
  const [sidebarOpen,  setSidebarOpen ] = useState(false);
  const [exportOpen,   setExportOpen  ] = useState(false);
  const [animKey,      setAnimKey     ] = useState(0);

  useEffect(() => { getAdminDashboard().then(setData); }, []);
  useEffect(() => { setAnimKey(k => k + 1); }, [activeTab, timeFilter, selectedUser]);

  const orders = data?.orders || [];
  const users  = data?.userStats || [];

  /* ── Apply user filter first, then time filter ── */
  const filteredOrders = useMemo(() => {
    let result = orders;
    if (selectedUser !== "all") {
      result = result.filter((o: any) => {
        const id = typeof o.userId === "string" ? o.userId : o.userId?._id;
        return String(id) === String(selectedUser);
      });
    }
    return filterByTime(result, timeFilter);
  }, [orders, selectedUser, timeFilter]);

  /* ── KPIs ── */
  const totalRevenue    = filteredOrders.reduce((a: number, b: any) => a + (b.totalAmount || 0), 0);
  const totalOrders     = filteredOrders.length;
  const avgOrderValue   = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;
  const deliveredOrders = filteredOrders.filter((o: any) => o.status === "Delivered").length;
  const cancelledOrders = filteredOrders.filter((o: any) => o.status === "Cancelled").length;
  const pendingOrders   = filteredOrders.filter((o: any) => o.status === "Pending").length;
  const deliveryRate    = totalOrders ? Math.round((deliveredOrders / totalOrders) * 100) : 0;

  /* ── Monthly breakdown ── */
  const monthlyData = useMemo(() => {
    const rev = Array(12).fill(0), cnt = Array(12).fill(0), can = Array(12).fill(0);
    filteredOrders.forEach((o: any) => {
      const m = new Date(o.createdAt).getMonth();
      rev[m] += o.totalAmount || 0;
      cnt[m] += 1;
      if (o.status === "Cancelled") can[m] += 1;
    });
    return months.map((name, i) => ({ name, revenue: rev[i], orders: cnt[i], cancelled: can[i] }));
  }, [filteredOrders]);

  /* ── Top products ── */
  const topProducts = useMemo(() => {
    const map: any = {};
    filteredOrders.forEach((o: any) => {
      o.cartItems?.forEach((item: any) => {
        if (!map[item.title]) map[item.title] = { qty: 0, revenue: 0 };
        map[item.title].qty     += item.quantity;
        map[item.title].revenue += (item.price || 0) * item.quantity;
      });
    });
    return Object.entries(map)
      .map(([title, v]: any) => ({ title, ...v }))
      .sort((a: any, b: any) => b.revenue - a.revenue)
      .slice(0, 10);
  }, [filteredOrders]);

  /* ── User activity ── */
  const userActivity = useMemo(() => {
    const map: any = {};
    filteredOrders.forEach((o: any) => {
      const uid   = typeof o.userId === "string" ? o.userId : o.userId?._id;
      const uObj  = users.find((u: any) => String(u.userId) === String(uid));
      const name  = uObj?.name  || "Unknown";
      const email = uObj?.email || "";
      if (!map[uid]) map[uid] = { name, email, orders: 0, revenue: 0, products: {} };
      map[uid].orders  += 1;
      map[uid].revenue += o.totalAmount || 0;
      o.cartItems?.forEach((item: any) => {
        if (!map[uid].products[item.title]) map[uid].products[item.title] = 0;
        map[uid].products[item.title] += item.quantity;
      });
    });
    return Object.values(map).sort((a: any, b: any) => b.revenue - a.revenue);
  }, [filteredOrders, users]);

  /* ── Status counts ── */
  const statusMap = useMemo(() => {
    const map: any = {};
    filteredOrders.forEach((o: any) => { map[o.status] = (map[o.status] || 0) + 1; });
    return map;
  }, [filteredOrders]);

  const maxMonthRevenue = Math.max(...monthlyData.map(m => m.revenue), 1);

  /* ── Selected user label ── */
  const selectedUserName = selectedUser === "all"
    ? null
    : users.find((u: any) => String(u.userId) === String(selectedUser))?.name || "User";

  /* ── Shared select style — matches AdminDashboard ── */
  const selectStyle: React.CSSProperties = {
    appearance:"none",
    background:"#3D2314",
    color:"#E9DCCF",
    border:"1px solid rgba(200,162,130,0.3)",
    borderRadius:12,
    paddingTop:10, paddingBottom:10, paddingLeft:16, paddingRight:40,
    fontSize:13,
    fontWeight:600,
    outline:"none",
    cursor:"pointer",
    fontFamily:"inherit",
    letterSpacing:"0.02em",
    boxShadow:"0 2px 8px rgba(61,35,20,0.12)",
    transition:"background 0.2s",
  };

  if (!data) return (
    <div style={{
      height:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      background:"linear-gradient(135deg,#1a0f0a 0%,#2d1810 50%,#1a0f0a 100%)", gap:20
    }}>
      <div style={{ width:56, height:56, borderRadius:"50%", border:"3px solid rgba(200,150,90,0.15)", borderTop:"3px solid #C8965A", animation:"spin 0.9s linear infinite" }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <span style={{ color:"#C8965A", fontSize:13, letterSpacing:"0.2em", fontFamily:"'DM Mono',monospace" }}>LOADING REPORTS</span>
    </div>
  );

  const TABS = [
    { id:"sales",    label:"Sales",     icon:<FaChartLine/>     },
    { id:"products", label:"Products",  icon:<FaBoxOpen/>       },
    { id:"users",    label:"Customers", icon:<FaUsers/>         },
    { id:"orders",   label:"Orders",    icon:<FaClipboardList/> },
  ] as const;

  const kpis = [
    { label:"Total Revenue",   value:`₹${fmt(totalRevenue)}`, sub:`${totalOrders} transactions`,  icon:"₹", grad:"linear-gradient(135deg,#5C4033,#3D2314)"  },
    { label:"Total Orders",    value:fmt(totalOrders),         sub:"Across all statuses",          icon:"#", grad:"linear-gradient(135deg,#8B6F5E,#5C4033)"  },
    { label:"Avg Order Value", value:`₹${fmt(avgOrderValue)}`, sub:"Per transaction",              icon:"~", grad:"linear-gradient(135deg,#C8A882,#8B6F5E)"  },
    { label:"Delivery Rate",   value:`${deliveryRate}%`,       sub:`${deliveredOrders} delivered`, icon:"%", grad:"linear-gradient(135deg,#A0856C,#5C4033)"  },
  ];

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#FAF6F1", fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Mono:wght@400;500&display=swap');
        @keyframes spin    { to { transform:rotate(360deg) } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:translateY(0) } }
        .row-hover:hover   { background:rgba(200,150,90,0.04)!important; transition:background 0.2s; }
        .tab-btn           { transition:all 0.25s cubic-bezier(.4,0,.2,1); }
        .kpi-card          { transition:transform 0.2s, box-shadow 0.2s; }
        .kpi-card:hover    { transform:translateY(-3px); box-shadow:0 20px 48px rgba(61,35,20,0.22)!important; }
        .export-item:hover { background:rgba(200,150,90,0.06)!important; }
        select:hover       { background:#4b2e1d!important; }
        select:focus       { outline:none; box-shadow:0 0 0 2px rgba(200,162,130,0.4); }
      `}</style>

      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ flex:1, display:"flex", flexDirection:"column", transition:"margin 0.3s", marginLeft:sidebarOpen?"240px":"0" }}>
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main style={{ flex:1, padding:"28px 32px", overflowY:"auto", display:"flex", flexDirection:"column", gap:24 }}>

          {/* ══════ TOP BAR ══════ */}
          <div style={{
            display:"flex", justifyContent:"space-between", alignItems:"center",
            background:"#fff", borderRadius:20, padding:"18px 28px",
            boxShadow:"0 2px 16px rgba(92,64,51,0.06)", border:"1px solid #EFE8DF"
          }}>
            {/* Left: Title */}
            <div>
              <h2 style={{ margin:0, fontSize:19, fontWeight:700, color:"#3D2314", letterSpacing:"-0.3px" }}>
                Reports
              </h2>
              <p style={{ margin:"3px 0 0", fontSize:12, color:"#A0856C" }}>
                {new Date().toLocaleDateString("en-IN",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
                {selectedUserName && (
                  <span style={{ marginLeft:10, background:"rgba(200,150,90,0.14)", color:"#8B6F5E", padding:"2px 10px", borderRadius:20, fontSize:11, fontWeight:700 }}>
                    · {selectedUserName}
                  </span>
                )}
              </p>
            </div>

            {/* Right: Controls */}
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>

              {/* ── User Filter ── */}
              <div style={{ position:"relative" }}>
                <select value={selectedUser} onChange={e=>setSelectedUser(e.target.value)} style={selectStyle}>
                  <option value="all">All Users</option>
                  {users.map((u: any) => (
                    <option key={u.userId} value={u.userId}>{u.name}</option>
                  ))}
                </select>
                <span style={{ pointerEvents:"none", position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", color:"#C8A882", fontSize:11 }}>
                  <FaAngleDown />
                </span>
              </div>

              {/* ── Time Filter ── */}
              <div style={{ position:"relative" }}>
                <select value={timeFilter} onChange={e=>setTimeFilter(e.target.value)} style={selectStyle}>
                  <option value="week">This Week</option>
                  <option value="2weeks">Last 2 Weeks</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
                <span style={{ pointerEvents:"none", position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", color:"#C8A882", fontSize:11 }}>
                  <FaAngleDown />
                </span>
              </div>

              {/* ── Export ── */}
              <div style={{ position:"relative" }}>
                <button onClick={()=>setExportOpen(!exportOpen)} style={{
                  display:"flex", alignItems:"center", gap:8,
                  background:"#3D2314", color:"#E9DCCF",
                  border:"1px solid rgba(200,162,130,0.3)", borderRadius:12,
                  padding:"10px 16px", fontSize:13, fontWeight:600,
                  cursor:"pointer", fontFamily:"inherit", letterSpacing:"0.02em",
                  boxShadow:"0 2px 8px rgba(61,35,20,0.12)"
                }}>
                  <FaDownload style={{ color:"#C8A882", fontSize:12 }}/>
                  Export
                  <FaAngleDown style={{ color:"#C8A882", fontSize:11 }}/>
                </button>
                {exportOpen && (
                  <div style={{
                    position:"absolute", right:0, top:"calc(100% + 8px)",
                    background:"#fff", border:"1px solid #EFE8DF", borderRadius:16,
                    boxShadow:"0 16px 48px rgba(61,35,20,0.14)", zIndex:50, overflow:"hidden", minWidth:180
                  }}>
                    {[
                      { label:"PDF",   icon:<FaFilePdf   style={{color:"#C44B2B"}}/>, f:"pdf"  },
                      { label:"Excel", icon:<FaFileExcel style={{color:"#217346"}}/>, f:"xlsx" },
                      { label:"CSV",   icon:<FaFileCsv   style={{color:"#5C4033"}}/>, f:"csv"  },
                    ].map(item=>(
                      <button key={item.f} className="export-item"
                        onClick={()=>{console.log("export",item.f);setExportOpen(false);}}
                        style={{
                          width:"100%", display:"flex", alignItems:"center", gap:12,
                          padding:"13px 18px", fontSize:13, color:"#3D2314",
                          background:"transparent", border:"none",
                          borderBottom:"1px solid #F5EDE3", cursor:"pointer",
                          fontFamily:"inherit", fontWeight:500
                        }}>
                        {item.icon} Export as {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Avatar */}
              <div style={{
                width:40, height:40, borderRadius:"50%",
                background:"linear-gradient(135deg,#C8A882,#8B6F5E)",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer"
              }}>A</div>
            </div>
          </div>

          {/* ══════ KPI CARDS ══════ */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {kpis.slice(0,3).map(({ label, value, sub, grad }, i) => (
              <div key={label} className="kpi-card" style={{
                position:"relative", overflow:"hidden", borderRadius:18, padding:"22px 24px",
                background:grad, boxShadow:"0 8px 28px rgba(61,35,20,0.18)",
                animation:`fadeUp 0.5s ease ${i*0.08}s both`
              }}>
                <div style={{ position:"absolute", right:-16, top:-16, width:90, height:90, borderRadius:"50%", background:"rgba(255,255,255,0.07)" }}/>
                <div style={{ position:"absolute", right:24, bottom:20, width:40, height:40, borderRadius:99, background:"rgba(255,255,255,0.08)" }}/>
                <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.65)", letterSpacing:"0.15em", textTransform:"uppercase" }}>{label}</p>
                <h2 style={{ margin:"8px 0 0", fontSize:28, fontWeight:800, color:"#fff", letterSpacing:"-0.5px" }}>{value}</h2>
                <p style={{ margin:"6px 0 0", fontSize:11, color:"rgba(255,255,255,0.45)" }}>{sub}</p>
              </div>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginTop:-8 }}>
            {/* 4th KPI + 2 delivery stats */}
            <div className="kpi-card" style={{
              position:"relative", overflow:"hidden", borderRadius:18, padding:"22px 24px",
              background:kpis[3].grad, boxShadow:"0 8px 28px rgba(61,35,20,0.18)",
              animation:"fadeUp 0.5s ease 0.24s both"
            }}>
              <div style={{ position:"absolute", right:-16, top:-16, width:90, height:90, borderRadius:"50%", background:"rgba(255,255,255,0.07)" }}/>
              <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.65)", letterSpacing:"0.15em", textTransform:"uppercase" }}>{kpis[3].label}</p>
              <h2 style={{ margin:"8px 0 0", fontSize:28, fontWeight:800, color:"#fff", letterSpacing:"-0.5px" }}>{kpis[3].value}</h2>
              <p style={{ margin:"6px 0 0", fontSize:11, color:"rgba(255,255,255,0.45)" }}>{kpis[3].sub}</p>
            </div>
            {[
              { label:"Total Users",   value:fmt(users.length),   sub:"Registered accounts", grad:"linear-gradient(135deg,#8B6F5E,#5C4033)" },
              { label:"Total Orders",  value:fmt(totalOrders),    sub:"In selected period",  grad:"linear-gradient(135deg,#C8A882,#8B6F5E)" },
            ].map(({ label, value, sub, grad }, i) => (
              <div key={label} className="kpi-card" style={{
                position:"relative", overflow:"hidden", borderRadius:18, padding:"22px 24px",
                background:grad, boxShadow:"0 8px 28px rgba(61,35,20,0.18)",
                animation:`fadeUp 0.5s ease ${(i+4)*0.08}s both`
              }}>
                <div style={{ position:"absolute", right:-16, top:-16, width:90, height:90, borderRadius:"50%", background:"rgba(255,255,255,0.07)" }}/>
                <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.65)", letterSpacing:"0.15em", textTransform:"uppercase" }}>{label}</p>
                <h2 style={{ margin:"8px 0 0", fontSize:28, fontWeight:800, color:"#fff", letterSpacing:"-0.5px" }}>{value}</h2>
                <p style={{ margin:"6px 0 0", fontSize:11, color:"rgba(255,255,255,0.45)" }}>{sub}</p>
              </div>
            ))}
          </div>

          {/* ══════ TABS ══════ */}
          <div style={{ display:"flex", alignItems:"center", gap:4, background:"#fff", borderRadius:16, padding:6, width:"fit-content", boxShadow:"0 2px 16px rgba(92,64,51,0.06)", border:"1px solid #EFE8DF" }}>
            {TABS.map(tab=>(
              <button key={tab.id} className="tab-btn" onClick={()=>setActiveTab(tab.id)}
                style={{
                  display:"flex", alignItems:"center", gap:8,
                  padding:"10px 20px", borderRadius:12, border:"none",
                  fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
                  background: activeTab===tab.id ? "#3D2314" : "transparent",
                  color: activeTab===tab.id ? "#E9DCCF" : "#A0856C",
                  boxShadow: activeTab===tab.id ? "0 4px 14px rgba(61,35,20,0.22)" : "none",
                  letterSpacing:"0.02em"
                }}>
                <span style={{ fontSize:11 }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* ══════════════════════════
              SALES TAB
          ══════════════════════════ */}
          {activeTab==="sales" && (
            <div key={`sales-${animKey}`} style={{ display:"flex", flexDirection:"column", gap:20, animation:"fadeUp 0.4s ease both" }}>

              {/* Mini stats */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12 }}>
                {[
                  { label:"Revenue",   value:`₹${fmt(totalRevenue)}`, icon:<FaGem/>,           color:"#C8965A" },
                  { label:"Orders",    value:fmt(totalOrders),         icon:<FaClipboardList/>, color:"#8B6F5E" },
                  { label:"Delivered", value:fmt(deliveredOrders),     icon:<FaStar/>,          color:"#22c55e" },
                  { label:"Pending",   value:fmt(pendingOrders),       icon:<FaFire/>,          color:"#f59e0b" },
                  { label:"Cancelled", value:fmt(cancelledOrders),     icon:<FaArrowDown/>,     color:"#ef4444" },
                ].map(({ label, value, icon, color })=>(
                  <div key={label} style={{ background:"#fff", borderRadius:16, padding:"16px 18px", border:"1px solid #EFE8DF", boxShadow:"0 2px 12px rgba(92,64,51,0.05)" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                      <p style={{ margin:0, fontSize:10, color:"#A0856C", letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:700 }}>{label}</p>
                      <span style={{ fontSize:11, color, opacity:0.8 }}>{icon}</span>
                    </div>
                    <p style={{ margin:0, fontSize:20, fontWeight:800, color:"#3D2314" }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Bar chart */}
              <Panel title="Monthly Revenue Overview" sub="Bar height = revenue">
                <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:180, padding:"0 4px" }}>
                  {monthlyData.map((row, i) => {
                    const h = row.revenue > 0 ? Math.max((row.revenue / maxMonthRevenue) * 160, 8) : 4;
                    return (
                      <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                        <div style={{ position:"relative", display:"flex", alignItems:"flex-end", height:160 }}>
                          <div title={row.revenue > 0 ? `₹${fmt(row.revenue)}` : "No data"} style={{
                            width:"100%", minWidth:20, borderRadius:"6px 6px 0 0", height:h,
                            background: row.revenue > 0 ? (i%2===0?"#8B6F5E":"#C8A882") : "#EDE4D8",
                            transition:"height 0.6s cubic-bezier(.4,0,.2,1)",
                            position:"relative", overflow:"hidden", cursor:"default"
                          }}>
                            {row.revenue > 0 && <div style={{ position:"absolute", top:0, left:0, right:0, height:"30%", background:"rgba(255,255,255,0.15)", borderRadius:"6px 6px 0 0" }}/>}
                          </div>
                        </div>
                        <span style={{ fontSize:9, color:"#A0856C", fontWeight:700, letterSpacing:"0.05em", fontFamily:"'DM Mono',monospace" }}>{row.name}</span>
                      </div>
                    );
                  })}
                </div>
              </Panel>

              {/* Monthly table */}
              <Panel title="Monthly Sales Breakdown" sub="Full breakdown by month">
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                  <thead><THead cols={["Month","Orders","Revenue","Cancelled","Avg Value","vs Prev"]}/></thead>
                  <tbody>
                    {monthlyData.map((row, i) => {
                      const prev    = monthlyData[i-1];
                      const diff    = prev ? row.revenue - prev.revenue : 0;
                      const hasData = row.orders > 0;
                      return (
                        <tr key={i} className="row-hover" style={{ borderBottom:"1px solid #F5EDE3", opacity:hasData?1:0.4 }}>
                          <td style={{ padding:"13px 16px 13px 0", fontWeight:700, color:"#3D2314" }}>{row.name}</td>
                          <td style={{ padding:"13px 16px 13px 0", color:"#5C4033" }}>{row.orders}</td>
                          <td style={{ padding:"13px 16px 13px 0", fontWeight:700, color:"#3D2314" }}>
                            {row.revenue > 0 ? `₹${fmt(row.revenue)}` : "—"}
                          </td>
                          <td style={{ padding:"13px 16px 13px 0" }}>
                            {row.cancelled > 0
                              ? <StatusPill color="#dc2626" bg="rgba(239,68,68,0.1)">{row.cancelled} cancelled</StatusPill>
                              : <span style={{ color:"#C8A882" }}>—</span>}
                          </td>
                          <td style={{ padding:"13px 16px 13px 0", color:"#8B6F5E" }}>
                            {row.orders ? `₹${fmt(Math.round(row.revenue/row.orders))}` : "—"}
                          </td>
                          <td style={{ padding:"13px 16px 13px 0" }}>
                            {!prev||!hasData
                              ? <span style={{ color:"#C8A882", fontSize:12 }}>—</span>
                              : diff>0
                                ? <span style={{ display:"flex", alignItems:"center", gap:4, color:"#16a34a", fontSize:12, fontWeight:700 }}><FaArrowUp style={{ fontSize:9 }}/>+₹{fmt(diff)}</span>
                                : diff<0
                                  ? <span style={{ display:"flex", alignItems:"center", gap:4, color:"#dc2626", fontSize:12, fontWeight:700 }}><FaArrowDown style={{ fontSize:9 }}/>-₹{fmt(Math.abs(diff))}</span>
                                  : <span style={{ color:"#C8A882", fontSize:12 }}>No change</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr style={{ borderTop:"2px solid #EFE8DF", background:"#FAF6F1" }}>
                      <td style={{ padding:"14px 16px 14px 0", fontWeight:900, color:"#3D2314" }}>Total</td>
                      <td style={{ padding:"14px 16px 14px 0", fontWeight:800, color:"#3D2314" }}>{totalOrders}</td>
                      <td style={{ padding:"14px 16px 14px 0", fontWeight:900, color:"#3D2314" }}>₹{fmt(totalRevenue)}</td>
                      <td style={{ padding:"14px 16px 14px 0", fontWeight:800, color:"#dc2626" }}>{cancelledOrders}</td>
                      <td style={{ padding:"14px 16px 14px 0", fontWeight:800, color:"#3D2314" }}>₹{fmt(avgOrderValue)}</td>
                      <td style={{ padding:"14px 16px 14px 0", color:"#C8A882", fontSize:12 }}>—</td>
                    </tr>
                  </tfoot>
                </table>
              </Panel>
            </div>
          )}

          {/* ══════════════════════════
              PRODUCT TAB
          ══════════════════════════ */}
          {activeTab==="products" && (
            <div key={`prod-${animKey}`} style={{ animation:"fadeUp 0.4s ease both" }}>
              <Panel title="Product Performance" sub={`Top ${topProducts.length} products by revenue`}>
                {topProducts.length===0
                  ? <Empty label="No product data for selected range."/>
                  : (
                    <>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12, marginBottom:24 }}>
                        {topProducts.slice(0,6).map((p: any, i: number)=>{
                          const share = totalRevenue ? Math.round((p.revenue/totalRevenue)*100) : 0;
                          return (
                            <div key={i} style={{ background:"#FAF6F1", borderRadius:14, padding:"14px 16px", border:"1px solid #EFE8DF" }}>
                              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                                <span style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, fontWeight:600, color:"#3D2314", maxWidth:"70%", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                                  <span style={{ width:22, height:22, borderRadius:8, flexShrink:0, background:`${PALETTE[i%PALETTE.length]}22`, color:PALETTE[i%PALETTE.length], fontSize:10, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center" }}>{i+1}</span>
                                  {p.title}
                                </span>
                                <span style={{ fontSize:12, fontWeight:800, color:"#3D2314" }}>{share}%</span>
                              </div>
                              <div style={{ height:6, borderRadius:99, background:"#EDE4D8", overflow:"hidden" }}>
                                <div style={{ height:"100%", borderRadius:99, background:`linear-gradient(90deg,${PALETTE[i%PALETTE.length]},${PALETTE[(i+1)%PALETTE.length]})`, width:`${share}%`, transition:"width 0.8s cubic-bezier(.4,0,.2,1)" }}/>
                              </div>
                              <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
                                <span style={{ fontSize:11, color:"#A0856C" }}>×{fmt(p.qty)} units</span>
                                <span style={{ fontSize:11, color:"#5C4033", fontWeight:700 }}>₹{fmt(p.revenue)}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                        <thead><THead cols={["#","Product","Units Sold","Revenue","Revenue Share"]}/></thead>
                        <tbody>
                          {topProducts.map((p: any, i: number)=>{
                            const share = totalRevenue ? Math.round((p.revenue/totalRevenue)*100) : 0;
                            return (
                              <tr key={i} className="row-hover" style={{ borderBottom:"1px solid #F5EDE3" }}>
                                <td style={{ padding:"12px 16px 12px 0" }}>
                                  <div style={{ width:28, height:28, borderRadius:10, background:`${PALETTE[i%PALETTE.length]}18`, color:PALETTE[i%PALETTE.length], display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900 }}>{i+1}</div>
                                </td>
                                <td style={{ padding:"12px 16px 12px 0", fontWeight:600, color:"#3D2314", maxWidth:220 }}>
                                  <span style={{ display:"block", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.title}</span>
                                </td>
                                <td style={{ padding:"12px 16px 12px 0", color:"#5C4033", fontFamily:"'DM Mono',monospace", fontSize:12 }}>×{fmt(p.qty)}</td>
                                <td style={{ padding:"12px 16px 12px 0", fontWeight:700, color:"#3D2314" }}>₹{fmt(p.revenue)}</td>
                                <td style={{ padding:"12px 16px 12px 0" }}>
                                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                                    <div style={{ width:80, height:5, borderRadius:99, background:"#EDE4D8", overflow:"hidden" }}>
                                      <div style={{ height:"100%", borderRadius:99, background:PALETTE[i%PALETTE.length], width:`${share}%` }}/>
                                    </div>
                                    <span style={{ fontSize:11, color:"#A0856C", minWidth:28, fontFamily:"'DM Mono',monospace" }}>{share}%</span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot>
                          <tr style={{ borderTop:"2px solid #EFE8DF", background:"#FAF6F1" }}>
                            <td colSpan={2} style={{ padding:"13px 16px 13px 0", fontWeight:900, color:"#3D2314" }}>Total</td>
                            <td style={{ padding:"13px 16px 13px 0", fontWeight:800, color:"#3D2314", fontFamily:"'DM Mono',monospace", fontSize:12 }}>
                              ×{fmt(topProducts.reduce((a: number, p: any)=>a+p.qty, 0))}
                            </td>
                            <td style={{ padding:"13px 16px 13px 0", fontWeight:900, color:"#3D2314" }}>₹{fmt(totalRevenue)}</td>
                            <td style={{ padding:"13px 16px 13px 0", color:"#A0856C", fontSize:11, fontFamily:"'DM Mono',monospace" }}>100%</td>
                          </tr>
                        </tfoot>
                      </table>
                    </>
                  )}
              </Panel>
            </div>
          )}

          {/* ══════════════════════════
              CUSTOMERS TAB
          ══════════════════════════ */}
          {activeTab==="users" && (
            <div key={`users-${animKey}`} style={{ display:"flex", flexDirection:"column", gap:20, animation:"fadeUp 0.4s ease both" }}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
                {[
                  { label:"Total Users",     value:fmt(users.length),        grad:"linear-gradient(135deg,#5C4033,#3D2314)", icon:"👥" },
                  { label:"Active Buyers",   value:fmt(userActivity.length),  grad:"linear-gradient(135deg,#8B6F5E,#5C4033)", icon:"🛍️" },
                  { label:"Revenue / Buyer", value:userActivity.length?`₹${fmt(Math.round(totalRevenue/userActivity.length))}`:"₹0", grad:"linear-gradient(135deg,#C8A882,#8B6F5E)", icon:"💰" },
                ].map(({ label, value, grad, icon })=>(
                  <div key={label} className="kpi-card" style={{ borderRadius:18, padding:"22px 26px", background:grad, boxShadow:"0 8px 28px rgba(61,35,20,0.18)", position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", right:-12, top:-12, width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.07)" }}/>
                    <div style={{ fontSize:22, marginBottom:10 }}>{icon}</div>
                    <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.65)", letterSpacing:"0.15em", textTransform:"uppercase" }}>{label}</p>
                    <h2 style={{ margin:"6px 0 0", fontSize:26, fontWeight:800, color:"#fff" }}>{value}</h2>
                  </div>
                ))}
              </div>

              <Panel title="Customer Activity" sub="Sorted by total spend">
                {userActivity.length===0
                  ? <Empty label="No customer data for selected range."/>
                  : (
                    <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                      <thead><THead cols={["#","Customer","Orders","Total Spent","Avg Order","Top Product","Contribution"]}/></thead>
                      <tbody>
                        {(userActivity as any[]).map((u: any, i: number)=>{
                          const contrib = totalRevenue ? Math.round((u.revenue/totalRevenue)*100) : 0;
                          const topProd = Object.entries(u.products||{}).sort((a:any,b:any)=>b[1]-a[1])[0];
                          return (
                            <tr key={i} className="row-hover" style={{ borderBottom:"1px solid #F5EDE3" }}>
                              <td style={{ padding:"13px 14px 13px 0", color:"#A0856C", fontWeight:700, fontFamily:"'DM Mono',monospace", fontSize:12 }}>#{i+1}</td>
                              <td style={{ padding:"13px 14px 13px 0" }}>
                                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                                  <div style={{ width:34, height:34, borderRadius:"50%", flexShrink:0, background:PALETTE[i%PALETTE.length], display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:13, boxShadow:`0 4px 12px ${PALETTE[i%PALETTE.length]}50` }}>
                                    {u.name?.[0]?.toUpperCase()||"?"}
                                  </div>
                                  <div>
                                    <p style={{ margin:0, fontWeight:700, color:"#3D2314", fontSize:13 }}>{u.name}</p>
                                    {u.email && <p style={{ margin:0, fontSize:11, color:"#A0856C" }}>{u.email}</p>}
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding:"13px 14px 13px 0" }}>
                                <span style={{ background:"rgba(200,150,90,0.12)", color:"#8B6F5E", borderRadius:8, padding:"3px 10px", fontSize:12, fontWeight:700 }}>{u.orders}</span>
                              </td>
                              <td style={{ padding:"13px 14px 13px 0", fontWeight:800, color:"#3D2314" }}>₹{fmt(u.revenue)}</td>
                              <td style={{ padding:"13px 14px 13px 0", color:"#8B6F5E" }}>₹{fmt(Math.round(u.revenue/u.orders))}</td>
                              <td style={{ padding:"13px 14px 13px 0", maxWidth:140 }}>
                                {topProd
                                  ? <span style={{ fontSize:11, color:"#5C4033", background:"rgba(92,64,51,0.08)", borderRadius:8, padding:"3px 9px", display:"block", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                                      {topProd[0]} <span style={{ color:"#A0856C" }}>×{topProd[1] as number}</span>
                                    </span>
                                  : <span style={{ color:"#C8A882" }}>—</span>}
                              </td>
                              <td style={{ padding:"13px 14px 13px 0" }}>
                                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                                  <div style={{ width:72, height:5, borderRadius:99, background:"#EDE4D8", overflow:"hidden" }}>
                                    <div style={{ height:"100%", borderRadius:99, background:PALETTE[i%PALETTE.length], width:`${contrib}%` }}/>
                                  </div>
                                  <span style={{ fontSize:11, color:"#A0856C", minWidth:28, fontFamily:"'DM Mono',monospace" }}>{contrib}%</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr style={{ borderTop:"2px solid #EFE8DF", background:"#FAF6F1" }}>
                          <td colSpan={2} style={{ padding:"13px 14px 13px 0", fontWeight:900, color:"#3D2314" }}>Total</td>
                          <td style={{ padding:"13px 14px 13px 0", fontWeight:800, color:"#3D2314" }}>{totalOrders}</td>
                          <td style={{ padding:"13px 14px 13px 0", fontWeight:900, color:"#3D2314" }}>₹{fmt(totalRevenue)}</td>
                          <td style={{ padding:"13px 14px 13px 0", fontWeight:800, color:"#3D2314" }}>₹{fmt(avgOrderValue)}</td>
                          <td style={{ padding:"13px 14px 13px 0" }}/>
                          <td style={{ padding:"13px 14px 13px 0", color:"#A0856C", fontSize:11, fontFamily:"'DM Mono',monospace" }}>100%</td>
                        </tr>
                      </tfoot>
                    </table>
                  )}
              </Panel>
            </div>
          )}

          {/* ══════════════════════════
              ORDERS TAB
          ══════════════════════════ */}
          {activeTab==="orders" && (
            <div key={`orders-${animKey}`} style={{ display:"flex", flexDirection:"column", gap:20, animation:"fadeUp 0.4s ease both" }}>

              <div style={{ display:"grid", gridTemplateColumns:`repeat(${Math.min(Object.keys(statusMap).length,4)},1fr)`, gap:14 }}>
                {Object.entries(statusMap).map(([status, count]: any, i)=>{
                  const s   = STATUS_STYLE[status] || { dot:"#A0856C", badge:"rgba(160,133,108,0.12)", text:"#8B6F5E" };
                  const pct = totalOrders ? Math.round((count/totalOrders)*100) : 0;
                  return (
                    <div key={status} style={{ background:"#fff", borderRadius:18, padding:"18px 20px", border:"1px solid #EFE8DF", boxShadow:"0 2px 12px rgba(92,64,51,0.06)" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                        <span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", background:s.badge, color:s.text, padding:"4px 10px", borderRadius:8 }}>{status}</span>
                        <span style={{ fontSize:11, color:"#A0856C", background:"#FAF6F1", padding:"3px 9px", borderRadius:8, fontWeight:600, fontFamily:"'DM Mono',monospace" }}>{pct}%</span>
                      </div>
                      <p style={{ margin:0, fontSize:28, fontWeight:900, color:"#3D2314" }}>{fmt(count)}</p>
                      <div style={{ marginTop:10, height:4, borderRadius:99, background:"#EDE4D8", overflow:"hidden" }}>
                        <div style={{ height:"100%", borderRadius:99, background:s.dot, width:`${pct}%`, transition:"width 0.8s ease" }}/>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Panel title="All Orders" sub={`${filteredOrders.length} orders in selected period`}>
                {filteredOrders.length===0
                  ? <Empty label="No orders for selected range."/>
                  : (
                    <div style={{ overflowX:"auto" }}>
                      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                        <thead><THead cols={["Order ID","Customer","Items","Amount","Status","Date"]}/></thead>
                        <tbody>
                          {filteredOrders.map((o: any, i: number)=>{
                            const uid       = typeof o.userId==="string" ? o.userId : o.userId?._id;
                            const uObj      = users.find((u: any)=>String(u.userId)===String(uid));
                            const name      = uObj?.name || "Guest";
                            const itemCount = o.cartItems?.reduce((a: number, c: any)=>a+(c.quantity||1),0)||0;
                            const s         = STATUS_STYLE[o.status]||{ dot:"#A0856C", badge:"rgba(160,133,108,0.12)", text:"#8B6F5E" };
                            return (
                              <tr key={i} className="row-hover" style={{ borderBottom:"1px solid #F5EDE3" }}>
                                <td style={{ padding:"13px 16px 13px 0" }}>
                                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#A0856C", background:"#FAF6F1", padding:"3px 9px", borderRadius:8 }}>
                                    #{String(o._id||i).slice(-6).toUpperCase()}
                                  </span>
                                </td>
                                <td style={{ padding:"13px 16px 13px 0" }}>
                                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                                    <div style={{ width:28, height:28, borderRadius:"50%", flexShrink:0, background:PALETTE[i%PALETTE.length], display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:11 }}>
                                      {name[0]?.toUpperCase()||"?"}
                                    </div>
                                    <span style={{ fontWeight:600, color:"#3D2314" }}>{name}</span>
                                  </div>
                                </td>
                                <td style={{ padding:"13px 16px 13px 0", color:"#8B6F5E" }}>{itemCount} item{itemCount!==1?"s":""}</td>
                                <td style={{ padding:"13px 16px 13px 0", fontWeight:800, color:"#3D2314" }}>₹{fmt(o.totalAmount||0)}</td>
                                <td style={{ padding:"13px 16px 13px 0" }}>
                                  <span style={{ fontSize:11, fontWeight:700, padding:"4px 11px", borderRadius:8, background:s.badge, color:s.text }}>{o.status}</span>
                                </td>
                                <td style={{ padding:"13px 16px 13px 0", color:"#A0856C", fontSize:12, fontFamily:"'DM Mono',monospace" }}>
                                  {new Date(o.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
              </Panel>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   HELPERS
═══════════════════════════════════════ */
const THead = ({ cols }: { cols: string[] }) => (
  <tr style={{ borderBottom:"2px solid #EFE8DF" }}>
    {cols.map(c=>(
      <th key={c} style={{ textAlign:"left", padding:"10px 16px 10px 0", fontSize:10, fontWeight:700, color:"#A0856C", letterSpacing:"0.12em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{c}</th>
    ))}
  </tr>
);

const Panel = ({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) => (
  <div style={{ background:"#fff", borderRadius:18, padding:"24px 28px", boxShadow:"0 2px 16px rgba(92,64,51,0.06)", border:"1px solid #EFE8DF" }}>
    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18 }}>
      <span style={{ display:"inline-block", width:8, height:8, borderRadius:"50%", background:"linear-gradient(135deg,#C8A882,#8B6F5E)" }}/>
      <div>
        <h3 style={{ margin:0, fontSize:14, fontWeight:700, color:"#3D2314", letterSpacing:"-0.2px" }}>{title}</h3>
        {sub && <p style={{ margin:0, fontSize:11, color:"#A0856C" }}>{sub}</p>}
      </div>
    </div>
    {children}
  </div>
);

const StatusPill = ({ children, color, bg }: { children: React.ReactNode; color: string; bg: string }) => (
  <span style={{ fontSize:11, fontWeight:700, color, background:bg, padding:"3px 10px", borderRadius:8 }}>{children}</span>
);

const Empty = ({ label }: { label: string }) => (
  <div style={{ textAlign:"center", padding:"48px 0", color:"#A0856C", fontSize:13 }}>
    <div style={{ fontSize:32, marginBottom:12, opacity:0.4 }}>📊</div>
    {label}
  </div>
);

export default AdminReport;