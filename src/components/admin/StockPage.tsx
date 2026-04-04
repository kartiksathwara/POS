// import { useEffect, useState } from "react";
// import AdminHeader from "./AdminHeader";

// interface Product {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   initialStock: number;
//   thumbnail: string;
// }

// const formatPrice = (value: number) =>
//   value.toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

// const StockPage = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [editingStock, setEditingStock] = useState<{ [key: string]: number }>({});

//   const fetchProducts = async () => {
//     const res = await fetch("http://localhost:5000/api/products");
//     const data = await res.json();
//     setProducts(data);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleUpdateStock = async (id: string, action: string) => {
//     const qty = editingStock[id];

//     if (!qty || qty <= 0) {
//       alert("Enter valid quantity");
//       return;
//     }

//     await fetch(`http://localhost:5000/api/products/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         quantity: qty,
//         action,
//       }),
//     });

//     // ✅ CLEAR INPUT AFTER UPDATE
//     setEditingStock((prev) => ({
//       ...prev,
//       [id]: 0,
//     }));

//     fetchProducts();
//   };

//   return (
//     <>
//       <AdminHeader />

//       <div className="p-6 bg-gray-50 min-h-screen">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">
//           📦 Stock Manager
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           {products.map((p) => {
//             const percent =
//               p.initialStock > 0
//                 ? (p.quantity / p.initialStock) * 100
//                 : 0;

//             return (
//               <div
//                 key={p._id}
//                 className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
//               >
//                 {/* Product Info */}
//                 <div className="flex justify-between items-center mb-3">
//                   <h3 className="font-semibold text-lg">{p.title}</h3>
//                   <span className="text-sm text-gray-500">
//                     ₹{formatPrice(p.price)}
//                   </span>
//                 </div>

//                 {/* Stock */}
//                 <p className="text-sm mb-2">
//                   Stock: <span className="font-bold">{p.quantity}</span>
//                 </p>

//                 {/* Status */}
//                 <div className="mb-3">
//                   {p.quantity === 0 ? (
//                     <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
//                       Out of Stock
//                     </span>
//                   ) : percent <= 10 ? (
//                     <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
//                       Low Stock ({percent.toFixed(0)}%)
//                     </span>
//                   ) : (
//                     <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
//                       In Stock
//                     </span>
//                   )}
//                 </div>

//                 {/* Input + Buttons */}
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="number"
//                     placeholder="Enter qty"
//                     value={editingStock[p._id] || ""}
//                     className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
//                     onChange={(e) =>
//                       setEditingStock({
//                         ...editingStock,
//                         [p._id]: Number(e.target.value),
//                       })
//                     }
//                   />

//                   {/* ➕ ADD */}
//                   <button
//                     onClick={() => handleUpdateStock(p._id, "add")}
//                     className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
//                   >
//                     +
//                   </button>

//                   {/* ➖ REMOVE */}
//                   <button
//                     onClick={() => handleUpdateStock(p._id, "remove")}
//                     className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
//                   >
//                     -
//                   </button>
//                 </div>

//               </div>
//             );
//           })}

//         </div>
//       </div>
//     </>
//   );
// };

// export default StockPage;






// import { useEffect, useState } from "react";
// import AdminHeader from "./AdminHeader";
// import {
//   MdInventory,
//   MdOutlineAttachMoney,
//   MdAdd,
//   MdRemove,
//   MdWarningAmber,
//   MdCheckCircle,
//   MdErrorOutline,
//   MdSearch,
// } from "react-icons/md";
// import { HiTrendingDown, HiOutlineCube } from "react-icons/hi";

// interface Product {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   initialStock: number;
//   thumbnail: string;
// }

// const formatPrice = (value: number) =>
//   value.toLocaleString("en-IN", {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   });

// const StockPage = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingStock, setEditingStock] = useState<{ [key: string]: number }>({});

//   const fetchProducts = async () => {
//     const res = await fetch("http://localhost:5000/api/products");
//     const data = await res.json();
//     setProducts(data);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleUpdateStock = async (id: string, action: string) => {
//     const qty = editingStock[id];
//     if (!qty || qty <= 0) return alert("Enter a valid quantity");

//     await fetch(`http://localhost:5000/api/products/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ quantity: qty, action }),
//     });

//     setEditingStock((prev) => ({ ...prev, [id]: 0 }));
//     fetchProducts();
//   };

//   const filteredProducts = products.filter((p) =>
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const lowStockCount = products.filter(
//     (p) => (p.quantity / p.initialStock) * 100 <= 10 && p.quantity > 0
//   ).length;
//   const outOfStockCount = products.filter((p) => p.quantity === 0).length;

//   return (
//     <div
//       className="min-h-screen"
//       style={{ backgroundColor: "var(--secondary, #F5EFE6)" }}
//     >
//       <AdminHeader />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

//         {/* ── PAGE HEADER ── */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
//           <div className="flex items-center gap-4">
//             <div
//               className="p-3 rounded-2xl shadow-md"
//               style={{ backgroundColor: "var(--main, #5C3D2E)" }}
//             >
//               <MdInventory className="text-white text-2xl" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-black tracking-tight" style={{ color: "var(--main, #5C3D2E)" }}>
//                 Stock Control
//               </h1>
//               <p className="text-sm font-medium opacity-60" style={{ color: "var(--main, #5C3D2E)" }}>
//                 Manage and monitor warehouse inventory levels
//               </p>
//             </div>
//           </div>

//           {/* Search */}
//           <div className="relative group">
//             <MdSearch
//               className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xl transition-opacity opacity-50 group-focus-within:opacity-100"
//               style={{ color: "var(--main, #5C3D2E)" }}
//             />
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="pl-11 pr-4 py-2.5 rounded-xl w-full md:w-72 text-sm font-semibold shadow-sm outline-none transition-all"
//               style={{
//                 backgroundColor: "var(--primary, #E9DCCF)",
//                 color: "var(--main, #5C3D2E)",
//                 border: "2px solid transparent",
//               }}
//               onFocus={(e) => (e.currentTarget.style.border = "2px solid var(--main, #5C3D2E)")}
//               onBlur={(e) => (e.currentTarget.style.border = "2px solid transparent")}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* ── STAT CARDS ── */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//           {[
//             {
//               icon: <HiOutlineCube className="text-2xl" />,
//               label: "Total Items",
//               value: products.length,
//               accent: "var(--main, #5C3D2E)",
//               bg: "var(--primary, #E9DCCF)",
//             },
//             {
//               icon: <HiTrendingDown className="text-2xl" />,
//               label: "Low Stock",
//               value: lowStockCount,
//               accent: "#D97706",
//               bg: "#FEF3C7",
//             },
//             {
//               icon: <MdErrorOutline className="text-2xl" />,
//               label: "Out of Stock",
//               value: outOfStockCount,
//               accent: "#DC2626",
//               bg: "#FEE2E2",
//             },
//           ].map((stat) => (
//             <div
//               key={stat.label}
//               className="rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-white/60 hover:shadow-md transition-shadow bg-white"
//             >
//               <div
//                 className="p-3 rounded-xl shrink-0"
//                 style={{ backgroundColor: stat.bg, color: stat.accent }}
//               >
//                 {stat.icon}
//               </div>
//               <div>
//                 <p
//                   className="text-[10px] font-black uppercase tracking-widest opacity-50"
//                   style={{ color: "var(--main, #5C3D2E)" }}
//                 >
//                   {stat.label}
//                 </p>
//                 <p
//                   className="text-2xl font-black leading-none mt-0.5"
//                   style={{ color: stat.accent }}
//                 >
//                   {stat.value}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ── PRODUCT GRID ── */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {filteredProducts.map((p) => {
//             const percent =
//               p.initialStock > 0 ? (p.quantity / p.initialStock) * 100 : 0;
//             const isOut = p.quantity === 0;
//             const isLow = percent <= 10 && !isOut;
//             const barColor = isOut ? "#DC2626" : isLow ? "#D97706" : "#16A34A";

//             return (
//               <div
//                 key={p._id}
//                 className="rounded-2xl overflow-hidden border border-white/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col bg-white"
//               >
//                 {/* Top status bar */}
//                 <div className="h-1.5 w-full" style={{ backgroundColor: "var(--primary, #E9DCCF)" }}>
//                   <div
//                     className="h-full transition-all duration-700"
//                     style={{
//                       width: `${Math.min(percent, 100)}%`,
//                       backgroundColor: barColor,
//                     }}
//                   />
//                 </div>

//                 <div className="p-5 flex flex-col gap-4 flex-1">

//                   {/* Title + Price */}
//                   <div className="flex justify-between items-start">
//                     <h3
//                       className="font-black text-base leading-snug pr-3 truncate max-w-[58%]"
//                       style={{ color: "var(--main, #5C3D2E)" }}
//                     >
//                       {p.title}
//                     </h3>
//                     <div
//                       className="flex items-center gap-0.5 text-sm font-black px-3 py-1.5 rounded-xl shrink-0"
//                       style={{
//                         backgroundColor: "var(--primary, #E9DCCF)",
//                         color: "var(--main, #5C3D2E)",
//                       }}
//                     >
//                       <MdOutlineAttachMoney className="text-base" />
//                       {formatPrice(p.price)}
//                     </div>
//                   </div>

//                   {/* Stock info */}
//                   <div
//                     className="flex items-center justify-between rounded-xl px-4 py-3"
//                     style={{ backgroundColor: "var(--secondary, #F5EFE6)" }}
//                   >
//                     <div>
//                       <span
//                         className="text-[9px] font-black uppercase tracking-widest block opacity-50"
//                         style={{ color: "var(--main, #5C3D2E)" }}
//                       >
//                         In Stock
//                       </span>
//                       <span
//                         className="text-3xl font-black leading-none"
//                         style={{ color: isOut ? "#DC2626" : "var(--main, #5C3D2E)" }}
//                       >
//                         {p.quantity}
//                       </span>
//                     </div>

//                     <div>
//                       {isOut ? (
//                         <span className="flex items-center gap-1 text-[10px] font-black uppercase bg-red-100 text-red-600 px-2.5 py-1.5 rounded-lg">
//                           <MdErrorOutline /> Empty
//                         </span>
//                       ) : isLow ? (
//                         <span className="flex items-center gap-1 text-[10px] font-black uppercase bg-amber-100 text-amber-600 px-2.5 py-1.5 rounded-lg">
//                           <MdWarningAmber /> Low
//                         </span>
//                       ) : (
//                         <span className="flex items-center gap-1 text-[10px] font-black uppercase bg-green-100 px-2.5 py-1.5 rounded-lg">
//                           <MdCheckCircle /> Healthy
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Progress bar */}
//                   <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
//                     <div
//                       className="h-full rounded-full transition-all duration-700"
//                       style={{
//                         width: `${Math.min(percent, 100)}%`,
//                         backgroundColor: barColor,
//                       }}
//                     />
//                   </div>

//                   {/* Adjustment controls */}
//                   <div className="flex items-center gap-2 mt-auto">
//                     <input
//                       type="number"
//                       placeholder="Qty"
//                       min={1}
//                       value={editingStock[p._id] || ""}
//                       onChange={(e) =>
//                         setEditingStock({
//                           ...editingStock,
//                           [p._id]: Number(e.target.value),
//                         })
//                       }
//                       className="flex-1 min-w-0 px-3 py-2.5 rounded-xl text-center font-bold text-sm outline-none transition-all"
//                       style={{
//                         backgroundColor: "var(--secondary, #F5EFE6)",
//                         color: "var(--main, #5C3D2E)",
//                         border: "2px solid transparent",
//                       }}
//                       onFocus={(e) =>
//                         (e.currentTarget.style.border = "2px solid var(--main, #5C3D2E)")
//                       }
//                       onBlur={(e) =>
//                         (e.currentTarget.style.border = "2px solid transparent")
//                       }
//                     />

//                     <button
//                       onClick={() => handleUpdateStock(p._id, "remove")}
//                       title="Reduce Stock"
//                       className="p-3 rounded-xl transition-all active:scale-90 hover:opacity-75"
//                       style={{
//                         backgroundColor: "var(--primary, #E9DCCF)",
//                         color: "var(--main, #5C3D2E)",
//                       }}
//                     >
//                       <MdRemove size={20} />
//                     </button>

//                     <button
//                       onClick={() => handleUpdateStock(p._id, "add")}
//                       title="Add Stock"
//                       className="p-3 rounded-xl text-white transition-all active:scale-90 hover:opacity-90 shadow-md"
//                       style={{ backgroundColor: "var(--main, #5C3D2E)" }}
//                     >
//                       <MdAdd size={20} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* ── EMPTY STATE ── */}
//         {filteredProducts.length === 0 && (
//           <div
//             className="text-center py-24 rounded-3xl border-2 border-dashed mt-4 bg-white"
//             style={{ borderColor: "var(--primary, #E9DCCF)" }}
//           >
//             <MdInventory
//               className="mx-auto text-7xl mb-4 opacity-20"
//               style={{ color: "var(--main, #5C3D2E)" }}
//             />
//             <h3
//               className="text-xl font-black opacity-40"
//               style={{ color: "var(--main, #5C3D2E)" }}
//             >
//               No products found matching &ldquo;{searchTerm}&rdquo;
//             </h3>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StockPage;

















import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import {
    MdInventory,
    MdAdd,
    MdRemove,
    MdSearch,
    MdOutlineCategory,
} from "react-icons/md";
import { RiAlertFill, RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";

interface Product {
    _id: string;
    title: string;
    price: number;
    quantity: number;
    initialStock: number;
    thumbnail: string;
    category?: string;
}

const formatPrice = (value: number) =>
    value.toLocaleString("en-IN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

const StockPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingStock, setEditingStock] = useState<{ [key: string]: number }>({});
    const [activeFilter, setActiveFilter] = useState("All");
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const fetchProducts = async () => {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleUpdateStock = async (id: string, action: string) => {
        if (loadingId === id) return; // 🚫 prevent double click

        const qty = editingStock[id];

        if (!qty || qty <= 0) {
            alert("Enter a valid quantity");
            return;
        }

        setLoadingId(id); // 🔒 lock

        try {
            await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity: qty, action }),
            });

            setEditingStock((prev) => ({
                ...prev,
                [id]: 0,
            }));

            await fetchProducts();

        } catch (error) {
            console.error(error);
        } finally {
            setLoadingId(null); // 🔓 unlock
        }
    };

    const lowStockCount = products.filter(
        (p) => (p.quantity / p.initialStock) * 100 <= 10 && p.quantity > 0
    ).length;
    const outOfStockCount = products.filter((p) => p.quantity === 0).length;

    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
        if (activeFilter === "Low") return matchesSearch && (p.quantity / p.initialStock) * 100 <= 10 && p.quantity > 0;
        if (activeFilter === "Out") return matchesSearch && p.quantity === 0;
        return matchesSearch;
    });

    return (
        <div className="flex min-h-screen bg-[#FAF6F1] font-sans">

            {/* ✅ SIDEBAR */}
            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* ✅ MAIN CONTENT */}
            <div
                className={`
              flex-1 flex flex-col transition-all duration-300
              ${sidebarOpen ? "ml-[240px]" : "ml-0"}
            `}
            >
                {/* ✅ HEADER */}
                <AdminHeader
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* ✅ PAGE */}
                <div className="flex-1 px-7 py-7 overflow-y-auto flex flex-col gap-6">

                    {/* ── HEADER SECTION ── */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                            </div>
                            <h1 className="text-4xl font-black tracking-tighter" style={{ color: "var(--main, #5C3D2E)" }}>
                                Stock Dashboard
                            </h1>
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white" style={{ backgroundColor: "var(--main, #5C3D2E)" }}>
                                Live Inventory Stock check and management
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <div className="relative w-full sm:w-80">
                                <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-30" style={{ color: "var(--main)" }} />
                                <input
                                    type="text"
                                    placeholder="Find a product..."
                                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl shadow-sm border-none focus:ring-2 transition-all font-medium"
                                    style={{ backgroundColor: "white", color: "var(--main)" }}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                        </div>
                    </div>

                    {/* ── KPI HIGHLIGHTS ── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            { label: "In Stock", val: products.length - lowStockCount - outOfStockCount, icon: <RiCheckboxCircleFill />, color: "#10b981", filter: "All" },
                            { label: "Low Warning", val: lowStockCount, icon: <RiAlertFill />, color: "#f59e0b", filter: "Low" },
                            { label: "Out Of Stock", val: outOfStockCount, icon: <RiCloseCircleFill />, color: "#ef4444", filter: "Out" },
                        ].map((item) => (
                            <button
                                key={item.label}
                                onClick={() => setActiveFilter(item.filter)}
                                className={`p-6 rounded-[2rem] bg-white border-2 transition-all text-left flex justify-between items-center group shadow-sm ${activeFilter === item.filter ? 'border-gray-200' : 'border-transparent'}`}
                            >
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-1">{item.label}</p>
                                    <p className="text-4xl font-black" style={{ color: item.color }}>{item.val}</p>
                                </div>
                                <div className="text-4xl opacity-10 group-hover:opacity-100 transition-opacity" style={{ color: item.color }}>
                                    {item.icon}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* ── MODERN PRODUCT LIST ── */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                            <h2 className="font-black text-xl flex items-center gap-2" style={{ color: "var(--main)" }}>
                                <MdOutlineCategory /> Product Registry
                            </h2>
                            <span className="text-xs font-bold px-4 py-2 rounded-xl bg-white border border-gray-100 shadow-sm">
                                Showing {filteredProducts.length} Results
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="text-left">
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest opacity-30">Product Details</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest opacity-30">Stock Status</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest opacity-30 text-center">In Stock</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest opacity-30 text-right">Inventory Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredProducts.map((p) => {
                                        const percent = p.initialStock > 0 ? (p.quantity / p.initialStock) * 100 : 0;
                                        const isOut = p.quantity === 0;
                                        const isLow = percent <= 10 && !isOut;
                                        const statusColor = isOut ? "#ef4444" : isLow ? "#f59e0b" : "#10b981";

                                        return (
                                            <tr key={p._id} className="group hover:bg-gray-50/80 transition-all">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-sm shrink-0">
                                                            <img
                                                                src={
                                                                    p.thumbnail?.startsWith("http")
                                                                        ? p.thumbnail
                                                                        : p.thumbnail?.startsWith("/uploads")
                                                                            ? `http://localhost:5000${p.thumbnail}`
                                                                            : `http://localhost:5000/uploads/${p.thumbnail}`
                                                                }
                                                                onError={(e: any) => {
                                                                    e.target.src = "https://via.placeholder.com/150";
                                                                }}
                                                                alt={p.title}
                                                                className="w-14 h-14 rounded-2xl object-cover group-hover:scale-110 transition-transform duration-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-gray-800 leading-none mb-1">{p.title}</p>
                                                            <p className="text-xs font-bold opacity-40">₹{formatPrice(p.price)} per unit</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col gap-2 w-32">
                                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter">
                                                            <span style={{ color: statusColor }}>{isOut ? 'Depleted' : isLow ? 'Critical' : 'In Stock'}</span>
                                                        </div>
                                                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full rounded-full transition-all duration-1000"
                                                                style={{ width: `${Math.min(percent, 100)}%`, backgroundColor: statusColor }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <span className={`text-2xl font-black ${isOut ? 'text-red-500' : 'text-gray-800'}`}>
                                                        {p.quantity}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <div className="flex items-center bg-gray-100 rounded-2xl p-1 shadow-inner border border-gray-200">
                                                            <input
                                                                type="number"
                                                                placeholder="0"
                                                                value={editingStock[p._id] || ""}
                                                                onChange={(e) => setEditingStock({ ...editingStock, [p._id]: Number(e.target.value) })}
                                                                className="w-16 bg-transparent text-center font-black text-sm outline-none"
                                                            />
                                                            <button
                                                                disabled={loadingId === p._id}
                                                                onClick={() => handleUpdateStock(p._id, "remove")}
                                                                className={`w-9 h-9 flex items-center justify-center rounded-xl 
                                                                ${loadingId === p._id ? "opacity-50 cursor-not-allowed" : ""}`}
                                                            >
                                                                <MdRemove size={20} />
                                                            </button>
                                                            <button
                                                                disabled={loadingId === p._id}
                                                                onClick={() => handleUpdateStock(p._id, "add")}
                                                                className="w-9 h-9 flex items-center justify-center rounded-xl text-white shadow-md transition-all active:scale-90 ml-1"
                                                                style={{ backgroundColor: "var(--main)" }}
                                                            >
                                                                <MdAdd size={20} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Empty State */}
                        {filteredProducts.length === 0 && (
                            <div className="text-center py-32">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <MdInventory size={40} className="opacity-20" />
                                </div>
                                <h3 className="text-2xl font-black opacity-30">No inventory matches</h3>
                                <p className="text-sm font-bold opacity-20">Try clearing your search or filter</p>
                                <button onClick={() => { setSearchTerm(""); setActiveFilter("All") }} className="mt-6 font-black text-xs uppercase underline decoration-2 underline-offset-4">Reset View</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StockPage;