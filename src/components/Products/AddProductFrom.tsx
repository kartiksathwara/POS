import { useState } from "react";

const AddProductForm = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    thumbnail: "",
    category: "",
    quantity: "",
  });

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
        alert("Product added successfully");
        setForm({
          title: "",
          price: "",
          thumbnail: "",
          category: "",
          quantity: "",
        });
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-16 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-xl p-8 space-y-6 border border-blue-100"
    >
      <h2 className="text-2xl font-semibold text-blue-700 text-center">
        🛒 Add New Product
      </h2>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          name="title"
          placeholder="Product title"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Price ($)
        </label>
        <input
          name="price"
          type="number"
          placeholder="e.g. 29"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Thumbnail
        </label>
        <input
          name="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleChange}
          required
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0 file:text-sm file:font-semibold
        file:bg-blue-100 file:text-blue-700
        hover:file:bg-blue-200 cursor-pointer"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          name="category"
          placeholder="e.g. Electronics"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          name="quantity"
          type="number"
          placeholder="e.g. 100"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
