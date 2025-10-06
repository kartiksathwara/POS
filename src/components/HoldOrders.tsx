import SearchBar from "./SearchBar";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";

interface Customer {
  name: string;
  phone?: string;
  email?: string;
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface HoldOrder {
  id: string;
  cartItems: CartItem[];
  totalAmount: string;
  customer?: Customer;
}

const HoldOrders = () => {
  const [orders, setOrders] = useState<HoldOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("holdOrders");
    if (stored) setOrders(JSON.parse(stored));
  }, []);

  const handleDelete = (idToDelete: string) => {
    const filtered = orders.filter((o) => o.id !== idToDelete);
    setOrders(filtered);
    localStorage.setItem("holdOrders", JSON.stringify(filtered));
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredOrders = orders.filter((order) =>
    `${order.id} ${order.customer?.name || ""} ${order.totalAmount}`
      .toLowerCase()
      .includes(searchTerm)
  );

  return (
    <div className="w-full">
      <Header />
      <div className="flex flex-col gap-4 p-4 overflow-hidden">
        <div className="flex items-center gap-2">
          <Link to="/" className="">
            <IoIosArrowBack size={20} />
          </Link>
          <h1 className="text-xl capitalize font-bold">HOLD ORDERS</h1>
        </div>

        <SearchBar onSearch={handleSearch} />

        <table className="w-full bg-[var(--main)] rounded-t-xl text-left">
          <thead>
            <tr>
              <th className="p-3 text-white">Hold ID</th>
              <th className="p-3 text-white">Customer</th>
              <th className="p-3 text-white">Total Amount</th>
              <th className="p-3 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="bg-[var(--bgorder)] border-b border-[var(--primary)] cursor-pointer"
                onClick={() => {
                  localStorage.setItem("selectedOrder", JSON.stringify(order));
                  navigate("/inventory");
                }}
              >
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer?.name || "N/A"}</td>
                <td className="p-3">${order.totalAmount}</td>
                <td className="p-3">
                  <FaTrash
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(order.id);
                    }}
                  />
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500 bg-white">
                  No hold orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HoldOrders;




// import { useEffect, useState } from "react";
// import Header from "../Header";
// import SearchBar from "../SearchBar";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { FaTrash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import useFetchProducts from "../../hooks/useFetchProducts";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   thumbnail: string;
//   category: string;
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// interface Customer {
//   name: string;
//   phone?: string;
//   email?: string;
// }

// interface HoldOrder {
//   id: string; // unique order id
//   cartItems: CartItem[];
//   totalAmount: string;
//   customer?: Customer;
// }

// const Inventory = () => {
//   const navigate = useNavigate();
//   const categories = ["All", "beauty", "fragrances", "furniture", "groceries"];
//   const { products, setProducts, allProducts } = useFetchProducts();

//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>("All");
//   const [showMobileCategories, setShowMobileCategories] = useState(false);

//   // hold order popup
//   const [showCustomerInput, setShowCustomerInput] = useState(false);
//   const [customerName, setCustomerName] = useState("");

//   // load cart and selected hold order
//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) setCartItems(JSON.parse(savedCart));

//     const selectedOrderRaw = localStorage.getItem("selectedOrder");
//     if (selectedOrderRaw) {
//       try {
//         const selectedOrder: HoldOrder = JSON.parse(selectedOrderRaw);
//         setCartItems(selectedOrder.cartItems || []);
//         localStorage.setItem("cart", JSON.stringify(selectedOrder.cartItems || []));
//         localStorage.removeItem("selectedOrder");
//       } catch (err) {
//         console.error("Invalid selectedOrder in localStorage", err);
//       }
//     }
//   }, []);

//   const filteredProducts =
//     selectedCategory === "All"
//       ? products || []
//       : (products || []).filter((p) => p.category === selectedCategory);

//   // --- Cart functions ---
//   const handleAddToCart = (product: Product) => {
//     const existing = cartItems.find((item) => item.id === product.id);
//     let updatedCart = existing
//       ? cartItems.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         )
//       : [...cartItems, { ...product, quantity: 1 }];
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const increaseQty = (id: number) => {
//     const updated = cartItems.map((item) =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     setCartItems(updated);
//     localStorage.setItem("cart", JSON.stringify(updated));
//   };

//   const decreaseQty = (id: number) => {
//     const updated = cartItems
//       .map((item) =>
//         item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
//       )
//       .filter((item) => item.quantity > 0);
//     setCartItems(updated);
//     localStorage.setItem("cart", JSON.stringify(updated));
//   };

//   const handleRemoveItem = (id: number) => {
//     const updated = cartItems.filter((item) => item.id !== id);
//     setCartItems(updated);
//     localStorage.setItem("cart", JSON.stringify(updated));
//   };

//   const handleClearCart = () => {
//     setCartItems([]);
//     localStorage.removeItem("cart");
//   };

//   const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const selectedDiscount = localStorage.getItem("selectedDiscount") || "18%";
//   const discountReason = localStorage.getItem("discountReason") || "Default Discount";
//   const discountPercent = parseFloat(selectedDiscount.replace("%", ""));
//   const discount = subtotal * (discountPercent / 100);
//   const tax = (subtotal - discount) * 0.08;
//   const total = subtotal - discount + tax;

//   const handleCheckout = () => {
//     if (cartItems.length === 0) return;
//     localStorage.setItem("totalAmount", total.toFixed(2));
//     navigate("/bill");
//   };

//   const handleSearch = (query: string) => {
//     if (!query.trim()) {
//       setProducts(allProducts);
//       return;
//     }
//     const filtered = allProducts.filter(
//       (item) =>
//         item.title.toLowerCase().includes(query.toLowerCase()) ||
//         item.category.toLowerCase().includes(query.toLowerCase())
//     );
//     setProducts(filtered);
//   };

//   // --- Hold Order functions ---
//   const saveToHoldOrder = (customer: string) => {
//     const holdOrdersRaw = localStorage.getItem("holdOrders");
//     const holdOrders: HoldOrder[] = holdOrdersRaw ? JSON.parse(holdOrdersRaw) : [];

//     const newOrder: HoldOrder = {
//       id: Date.now().toString(), // unique id
//       cartItems,
//       totalAmount: total.toFixed(2),
//       customer: { name: customer },
//     };

//     const updatedOrders = [...holdOrders, newOrder];
//     localStorage.setItem("holdOrders", JSON.stringify(updatedOrders));
//     setCartItems([]);
//     localStorage.removeItem("cart");
//   };

//   const handleHoldOrder = () => {
//     setShowCustomerInput(true);
//   };

//   const handleSaveCustomer = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!customerName.trim()) return;
//     saveToHoldOrder(customerName.trim());
//     setCustomerName("");
//     setShowCustomerInput(false);
//   };

//   return (
//     <div className="h-screen flex flex-col">
//       <Header />
//       <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
//         {/* LEFT - Products */}
//         <div className="flex flex-col w-full lg:w-[70%] overflow-auto p-4 gap-2">
//           <SearchBar onSearch={handleSearch} />

//           <div className="flex items-center justify-between px-4 sm:px-6">
//             <Link to="/" className="flex items-center">
//               <IoIosArrowBack size={20} />
//               <span className="text-xl font-bold ml-2">INVENTORY</span>
//             </Link>
//             <button
//               className="md:hidden p-2 bg-[var(--secondary)] rounded-lg"
//               onClick={() => setShowMobileCategories(!showMobileCategories)}
//             >
//               <BsThreeDotsVertical size={20} />
//             </button>
//           </div>

//           {/* Categories */}
//           <div className="hidden md:flex gap-2 flex-wrap px-4 sm:px-6 mt-4">
//             {categories.map((cat) => (
//               <div
//                 key={cat}
//                 className="py-2 px-4 bg-[var(--primary)] rounded-lg cursor-pointer text-sm font-medium"
//                 onClick={() => setSelectedCategory(cat)}
//               >
//                 {cat}
//               </div>
//             ))}
//           </div>
//           {showMobileCategories && (
//             <div className="md:hidden flex flex-col gap-2 px-4 sm:px-6 mt-3">
//               {categories.map((cat) => (
//                 <div
//                   key={cat}
//                   className="py-2 px-4 bg-[var(--primary)] rounded-lg cursor-pointer text-sm font-medium"
//                   onClick={() => setSelectedCategory(cat)}
//                 >
//                   {cat}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Product grid */}
//           <div className="flex-1 overflow-y-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 scrollbar-hide rounded-md pb-4">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 onClick={() => handleAddToCart(product)}
//                 className="flex h-24 justify-between items-center p-4 rounded-md bg-[var(--bgorder)] shadow-sm hover:shadow-md cursor-pointer"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={product.thumbnail}
//                     alt={product.title}
//                     className="w-16 h-16 rounded-sm object-cover"
//                   />
//                   <div>
//                     <h3 className="font-semibold text-base">{product.title}</h3>
//                     <p className="text-sm text-gray-500">Size - 30 UK</p>
//                   </div>
//                 </div>
//                 <div className="text-sm font-semibold">${product.price.toFixed(2)}</div>
//               </div>
//             ))}
//           </div>

//           <Link
//             to="/request"
//             className="flex items-center gap-1 font-medium text-black px-8 pb-4"
//           >
//             <span>Request Inventory</span>
//             <IoIosArrowForward size={20} />
//           </Link>
//         </div>

//         {/* RIGHT - Cart */}
//         <div className="w-full lg:w-[30%] bg-[var(--secondary)] flex flex-col justify-between max-h-full p-4 overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-200">
//           <div className="flex flex-col">
//             <div className="flex justify-center gap-3 mb-2">
//               <button
//                 onClick={handleClearCart}
//                 className="bg-white w-full text-black py-2 px-4 rounded-md"
//               >
//                 Clear cart
//               </button>
//               <button
//                 className="bg-[var(--main)] w-full text-white px-4 rounded-md"
//                 onClick={handleHoldOrder}
//               >
//                 Hold this order
//               </button>
//             </div>

//             {showCustomerInput && (
//               <form
//                 onSubmit={handleSaveCustomer}
//                 className="p-4 bg-white rounded-lg shadow-md mb-3"
//               >
//                 <input
//                   type="text"
//                   placeholder="Enter customer name"
//                   value={customerName}
//                   onChange={(e) => setCustomerName(e.target.value)}
//                   className="border p-2 rounded w-full"
//                 />
//                 <button
//                   type="submit"
//                   className="mt-2 bg-[var(--main)] text-white px-4 py-2 rounded-md w-full"
//                 >
//                   Save Hold Order
//                 </button>
//               </form>
//             )}

//             <hr className="mb-2 opacity-20" />

//             {/* Cart items */}
//             <div className="flex-1 overflow-y-auto space-y-3 max-h-[33vh] rounded-lg scrollbar-hide">
//               {cartItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex justify-between items-center bg-white p-3 rounded-lg"
//                 >
//                   <div className="flex gap-3 items-center">
//                     <img
//                       src={item.thumbnail}
//                       alt={item.title}
//                       className="w-12 h-12 rounded-sm object-cover"
//                     />
//                     <div>
//                       <h4 className="font-medium text-sm">{item.title}</h4>
//                       <div className="flex space-x-1">
//                         <p className="text-gray-500">${item.price.toFixed(2)}</p>
//                         <button
//                           className="px-2 bg-gray-200 rounded hover:bg-gray-300"
//                           onClick={() => decreaseQty(item.id)}
//                         >
//                           -
//                         </button>
//                         <span className="px-2 text-1">{item.quantity}</span>
//                         <button
//                           className="px-2 bg-gray-200 rounded hover:bg-gray-300"
//                           onClick={() => increaseQty(item.id)}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <button onClick={() => handleRemoveItem(item.id)} className="text-gray-500">
//                     <FaTrash />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Totals */}
//           <div className="text-sm space-y-2 mt-3">
//             <div className="flex justify-between">
//               <span>Subtotal • {cartItems.length} items</span>
//               <span>${subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between text-gray-500">
//               <span>Discount (-{discountPercent}%)</span>
//               <span>-${discount.toFixed(2)}</span>
//             </div>
//             <div className="text-xs text-gray-400">{discountReason}</div>
//             <div className="flex justify-between text-gray-500">
//               <span>Tax (+8%)</span>
//               <span>${tax.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
//               <span>Total</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//             <button
//               onClick={handleCheckout}
//               className="bg-[var(--main)] w-full text-white font-semibold py-2 rounded-md block cursor-pointer text-center"
//             >
//               CHECKOUT &gt;
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Inventory;
