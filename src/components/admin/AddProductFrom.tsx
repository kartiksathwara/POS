

// import { useState } from "react";
// import useFetchProducts from "../../hooks/useFetchProducts";
// import Header from "../Header";

// const AddProductForm = () => {
//   const [form, setForm] = useState({
//     title: "",
//     price: "",
//     thumbnail: "",
//     category: "",
//     quantity: "",
//   });
//   const { products, setProducts } = useFetchProducts();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editProduct, setEditProduct] = useState<any>(null); // holds product being edited
//   const [showEditModal, setShowEditModal] = useState(false);

//   const handleChange = (e: any) => {
//     if (e.target.name === "thumbnail") {
//       setForm({ ...form, thumbnail: e.target.files[0] });
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("price", form.price);
//     formData.append("category", form.category);
//     formData.append("quantity", form.quantity);
//     formData.append("thumbnail", form.thumbnail);

//     try {
//       const res = await fetch("http://localhost:5000/api/products", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ Product added successfully!");
//         setForm({
//           title: "",
//           price: "",
//           thumbnail: "",
//           category: "",
//           quantity: "",
//         });
//         setProducts([...products, data]);
//       } else {
//         alert(data.error);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       await fetch(`http://localhost:5000/api/products/${id}`, {
//         method: "DELETE",
//       });
//       setProducts(products.filter((product) => product._id !== id));
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   const handleEditClick = (product: any) => {
//     setEditProduct(product);
//     setShowEditModal(true);
//   };

//   const handleEditChange = (e: any) => {
//     if (e.target.name === "thumbnail") {
//       setEditProduct({ ...editProduct, thumbnail: e.target.files[0] });
//     } else {
//       setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
//     }
//   };

//   const handleUpdate = async (e: any) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", editProduct.title);
//     formData.append("price", editProduct.price);
//     formData.append("category", editProduct.category);
//     formData.append("quantity", editProduct.quantity);

//     if (editProduct.thumbnail instanceof File) {
//       formData.append("thumbnail", editProduct.thumbnail);
//     }

//     try {
//       const res = await fetch(`http://localhost:5000/api/products/${editProduct._id}`, {
//         method: "PUT", // backend should accept PUT or PATCH
//         body: formData,
//       });

//       const updated = await res.json();
//       if (res.ok) {
//         alert("✅ Product updated successfully!");
//         setProducts(
//           products.map((p) => (p._id === updated._id ? updated : p))
//         );
//         setShowEditModal(false);
//         setEditProduct(null);
//       } else {
//         alert(updated.error);
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };

//   const filteredProducts = products.filter((product) =>
//     [product.title, product.category]
//       .join(" ")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   return (<>
//         <Header/>
//     <div className="max-w-7xl mx-auto p-6">
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* ADD PRODUCT FORM */}
//         <form
//           onSubmit={handleSubmit}
//           className="lg:w-1/3 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-xl p-8 space-y-6 border border-blue-100"
//         >
//           <h2 className="text-2xl font-semibold text-blue-700 text-center">
//             🛒 Add New Product
//           </h2>

//           <div className="space-y-4">
//             {["title", "price", "category", "quantity"].map((field) => (
//               <div key={field}>
//                 <label className="block mb-1 text-sm font-medium text-gray-700">
//                   {field.charAt(0).toUpperCase() + field.slice(1)}
//                 </label>
//                 <input
//                   name={field}
//                   type={field === "price" || field === "quantity" ? "number" : "text"}
//                   value={(form as any)[field]}
//                   placeholder={`Enter ${field}`}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             ))}

//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">
//                 Thumbnail
//               </label>
//               <input
//                 name="thumbnail"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleChange}
//                 required
//                 className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
//                   file:rounded-md file:border-0 file:text-sm file:font-semibold
//                   file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md"
//           >
//             Add Product
//           </button>
//         </form>

//         {/* PRODUCT LIST */}
//         <div className="lg:w-2/3">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-semibold text-gray-800">📦 Product List</h3>
//             <input
//               type="text"
//               placeholder="Search by name or category..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-60"
//             />
//           </div>

//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product._id}
//                 className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
//               >
//                 <img
//                   src={`http://localhost:5000/uploads/${product.thumbnail}`}
//                   alt={product.title}
//                   className="h-40 w-full object-contain aspect-square"
//                 />
//                 <div className="p-4 flex flex-col justify-between flex-grow">
//                   <div>
//                     <h3 className="font-semibold text-lg text-gray-800">
//                       {product.title}
//                     </h3>
//                     <p className="text-sm text-gray-500">{product.category}</p>
//                   </div>
//                   <div className="mt-3 flex justify-between items-center gap-2">
//                     <span className="text-blue-600 font-semibold">
//                       ${product.price.toFixed(2)}
//                     </span>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleEditClick(product)}
//                         className="px-3 py-1 text-sm bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(product._id)}
//                         className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             {filteredProducts.length === 0 && (
//               <p className="text-gray-500 text-center col-span-full">
//                 No products match your search 🔎
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* EDIT MODAL */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
//             <h3 className="text-lg font-semibold mb-4 text-blue-700 text-center">
//               ✏️ Edit Product
//             </h3>
//             <form onSubmit={handleUpdate} className="space-y-4">
//               {["title", "price", "category", "quantity"].map((field) => (
//                 <div key={field}>
//                   <label className="block mb-1 text-sm font-medium text-gray-700">
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>
//                   <input
//                     name={field}
//                     type={field === "price" || field === "quantity" ? "number" : "text"}
//                     value={(editProduct as any)[field]}
//                     onChange={handleEditChange}
//                     className="w-full px-3 py-2 border rounded-lg"
//                   />
//                 </div>
//               ))}
//               <div>
//                 <label className="block mb-1 text-sm font-medium text-gray-700">
//                   Thumbnail
//                 </label>
//                 <input
//                   name="thumbnail"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleEditChange}
//                   className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
//                     file:rounded-md file:border-0 file:text-sm file:font-semibold
//                     file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
//                 />
//               </div>

//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowEditModal(false)}
//                   className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   </>

//   );
// };

// export default AddProductForm;








// import { useState } from "react";
// import useFetchProducts from "../../hooks/useFetchProducts";
// import Header from "../Header";

// const AddProductForm = () => {
//   const [form, setForm] = useState({
//     title: "",
//     price: "",
//     thumbnail: "",
//     category: "",
//     quantity: "",
//   });
//   const { products, setProducts } = useFetchProducts();


//   const [showEditModal, setShowEditModal] = useState(false);

//   const handleChange = (e: any) => {
//     if (e.target.name === "thumbnail") {
//       setForm({ ...form, thumbnail: e.target.files[0] });
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("price", form.price);
//     formData.append("category", form.category);
//     formData.append("quantity", form.quantity);
//     formData.append("thumbnail", form.thumbnail);

//     try {
//       const res = await fetch("http://localhost:5000/api/products", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ Product added successfully!");
//         setForm({
//           title: "",
//           price: "",
//           thumbnail: "",
//           category: "",
//           quantity: "",
//         });
//         setProducts([...products, data]);
//       } else {
//         alert(data.error);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };





//   const handleEditChange = (e: any) => {
//     if (e.target.name === "thumbnail") {
//       setEditProduct({ ...editProduct, thumbnail: e.target.files[0] });
//     } else {
//       setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
//     }
//   };

//   const handleUpdate = async (e: any) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", editProduct.title);
//     formData.append("price", editProduct.price);
//     formData.append("category", editProduct.category);
//     formData.append("quantity", editProduct.quantity);

//     if (editProduct.thumbnail instanceof File) {
//       formData.append("thumbnail", editProduct.thumbnail);
//     }

//     try {
//       const res = await fetch(`http://localhost:5000/api/products/${editProduct._id}`, {
//         method: "PUT", // backend should accept PUT or PATCH
//         body: formData,
//       });

//       const updated = await res.json();
//       if (res.ok) {
//         alert("✅ Product updated successfully!");
//         setProducts(
//           products.map((p) => (p._id === updated._id ? updated : p))
//         );
//         setShowEditModal(false);
//         setEditProduct(null);
//       } else {
//         alert(updated.error);
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };

//   const filteredProducts = products.filter((product) =>
//     [product.title, product.category]
//       .join(" ")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   return (<>
//         <Header/>
//     <div className="max-w-7xl mx-auto p-6">
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* ADD PRODUCT FORM */}
//         <form
//           onSubmit={handleSubmit}
//           className="lg:w-1/3 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-xl p-8 space-y-6 border border-blue-100"
//         >
//           <h2 className="text-2xl font-semibold text-blue-700 text-center">
//             🛒 Add New Product
//           </h2>

//           <div className="space-y-4">
//             {["title", "price", "category", "quantity"].map((field) => (
//               <div key={field}>
//                 <label className="block mb-1 text-sm font-medium text-gray-700">
//                   {field.charAt(0).toUpperCase() + field.slice(1)}
//                 </label>
//                 <input
//                   name={field}
//                   type={field === "price" || field === "quantity" ? "number" : "text"}
//                   value={(form as any)[field]}
//                   placeholder={`Enter ${field}`}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             ))}

//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">
//                 Thumbnail
//               </label>
//               <input
//                 name="thumbnail"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleChange}
//                 required
//                 className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
//                   file:rounded-md file:border-0 file:text-sm file:font-semibold
//                   file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md"
//           >
//             Add Product
//           </button>
//         </form>

//         {/* PRODUCT LIST */}

//       </div>

//       {/* EDIT MODAL */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
//             <h3 className="text-lg font-semibold mb-4 text-blue-700 text-center">
//               ✏️ Edit Product
//             </h3>
//             <form onSubmit={handleUpdate} className="space-y-4">
//               {["title", "price", "category", "quantity"].map((field) => (
//                 <div key={field}>
//                   <label className="block mb-1 text-sm font-medium text-gray-700">
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>
//                   <input
//                     name={field}
//                     type={field === "price" || field === "quantity" ? "number" : "text"}
//                     value={(editProduct as any)[field]}
//                     onChange={handleEditChange}
//                     className="w-full px-3 py-2 border rounded-lg"
//                   />
//                 </div>
//               ))}
//               <div>
//                 <label className="block mb-1 text-sm font-medium text-gray-700">
//                   Thumbnail
//                 </label>
//                 <input
//                   name="thumbnail"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleEditChange}
//                   className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
//                     file:rounded-md file:border-0 file:text-sm file:font-semibold
//                     file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
//                 />
//               </div>

//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowEditModal(false)}
//                   className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   </>

//   );
// };

// export default AddProductForm;



// import { useState } from "react";
// import AdminHeader from "./AdminHeader";

// const AddProductForm = () => {
//   const [form, setForm] = useState<any>({
//     title: "",
//     price: "",
//     thumbnail: "",
//     category: "",
//     quantity: "",
//   });
//   const formatIndianCurrency = (value: string) => {
//     if (!value) return "";

//     const number = value.replace(/,/g, "");
//     return Number(number).toLocaleString("en-IN");
//   };
//   const handleChange = (e: any) => {

//     const { name, value, files } = e.target;

//     if (name === "thumbnail") {
//       setForm({ ...form, thumbnail: files[0] });
//     }
//     else if (name === "price") {
//       const rawValue = value.replace(/,/g, "");
//       if (!isNaN(rawValue)) {
//         setForm({
//           ...form,
//           price: formatIndianCurrency(rawValue),
//         });
//       }
//     }
//     else if (name === "quantity") {
//       const qty = Number(value);

//       setForm({ ...form, quantity: value });

//       if (qty > 0 && qty <= 10) {
//         alert("⚠️ Low Stock Warning! Quantity is very low.");
//       }
//     }
//     else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("price", form.price.replace(/,/g, ""));
//     formData.append("category", form.category);
//     formData.append("quantity", form.quantity);
//     formData.append("thumbnail", form.thumbnail);

//     try {
//       const res = await fetch("http://localhost:5000/api/products", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Product added successfully!");
//         setForm({
//           title: "",
//           price: "",
//           thumbnail: "",
//           category: "",
//           quantity: "",
//         });
//       } else {
//         alert(data.error);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <>
//       <AdminHeader />
//       <div className="max-w-7xl mx-auto p-6">
//         <div className="flex flex-col lg:flex-row gap-8">

//           {/* ADD PRODUCT FORM */}
//           <form
//             onSubmit={handleSubmit}
//             className="lg:w-1/3 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-xl p-8 space-y-6 border border-blue-100"
//           >
//             <h2 className="text-2xl font-semibold text-blue-700 text-center">
//               🛒 Add New Product
//             </h2>

//             <div className="space-y-4">
//               {["title", "price", "category", "quantity"].map((field) => (
//                 <div key={field}>
//                   <label className="block mb-1 text-sm font-medium text-gray-700">
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>
//                   <input
//                     name={field}
//                     type={
//                       field === "price"
//                         ? "text"
//                         : field === "quantity"
//                           ? "number"
//                           : "text"
//                     }
//                     value={form[field]}
//                     placeholder={`Enter ${field}`}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               ))}

//               {/* Thumbnail */}
//               <div>
//                 <label className="block mb-1 text-sm font-medium text-gray-700">
//                   Thumbnail
//                 </label>
//                 <input
//                   name="thumbnail"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleChange}
//                   required
//                   className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
//                   file:rounded-md file:border-0 file:text-sm file:font-semibold
//                   file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md"
//             >
//               Add Product
//             </button>
//           </form>

//         </div>
//       </div>
//     </>
//   );
// };

// export default AddProductForm;









































// import { useState } from "react";
// import AdminHeader from "./AdminHeader";
// import AdminSidebar from "./AdminSidebar";

// /* ── Field config ── */
// const FIELDS = [
//   {
//     name: "title",
//     label: "Product Title",
//     type: "text",
//     placeholder: "e.g. Premium Leather Wallet",
//     icon: "◈",
//   },
//   {
//     name: "price",
//     label: "Price (₹)",
//     type: "text",
//     placeholder: "e.g. 1,499",
//     icon: "₹",
//   },
//   {
//     name: "category",
//     label: "Category",
//     type: "text",
//     placeholder: "e.g. Accessories",
//     icon: "◎",
//   },
//   {
//     name: "quantity",
//     label: "Stock Quantity",
//     type: "number",
//     placeholder: "e.g. 50",
//     icon: "◫",
//   },
// ];

// const TIPS = [
//   { icon: "◈", text: "Use clear, descriptive product titles for better searchability." },
//   { icon: "₹", text: "Enter price without ₹ symbol — it formats automatically." },
//   { icon: "◎", text: "Consistent categories help in filtering and reports." },
//   { icon: "◫", text: "Quantity below 10 triggers a low-stock warning." },
//   { icon: "⬡", text: "Upload sharp, white-background images for best results." },
// ];

// const AddProductForm = () => {
//   const [form, setForm] = useState<any>({
//     title: "",
//     price: "",
//     thumbnail: null as File | null,
//     category: "",
//     quantity: "",
//   });

//   const [preview, setPreview] = useState<string | null>(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const formatIndianCurrency = (value: string) => {
//     if (!value) return "";
//     const number = value.replace(/,/g, "");
//     return Number(number).toLocaleString("en-IN");
//   };

//   const handleChange = (e: any) => {
//     const { name, value, files } = e.target;

//     if (name === "thumbnail") {
//       const file = files[0];
//       setForm({ ...form, thumbnail: file });
//       if (file) setPreview(URL.createObjectURL(file));
//     } else if (name === "price") {
//       const rawValue = value.replace(/,/g, "");
//       if (!isNaN(Number(rawValue))) {
//         setForm({ ...form, price: formatIndianCurrency(rawValue) });
//       }
//     } else if (name === "quantity") {
//       setForm({ ...form, quantity: value });
//       if (Number(value) > 0 && Number(value) <= 10) {
//         // low stock — handled via inline UI instead of alert
//       }
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setSubmitting(true);

//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("price", form.price.replace(/,/g, ""));
//     formData.append("category", form.category);
//     formData.append("quantity", form.quantity);
//     formData.append("thumbnail", form.thumbnail);

//     try {
//       const res = await fetch("http://localhost:5000/api/products", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setSuccess(true);
//         setTimeout(() => setSuccess(false), 3000);
//         setForm({ title: "", price: "", thumbnail: null, category: "", quantity: "" });
//         setPreview(null);
//       } else {
//         alert(data.error);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const isLowStock = Number(form.quantity) > 0 && Number(form.quantity) <= 10;
//   const filled = FIELDS.filter((f) => form[f.name]).length + (form.thumbnail ? 1 : 0);
//   const progress = Math.round((filled / (FIELDS.length + 1)) * 100);

//   return (
//     <div className="flex min-h-screen bg-[#FAF6F1] font-sans">

//       {/* ════ SIDEBAR ════ */}
//       <AdminSidebar activeNav="Products" />

//       {/* ════ MAIN ════ */}
//       <div className="flex-1 flex flex-col">
//         <AdminHeader />

//         <main className="flex-1 px-7 py-7 overflow-y-auto">

//           {/* ── Top Bar ── */}
//           <div className="flex justify-between items-center bg-white rounded-2xl px-6 py-4 shadow-sm border border-[#EFE8DF] mb-6">
//             <div>
//               <h2 className="text-[19px] font-bold text-[#3D2314] tracking-tight">
//                 Add New Product
//               </h2>
//               <p className="text-xs text-[#A0856C] mt-0.5">
//                 Fill in the details to list a new product
//               </p>
//             </div>
//             {/* Progress */}
//             <div className="flex items-center gap-3">
//               <div className="text-right">
//                 <p className="text-[11px] text-[#A0856C] uppercase tracking-widest font-semibold">
//                   Completion
//                 </p>
//                 <p className="text-lg font-extrabold text-[#3D2314]">{progress}%</p>
//               </div>
//               <div className="w-12 h-12 relative">
//                 <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
//                   <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F0E8DF" strokeWidth="2.5" />
//                   <circle
//                     cx="18" cy="18" r="15.9" fill="none"
//                     stroke="#8B6F5E" strokeWidth="2.5"
//                     strokeDasharray={`${progress} 100`}
//                     strokeLinecap="round"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* ── Success Banner ── */}
//           {success && (
//             <div className="mb-5 flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-5 py-3.5 text-sm font-semibold shadow-sm">
//               <span className="text-lg">✓</span>
//               Product added successfully!
//             </div>
//           )}

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//             {/* ════ LEFT: FORM ════ */}
//             <div className="lg:col-span-2 flex flex-col gap-5">

//               {/* Image Upload Card */}
//               <div className="bg-white rounded-[18px] p-6 border border-[#EFE8DF] shadow-[0_2px_16px_rgba(92,64,51,0.06)]">
//                 <SectionTitle>Product Image</SectionTitle>

//                 <div className="mt-4 flex gap-5 items-start">
//                   {/* Preview box */}
//                   <div className="w-36 h-36 flex-shrink-0 rounded-2xl bg-[#FAF6F1] border-2 border-dashed border-[#E9DCCF] flex items-center justify-center overflow-hidden relative group">
//                     {preview ? (
//                       <>
//                         <img src={preview} className="w-full h-full object-contain p-2" alt="Preview" />
//                         <div className="absolute inset-0 bg-[#3D2314]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                           <span className="text-white text-xs font-semibold">Change</span>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="text-center p-3">
//                         <div className="text-3xl text-[#E9DCCF] mb-1">⬡</div>
//                         <p className="text-[10px] text-[#C8A882] font-medium">No image</p>
//                       </div>
//                     )}
//                   </div>

//                   {/* Upload area */}
//                   <div className="flex-1">
//                     <label className="block cursor-pointer group">
//                       <div className="border-2 border-dashed border-[#E9DCCF] hover:border-[#C8A882] rounded-2xl p-6 text-center transition-all duration-200 bg-[#FAF6F1] hover:bg-[#F5EDE3]">
//                         <div className="text-2xl text-[#C8A882] mb-2">↑</div>
//                         <p className="text-sm font-semibold text-[#5C4033]">
//                           Click to upload image
//                         </p>
//                         <p className="text-xs text-[#A0856C] mt-1">
//                           PNG, JPG or WEBP · Max 5MB
//                         </p>
//                         {form.thumbnail && (
//                           <p className="text-xs text-[#8B6F5E] mt-2 font-medium truncate max-w-[200px] mx-auto">
//                             ✓ {(form.thumbnail as File).name}
//                           </p>
//                         )}
//                       </div>
//                       <input
//                         type="file"
//                         name="thumbnail"
//                         accept="image/*"
//                         onChange={handleChange}
//                         className="hidden"
//                         required
//                       />
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               {/* Product Details Card */}
//               <div className="bg-white rounded-[18px] p-6 border border-[#EFE8DF] shadow-[0_2px_16px_rgba(92,64,51,0.06)]">
//                 <SectionTitle>Product Details</SectionTitle>

//                 <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {FIELDS.map((field) => (
//                     <div key={field.name} className={field.name === "title" ? "sm:col-span-2" : ""}>
//                       <label className="block text-[11px] text-[#A0856C] font-semibold tracking-widest uppercase mb-1.5">
//                         {field.label}
//                       </label>
//                       <div className="relative">
//                         <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C8A882] text-sm font-medium w-5 text-center">
//                           {field.icon}
//                         </span>
//                         <input
//                           name={field.name}
//                           type={field.type}
//                           value={form[field.name]}
//                           placeholder={field.placeholder}
//                           onChange={handleChange}
//                           required
//                           className="w-full pl-10 pr-4 py-3 border-[1.5px] border-[#E9DCCF] rounded-xl text-sm text-[#3D2314] bg-[#FAF6F1] outline-none focus:border-[#C8A882] focus:ring-2 focus:ring-[#C8A882]/20 transition-all placeholder-[#C8A882]/50"
//                         />
//                       </div>
//                       {/* Low stock warning */}
//                       {field.name === "quantity" && isLowStock && (
//                         <p className="text-[11px] text-amber-600 mt-1.5 flex items-center gap-1 font-medium">
//                           <span>⚠</span> Low stock warning — quantity is very low
//                         </p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 onClick={handleSubmit}
//                 disabled={submitting}
//                 className={`
//                   w-full py-4 rounded-2xl text-sm font-bold tracking-wide shadow-[0_8px_28px_rgba(61,35,20,0.25)]
//                   transition-all duration-300 flex items-center justify-center gap-2
//                   ${submitting
//                     ? "bg-[#8B6F5E] cursor-not-allowed text-white/70"
//                     : "bg-gradient-to-r from-[#5C4033] to-[#3D2314] text-white hover:from-[#3D2314] hover:to-[#2a1709] hover:shadow-[0_12px_36px_rgba(61,35,20,0.35)]"
//                   }
//                 `}
//               >
//                 {submitting ? (
//                   <>
//                     <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
//                     Adding Product…
//                   </>
//                 ) : (
//                   <>
//                     <span className="text-base">+</span>
//                     Add Product
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* ════ RIGHT: SIDEBAR PANELS ════ */}
//             <div className="flex flex-col gap-5">

//               {/* Form Checklist */}
//               <div className="bg-white rounded-[18px] p-6 border border-[#EFE8DF] shadow-[0_2px_16px_rgba(92,64,51,0.06)]">
//                 <SectionTitle>Checklist</SectionTitle>
//                 <div className="mt-4 space-y-2.5">
//                   {[...FIELDS.map((f) => ({ label: f.label, done: !!form[f.name] })),
//                     { label: "Product Image", done: !!form.thumbnail }
//                   ].map((item) => (
//                     <div key={item.label} className="flex items-center gap-3">
//                       <div className={`
//                         w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold transition-all duration-300
//                         ${item.done
//                           ? "bg-[#3D2314] text-[#C8A882]"
//                           : "bg-[#F0E8DF] text-[#C8A882]/40"
//                         }
//                       `}>
//                         {item.done ? "✓" : "·"}
//                       </div>
//                       <span className={`text-sm transition-colors ${item.done ? "text-[#3D2314] font-semibold" : "text-[#A0856C]"}`}>
//                         {item.label}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Progress bar */}
//                 <div className="mt-5">
//                   <div className="flex justify-between text-[11px] text-[#A0856C] mb-1.5">
//                     <span>Progress</span>
//                     <span className="font-bold text-[#5C4033]">{progress}%</span>
//                   </div>
//                   <div className="h-2 bg-[#F0E8DF] rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-gradient-to-r from-[#8B6F5E] to-[#5C4033] rounded-full transition-all duration-500"
//                       style={{ width: `${progress}%` }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Tips Card */}
//               <div className="bg-gradient-to-br from-[#3D2314] to-[#5C4033] rounded-[18px] p-6 shadow-[0_8px_28px_rgba(61,35,20,0.2)]">
//                 <div className="flex items-center gap-2 mb-4">
//                   <span className="text-[#C8A882] text-base">◎</span>
//                   <span className="text-[#FAF6F1] text-sm font-bold tracking-tight">Tips</span>
//                 </div>
//                 <div className="space-y-3">
//                   {TIPS.map((tip, i) => (
//                     <div key={i} className="flex gap-2.5">
//                       <span className="text-[#C8A882] text-xs mt-0.5 flex-shrink-0">{tip.icon}</span>
//                       <p className="text-[#E9DCCF]/70 text-xs leading-relaxed">{tip.text}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Quick Stats */}
//               <div className="bg-white rounded-[18px] p-6 border border-[#EFE8DF] shadow-[0_2px_16px_rgba(92,64,51,0.06)]">
//                 <SectionTitle>Quick Info</SectionTitle>
//                 <div className="mt-4 space-y-3">
//                   {[
//                     { label: "Max file size", value: "5 MB" },
//                     { label: "Accepted formats", value: "JPG, PNG, WEBP" },
//                     { label: "Low stock threshold", value: "≤ 10 units" },
//                     { label: "Price format", value: "Indian (en-IN)" },
//                   ].map((item) => (
//                     <div key={item.label} className="flex justify-between items-center py-2 border-b border-[#F5EDE3] last:border-b-0">
//                       <span className="text-xs text-[#A0856C]">{item.label}</span>
//                       <span className="text-xs font-bold text-[#5C4033] bg-[#F5EDE3] px-2 py-0.5 rounded-full">
//                         {item.value}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// /* ── Section Title ── */
// const SectionTitle = ({ children }: { children: React.ReactNode }) => (
//   <div className="flex items-center gap-2 text-sm font-bold text-[#3D2314] tracking-tight">
//     <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-br from-[#C8A882] to-[#8B6F5E]" />
//     {children}
//   </div>
// );

// export default AddProductForm;












import { useState, useRef } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
const CATEGORIES = [
  "Electronics", "Clothing", "Accessories", "Footwear",
  "Home & Living", "Books", "Sports", "Beauty", "Toys", "Other"
];

const STEPS = [
  { n: 1, label: "Basic Info", icon: "◈" },
  { n: 2, label: "Pricing", icon: "₹" },
  { n: 3, label: "Media", icon: "⬡" },
  { n: 4, label: "Review", icon: "✓" },
];

/* ── Shared Tailwind strings ── */
const inputCls = "w-full px-4 py-3 border-[1.5px] border-[#E9DCCF] rounded-xl text-sm text-[#3D2314] bg-[#FAF6F1] outline-none focus:border-[#C8A882] focus:ring-2 focus:ring-[#C8A882]/20 transition-all placeholder-[#C8A882]/40 mt-2";
const nextBtnCls = "py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#5C4033] to-[#3D2314] text-white hover:from-[#3D2314] hover:to-[#2a1709] shadow-[0_6px_20px_rgba(61,35,20,0.25)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed";
const backBtnCls = "px-5 py-3.5 rounded-xl text-sm font-semibold bg-[#FAF6F1] text-[#8B6F5E] border border-[#E9DCCF] hover:bg-[#F0E8DF] transition-colors";

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[11px] text-[#A0856C] font-semibold tracking-widest uppercase">
    {children}
  </label>
);

const StepHeader = ({ icon, title, sub }: { icon: string; title: string; sub: string }) => (
  <div className="bg-gradient-to-r from-[#3D2314] to-[#5C4033] px-7 py-5">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#C8A882] text-lg">{icon}</div>
      <div>
        <h3 className="text-[#FAF6F1] font-bold text-base">{title}</h3>
        <p className="text-[#C8A882]/70 text-xs mt-0.5">{sub}</p>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════ */
const AddProductForm = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<any>({
    title: "", price: "", thumbnail: null, category: "", quantity: "", description: "",
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const formatPrice = (v: string) => {
    const n = v.replace(/,/g, "");
    return isNaN(Number(n)) ? v : Number(n).toLocaleString("en-IN");
  };

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      const f = files[0];
      setForm({ ...form, thumbnail: f });
      if (f) setPreview(URL.createObjectURL(f));
    } else if (name === "price") {
      const raw = value.replace(/,/g, "");
      if (!isNaN(Number(raw))) setForm({ ...form, price: formatPrice(raw) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f?.type.startsWith("image/")) {
      setForm({ ...form, thumbnail: f });
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("price", form.price.replace(/,/g, ""));
    fd.append("category", form.category);
    fd.append("quantity", form.quantity);
    fd.append("thumbnail", form.thumbnail);
    if (form.description) fd.append("description", form.description);
    try {
      const res = await fetch("http://localhost:5000/api/products", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setForm({ title: "", price: "", thumbnail: null, category: "", quantity: "", description: "" });
        setPreview(null);
        setTimeout(() => { setSuccess(false); setStep(1); }, 3500);
      } else alert(data.error);
    } catch (err) { console.error(err); }
    finally { setSubmitting(false); }
  };

  const isLowStock = Number(form.quantity) > 0 && Number(form.quantity) <= 10;
  const step1Valid = !!(form.title && form.category);
  const step2Valid = !!(form.price && form.quantity);
  const step3Valid = !!form.thumbnail;

  /* ── SUCCESS SCREEN ── */
  if (success) return (
    <div className="flex min-h-screen bg-[#FAF6F1] font-sans">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
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
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C8A882] to-[#5C4033] flex items-center justify-center mx-auto mb-5 shadow-[0_8px_32px_rgba(92,64,51,0.3)]">
              <span className="text-white text-3xl font-bold">✓</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#3D2314]">Product Published!</h2>
            <p className="text-[#A0856C] text-sm mt-2">Your product is now live in the catalog.</p>
            <button
              onClick={() => { setSuccess(false); setStep(1); }}
              className="mt-6 px-6 py-2.5 rounded-xl bg-[#3D2314] text-[#FAF6F1] text-sm font-semibold hover:bg-[#5C4033] transition-colors"
            >
              Add Another Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
        <main className="flex-1 px-7 py-7 overflow-y-auto flex flex-col gap-6">

          {/* ── Top stepper bar ── */}
          <div className="flex justify-between items-center bg-white rounded-2xl px-6 py-4 shadow-sm border border-[#EFE8DF]">
            <div>
              <h2 className="text-[19px] font-bold text-[#3D2314] tracking-tight">Add New Product</h2>
              <p className="text-xs text-[#A0856C] mt-0.5">Step {step} of 4 — {STEPS[step - 1].label}</p>
            </div>
            <div className="flex items-center gap-1.5">
              {STEPS.map((s, i) => (
                <div key={s.n} className="flex items-center gap-1.5">
                  <button
                    onClick={() => { if (s.n <= step) setStep(s.n); }}
                    className={`w-8 h-8 rounded-full text-[11px] font-extrabold flex items-center justify-center transition-all duration-300
                      ${step === s.n
                        ? "bg-[#3D2314] text-[#C8A882] shadow-[0_4px_12px_rgba(61,35,20,0.3)]"
                        : s.n < step ? "bg-[#C8A882]/30 text-[#5C4033]"
                          : "bg-[#F0E8DF] text-[#C8A882]/50"
                      }`}
                  >
                    {s.n < step ? "✓" : s.n}
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={`w-8 h-[2px] rounded-full transition-all duration-500 ${s.n < step ? "bg-[#C8A882]" : "bg-[#F0E8DF]"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT — step content */}
            <div className="lg:col-span-2">

              {/* ──────── STEP 1 ──────── */}
              {step === 1 && (
                <div className="bg-white rounded-[20px] border border-[#EFE8DF] shadow-[0_2px_20px_rgba(92,64,51,0.07)] overflow-hidden">
                  <StepHeader icon="◈" title="Basic Information" sub="Name your product and pick a category" />

                  <div className="p-7 space-y-6">
                    <div>
                      <Label>Product Title</Label>
                      <input name="title" type="text" value={form.title} onChange={handleChange}
                        placeholder="e.g. Premium Leather Wallet" className={inputCls} />
                      {form.title && <p className="text-[11px] text-[#A0856C] mt-1.5">{form.title.length} characters</p>}
                    </div>

                    <div>
                      <Label>Category</Label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-2">
                        {CATEGORIES.map((cat) => (
                          <button key={cat} type="button" onClick={() => setForm({ ...form, category: cat })}
                            className={`py-2 px-2 rounded-xl text-[11px] font-semibold transition-all duration-200 text-center border
                              ${form.category === cat
                                ? "bg-[#3D2314] text-[#C8A882] border-[#3D2314] shadow-[0_4px_10px_rgba(61,35,20,0.2)]"
                                : "bg-[#FAF6F1] text-[#8B6F5E] border-[#E9DCCF] hover:border-[#C8A882] hover:bg-[#F5EDE3]"
                              }`}
                          >{cat}</button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Description <span className="text-[#C8A882]/50 font-normal normal-case tracking-normal">(optional)</span></Label>
                      <textarea name="description" value={form.description} onChange={handleChange}
                        placeholder="Describe your product in a few lines..." rows={3} className={`${inputCls} resize-none`} />
                    </div>
                  </div>

                  <div className="px-7 pb-7">
                    <button onClick={() => step1Valid && setStep(2)} disabled={!step1Valid} className={`w-full ${nextBtnCls}`}>
                      Continue to Pricing →
                    </button>
                  </div>
                </div>
              )}

              {/* ──────── STEP 2 ──────── */}
              {step === 2 && (
                <div className="bg-white rounded-[20px] border border-[#EFE8DF] shadow-[0_2px_20px_rgba(92,64,51,0.07)] overflow-hidden">
                  <StepHeader icon="₹" title="Pricing & Stock" sub="Set the price and available quantity" />

                  <div className="p-7 space-y-6">
                    <div>
                      <Label>Selling Price</Label>
                      <div className="relative mt-2">
                        <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center bg-[#F5EDE3] rounded-l-xl border-r border-[#E9DCCF]">
                          <span className="text-[#8B6F5E] font-bold text-sm">₹</span>
                        </div>
                        <input name="price" type="text" value={form.price} onChange={handleChange}
                          placeholder="0"
                          className="w-full pl-14 pr-4 py-3.5 border-[1.5px] border-[#E9DCCF] rounded-xl text-[#3D2314] font-bold text-lg bg-[#FAF6F1] outline-none focus:border-[#C8A882] focus:ring-2 focus:ring-[#C8A882]/20 transition-all placeholder-[#C8A882]/30"
                        />
                      </div>
                      {form.price && (
                        <p className="text-xs text-[#A0856C] mt-2">Display price: <span className="font-bold text-[#5C4033]">₹{form.price}</span></p>
                      )}
                    </div>

                    <div>
                      <Label>Stock Quantity</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <button type="button" onClick={() => setForm({ ...form, quantity: String(Math.max(0, Number(form.quantity) - 1)) })}
                          className="w-11 h-11 rounded-xl bg-[#F0E8DF] hover:bg-[#E9DCCF] text-[#5C4033] font-bold text-xl flex items-center justify-center transition-colors">−</button>
                        <input name="quantity" type="number" value={form.quantity} onChange={handleChange}
                          placeholder="0"
                          className="flex-1 text-center py-3 border-[1.5px] border-[#E9DCCF] rounded-xl text-[#3D2314] font-bold text-xl bg-[#FAF6F1] outline-none focus:border-[#C8A882] focus:ring-2 focus:ring-[#C8A882]/20 transition-all"
                        />
                        <button type="button" onClick={() => setForm({ ...form, quantity: String(Number(form.quantity) + 1) })}
                          className="w-11 h-11 rounded-xl bg-[#3D2314] hover:bg-[#5C4033] text-[#C8A882] font-bold text-xl flex items-center justify-center transition-colors">+</button>
                      </div>

                      {form.quantity && (
                        <div className={`mt-3 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold
                          ${isLowStock ? "bg-amber-50 border border-amber-200 text-amber-700"
                            : Number(form.quantity) > 50 ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                              : "bg-[#F5EDE3] border border-[#E9DCCF] text-[#8B6F5E]"
                          }`}>
                          <span>{isLowStock ? "⚠" : "●"}</span>
                          {isLowStock ? "Low stock — consider restocking soon"
                            : Number(form.quantity) > 50 ? "Healthy stock level"
                              : "Moderate stock level"
                          }
                        </div>
                      )}
                    </div>

                    {form.price && form.quantity && (
                      <div className="rounded-2xl bg-gradient-to-br from-[#FAF6F1] to-[#F5EDE3] border border-[#E9DCCF] p-4">
                        <p className="text-[11px] text-[#A0856C] font-bold uppercase tracking-widest mb-3">Inventory Value</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#8B6F5E]">₹{form.price} × {form.quantity} units</span>
                          <span className="text-lg font-extrabold text-[#3D2314]">
                            ₹{(Number(form.price.replace(/,/g, "")) * Number(form.quantity)).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="px-7 pb-7 flex gap-3">
                    <button onClick={() => setStep(1)} className={backBtnCls}>← Back</button>
                    <button onClick={() => step2Valid && setStep(3)} disabled={!step2Valid} className={`flex-1 ${nextBtnCls}`}>
                      Continue to Media →
                    </button>
                  </div>
                </div>
              )}

              {/* ──────── STEP 3 ──────── */}
              {step === 3 && (
                <div className="bg-white rounded-[20px] border border-[#EFE8DF] shadow-[0_2px_20px_rgba(92,64,51,0.07)] overflow-hidden">
                  <StepHeader icon="⬡" title="Product Image" sub="Upload a clear product photo" />

                  <div className="p-7">
                    <div
                      onDrop={handleDrop}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onClick={() => fileRef.current?.click()}
                      className={`relative rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 text-center
                        ${dragOver ? "border-[#8B6F5E] bg-[#F5EDE3] scale-[1.01]"
                          : preview ? "border-[#C8A882] bg-[#FAF6F1]"
                            : "border-[#E9DCCF] bg-[#FAF6F1] hover:border-[#C8A882] hover:bg-[#F5EDE3]"
                        }`}
                    >
                      {preview ? (
                        <div className="p-4">
                          <img src={preview} className="h-52 w-full object-contain rounded-xl" alt="Preview" />
                          <p className="text-xs text-[#A0856C] mt-3 font-medium">✓ {(form.thumbnail as File)?.name}</p>
                          <p className="text-[11px] text-[#C8A882] mt-1">Click to replace</p>
                        </div>
                      ) : (
                        <div className="py-16 px-6">
                          <div className="w-16 h-16 rounded-2xl bg-[#F0E8DF] flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl text-[#C8A882]">↑</span>
                          </div>
                          <p className="text-sm font-bold text-[#5C4033]">
                            {dragOver ? "Drop your image here" : "Drag & drop or click to upload"}
                          </p>
                          <p className="text-xs text-[#A0856C] mt-2">PNG, JPG, WEBP · Max 5MB</p>
                        </div>
                      )}
                    </div>
                    <input ref={fileRef} type="file" name="thumbnail" accept="image/*" onChange={handleChange} className="hidden" />
                  </div>

                  <div className="px-7 pb-7 flex gap-3">
                    <button onClick={() => setStep(2)} className={backBtnCls}>← Back</button>
                    <button onClick={() => step3Valid && setStep(4)} disabled={!step3Valid} className={`flex-1 ${nextBtnCls}`}>
                      Review Product →
                    </button>
                  </div>
                </div>
              )}

              {/* ──────── STEP 4 ──────── */}
              {step === 4 && (
                <div className="bg-white rounded-[20px] border border-[#EFE8DF] shadow-[0_2px_20px_rgba(92,64,51,0.07)] overflow-hidden">
                  <StepHeader icon="✓" title="Review & Submit" sub="Confirm all details before publishing" />

                  <div className="p-7">
                    <div className="flex gap-5 items-start">
                      {preview && (
                        <div className="w-28 h-28 flex-shrink-0 rounded-2xl border border-[#EFE8DF] overflow-hidden bg-[#FAF6F1]">
                          <img src={preview} className="w-full h-full object-contain p-2" alt="product" />
                        </div>
                      )}
                      <div className="flex-1 space-y-3">
                        <div>
                          <p className="text-[10px] text-[#A0856C] uppercase tracking-widest font-bold">Product Name</p>
                          <p className="text-[#3D2314] font-bold text-base mt-0.5">{form.title}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { label: "Price", value: `₹${form.price}` },
                            { label: "Quantity", value: `${form.quantity} units` },
                            { label: "Category", value: form.category },
                          ].map((item) => (
                            <div key={item.label} className="bg-[#FAF6F1] rounded-xl p-3 border border-[#EFE8DF]">
                              <p className="text-[10px] text-[#A0856C] uppercase tracking-widest font-bold">{item.label}</p>
                              <p className="text-[#3D2314] font-bold text-sm mt-0.5 truncate">{item.value}</p>
                            </div>
                          ))}
                        </div>
                        {form.description && (
                          <div className="bg-[#FAF6F1] rounded-xl p-3 border border-[#EFE8DF]">
                            <p className="text-[10px] text-[#A0856C] uppercase tracking-widest font-bold mb-1">Description</p>
                            <p className="text-xs text-[#5C4033] leading-relaxed">{form.description}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-5 flex-wrap">
                      {[1, 2, 3].map((n) => (
                        <button key={n} onClick={() => setStep(n)}
                          className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#F5EDE3] text-[#8B6F5E] hover:bg-[#E9DCCF] transition-colors">
                          Edit Step {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="px-7 pb-7 flex gap-3">
                    <button onClick={() => setStep(3)} className={backBtnCls}>← Back</button>
                    <button onClick={handleSubmit} disabled={submitting}
                      className={`flex-1 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2
                        ${submitting ? "bg-[#8B6F5E] text-white/70 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#5C4033] to-[#3D2314] text-white hover:from-[#3D2314] hover:to-[#2a1709] shadow-[0_6px_20px_rgba(61,35,20,0.28)]"
                        }`}
                    >
                      {submitting
                        ? <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Publishing…</>
                        : "Publish Product ✓"
                      }
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT — live preview + progress */}
            <div className="flex flex-col gap-5">

              {/* Live Preview Card */}
              <div className="bg-white rounded-[18px] border border-[#EFE8DF] shadow-[0_2px_16px_rgba(92,64,51,0.06)] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#F0E8DF] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-br from-[#C8A882] to-[#8B6F5E]" />
                  <span className="text-sm font-bold text-[#3D2314]">Live Preview</span>
                </div>
                <div className="p-5">
                  <div className="rounded-2xl border border-[#EFE8DF] bg-[#FAF6F1] overflow-hidden">
                    <div className="h-32 bg-[#F0E8DF] flex items-center justify-center">
                      {preview
                        ? <img src={preview} className="h-full w-full object-contain p-3" alt="Preview" />
                        : <span className="text-4xl text-[#E9DCCF]">⬡</span>
                      }
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-[#A0856C] font-medium truncate">{form.category || "Category"}</p>
                      <p className="text-sm font-bold text-[#3D2314] mt-0.5 truncate">{form.title || "Product Title"}</p>
                      <p className="text-base font-extrabold text-[#5C4033] mt-1">{form.price ? `₹${form.price}` : "₹0"}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[11px] text-[#A0856C]">{form.quantity ? `${form.quantity} in stock` : "Stock: —"}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold
                          ${isLowStock ? "bg-amber-100 text-amber-600" : "bg-[#E9DCCF] text-[#8B6F5E]"}`}>
                          {isLowStock ? "Low Stock" : "In Stock"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Guide */}
              <div className="bg-gradient-to-br from-[#3D2314] to-[#5C4033] rounded-[18px] p-5 shadow-[0_8px_28px_rgba(61,35,20,0.2)]">
                <p className="text-[#C8A882] text-[11px] font-bold tracking-widest uppercase mb-4">Your Progress</p>
                <div className="space-y-3">
                  {STEPS.map((s) => (
                    <div key={s.n} className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-extrabold flex-shrink-0 transition-all
                        ${s.n < step ? "bg-[#C8A882] text-[#3D2314]"
                          : s.n === step ? "bg-white text-[#3D2314]"
                            : "bg-white/10 text-[#C8A882]/40"
                        }`}>
                        {s.n < step ? "✓" : s.icon}
                      </div>
                      <p className={`text-xs font-semibold transition-colors
                        ${s.n === step ? "text-[#FAF6F1]"
                          : s.n < step ? "text-[#C8A882]"
                            : "text-[#E9DCCF]/35"
                        }`}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddProductForm;