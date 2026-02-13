// import { useEffect, useState } from "react";
// import Header from "../Header";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const AdminProductsPage = () => {
//   const [products, setProducts] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editProduct, setEditProduct] = useState<any>(null); // holds product being edited

//   const fetchProducts = async () => {
//     const res = await fetch("http://localhost:5000/api/products");
//     const data = await res.json();
//     setProducts(data);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // const handleDelete = async (id: string) => {
//   //   await fetch(`http://localhost:5000/api/products/${id}`, {
//   //     method: "DELETE",
//   //   });
//   //   fetchProducts();
//   // };
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
//   const filteredProducts = products.filter((product) =>
//     [product.title, product.category]
//       .join(" ")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );
//   const handleEditClick = (product: any) => {
//     setEditProduct(product);
//     setShowEditModal(true);
//   };
//   return (
//     <>
//       <Header />
//       <div className="lg:w-2/3">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-semibold text-gray-800">📦 Product List</h3>
//           <input
//             type="text"
//             placeholder="Search by name or category..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-60"
//           />
//         </div>

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {filteredProducts.map((product) => (
//             <div
//               key={product._id}
//               className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
//             >
//               <img
//                 src={`http://localhost:5000/uploads/${product.thumbnail}`}
//                 alt={product.title}
//                 className="h-40 w-full object-contain aspect-square"
//               />
//               <div className="p-4 flex flex-col justify-between flex-grow">
//                 <div>
//                   <h3 className="font-semibold text-lg text-gray-800">
//                     {product.title}
//                   </h3>
//                   <p className="text-sm text-gray-500">{product.category}</p>
//                 </div>
//                 <div className="mt-3 flex justify-between items-center gap-2">
//                   <span className="text-blue-600 font-semibold">
//                     ${product.price.toFixed(2)}
//                   </span>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleEditClick(product)}
//                       className="px-3 py-1 text-sm bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(product._id)}
//                       className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//           {filteredProducts.length === 0 && (
//             <p className="text-gray-500 text-center col-span-full">
//               No products match your search 🔎
//             </p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminProductsPage;




import { useEffect, useState } from "react";
import Header from "../Header";

const AdminProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [editProduct, setEditProduct] = useState<any>(null);
  const [showEdit, setShowEdit] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const openEdit = (product: any) => {
    setEditProduct(product);
    setShowEdit(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete product?")) return;

    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });

    setProducts(products.filter((p) => p._id !== id));
  };

  const handleEditChange = (e: any) => {
    if (e.target.name === "thumbnail") {
      setEditProduct({ ...editProduct, thumbnail: e.target.files[0] });
    } else {
      setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", editProduct.title);
    formData.append("price", editProduct.price);
    formData.append("category", editProduct.category);
    formData.append("quantity", editProduct.quantity);

    if (editProduct.thumbnail instanceof File) {
      formData.append("thumbnail", editProduct.thumbnail);
    }

    const res = await fetch(
      `http://localhost:5000/api/products/${editProduct._id}`,
      { method: "PUT", body: formData }
    );

    const updated = await res.json();

    if (res.ok) {
      setProducts(products.map((p) =>
        p._id === updated._id ? updated : p
      ));
      setShowEdit(false);
      setEditProduct(null);
      alert("Updated Successfully");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-secondary">
      <Header />

      <div className="flex-1 overflow-y-auto p-6">

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          ‹ PRODUCTS
        </h2>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl mb-6 bg-white shadow-sm focus:ring-2 focus:ring-blue-400"
        />

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition"
            >
              <img
                src={`http://localhost:5000/uploads/${p.thumbnail}`}
                className="h-36 w-full object-contain bg-gray-50 rounded-lg"
              />

              <h3 className="font-semibold mt-2 text-gray-800">
                {p.title}
              </h3>
              <p className="text-sm text-gray-500">{p.category}</p>
              <p className="text-blue-600 font-bold">₹{p.price}</p>

              {/* EDIT */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => openEdit(p)}
                  className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="w-1/2 bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* EDIT MODAL */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">

          <form
            onSubmit={handleUpdate}
            className="bg-white rounded-xl p-6 w-96 space-y-5 shadow-lg border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-center text-gray-800">
              Edit Product
            </h3>

            {/* CURRENT IMAGE */}
            {/* CURRENT IMAGE */}
            {editProduct.thumbnail && (
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-gray-500">Current Image</p>
                <img
                  src={
                    editProduct.thumbnail instanceof File
                      ? URL.createObjectURL(editProduct.thumbnail)
                      : `http://localhost:5000/uploads/${editProduct.thumbnail}`
                  }
                  className="h-28 object-contain rounded-lg border bg-gray-50 p-2"
                />
              </div>
            )}


            {/* TEXT FIELDS */}
            {["title", "price", "category", "quantity"].map((field) => (
              <input
                key={field}
                name={field}
                value={editProduct[field]}
                onChange={handleEditChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            ))}

            {/* FILE INPUT */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Change Image
              </label>
              <input
                type="file"
                name="thumbnail"
                onChange={handleEditChange}
                className="block w-full text-sm text-gray-700
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-100 file:text-blue-700
            hover:file:bg-blue-200 cursor-pointer"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="w-1/2 bg-gray-200 hover:bg-gray-300 py-3 rounded-lg font-medium"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold shadow"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default AdminProductsPage;
