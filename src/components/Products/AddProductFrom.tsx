import { useState } from "react";
import useFetchProducts from "../../hooks/useFetchProducts";
// import axios from "axios";

const AddProductForm = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    thumbnail: "",
    category: "",
    quantity: "",
  });
  const { products, setProducts } = useFetchProducts();

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: any) => {
    if (e.target.name === "thumbnail") {
      setForm({ ...form, thumbnail: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("quantity", form.quantity);
    formData.append("thumbnail", form.thumbnail);

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Product added successfully!");
        setForm({
          title: "",
          price: "",
          thumbnail: "",
          category: "",
          quantity: "",
        });
        setProducts([...products, data]); // update UI immediately
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    [product.title, product.category]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <form
          onSubmit={handleSubmit}
          className="lg:w-1/3 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-xl p-8 space-y-6 border border-blue-100"
        >
          <h2 className="text-2xl font-semibold text-blue-700 text-center">
            🛒 Add New Product
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                name="title"
                value={form.title}
                placeholder="Product title"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <input
                name="price"
                type="number"
                value={form.price}
                placeholder="e.g. 29"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Thumbnail
              </label>
              <input
                name="thumbnail"
                // value={form.thumbnail}
                type="file"
                accept="image/*"
                onChange={handleChange}
                required
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0 file:text-sm file:font-semibold
                  file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                name="category"
                value={form.category}
                placeholder="e.g. Electronics"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                name="quantity"
                type="number"
                value={form.quantity}
                placeholder="e.g. 100"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md"
          >
            {/* ➕ */}
            Add Product
          </button>
        </form>

        {/* Product List */}
        <div className="lg:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              📦 Product List
            </h3>
            {/* 🔍 Search box */}
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-60"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={`http://localhost:5000/uploads/${product.thumbnail}`}
                  alt={product.title}
                  className="h-40 w-full object-contain aspect-square "
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-blue-600 font-semibold">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <p className="text-gray-500 text-center col-span-full">
                No products match your search 🔎
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
