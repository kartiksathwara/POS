import { useEffect, useState } from "react";
import Header from "../Header";
import SearchBar from "../SearchBar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useFetchProducts from "../../hooks/useFetchProducts";
import Cart from "../Cart";
import ProductCard from "../Products/ProductCard";
import { useCart } from "../../auth/cartContext";

interface Product {
  _id: string;
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Customer {
  name?: string;
  phone?: string;
}

interface HoldOrder {
  id: string;
  cartItems: CartItem[];
  totalAmount: string;
  customer?: Customer;
}

const InventoryPage = () => {
  const navigate = useNavigate();
  const { cart, setCart, addToCart } = useCart();
  const { products, setProducts, allProducts } = useFetchProducts();
  const [orderNo, setOrderNo] = useState<number>(1);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showCustomerInput, setShowCustomerInput] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerphone, setCustomerPhone] = useState("");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const storedOrderNo = localStorage.getItem("orderNo");
    if (storedOrderNo) {
      setOrderNo(parseInt(storedOrderNo));
    }

    const selectedOrderRaw = localStorage.getItem("selectedOrder");
    if (selectedOrderRaw) {
      try {
        const selectedOrder: HoldOrder = JSON.parse(selectedOrderRaw);
        setCart(selectedOrder.cartItems || []);
        setCustomerName(selectedOrder.customer?.name || "");
        setCustomerPhone(selectedOrder.customer?.phone || "");
        localStorage.setItem("cart", JSON.stringify(selectedOrder.cartItems || []));
        localStorage.setItem("currentOrderID", selectedOrder.id);
        localStorage.removeItem("selectedOrder");
      } catch (err) {
        console.log("Invalid selectedOrder in localstorage", err);
      }
    }

  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const selectedDiscount = localStorage.getItem("selectedDiscount") || "18%";
  const discountReason =
    localStorage.getItem("discountReason") || "Default Discount";
  const discountPercent = parseFloat(selectedDiscount.replace("%", ""));
  const discount = subtotal * (discountPercent / 100);
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax;

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );
    setProducts(filtered);
  };

  const saveToHoldOrder = (name: string, phone: string) => {
    const holdOrdersRaw = localStorage.getItem("holdOrders");
    const holdOrders: HoldOrder[] = holdOrdersRaw ? JSON.parse(holdOrdersRaw) : [];

    const existingIds = holdOrders.map(o => parseInt(o.id));
    let newIdNumber = 1;
    while (existingIds.includes(newIdNumber)) {
      newIdNumber++;
    }

    const newId = newIdNumber.toString().padStart(3, "0");

    const newOrder: HoldOrder = {
      id: newId,
      cartItems: cart,
      totalAmount: total.toFixed(2),
      customer: { name, phone },
    };

    const updatedOrders = [...holdOrders, newOrder];
    localStorage.setItem("holdOrders", JSON.stringify(updatedOrders));

    window.dispatchEvent(new Event("holdOrdersUpdated"));

    setCart([]);
    localStorage.removeItem("cart");
  };

  const handleHoldOrder = () => {
    setShowCustomerInput(true);
  };

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerphone.trim()) return;

    saveToHoldOrder(customerName.trim(), customerphone.trim());
    setCustomerPhone("");
    setShowCustomerInput(false);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const holdOrdersRaw = localStorage.getItem("holdOrders");
    const holdOrders: HoldOrder[] = holdOrdersRaw ? JSON.parse(holdOrdersRaw) : [];

    const currentOrderID = localStorage.getItem("currentOrderID");

    if (currentOrderID) {
      const updatedOrders = holdOrders.map((o) =>
        o.id === currentOrderID
          ? { ...o, cartItems: cart, totalAmount: total.toFixed(2), customer: { name: customerName || "Guest" } }
          : o
      );
      localStorage.setItem("holdOrders", JSON.stringify(updatedOrders));
    } else {
      const possibleIDs = ["001", "002", "003", "004"];
      const usedIDs = holdOrders.map((o) => o.id);
      const availableID = possibleIDs.find((id) => !usedIDs.includes(id));

      if (availableID) {
        const newOrder: HoldOrder = {
          id: availableID,
          cartItems: cart,
          totalAmount: total.toFixed(2),
          customer: { name: customerName || "Guest" },
        };

        localStorage.setItem(
          "holdOrders",
          JSON.stringify([...holdOrders, newOrder])
        );
        localStorage.setItem("currentOrderID", availableID);
      }
    }

    setCart([]);
    localStorage.removeItem("cart");

    const lastOrder = {
      cartItems: cart,
      totalAmount: total.toFixed(2),
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      tax: tax.toFixed(2),
      customer: { name: customerName || "Guest", phone: customerphone || "N/A" },
    };

    localStorage.setItem("lastOrder", JSON.stringify(lastOrder));
    localStorage.removeItem("cart");
    localStorage.removeItem("currentOrderID");
    navigate("/bill");

  };


  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-col justify-between lg:flex-row flex-1 overflow-hidden">
        <div className="flex flex-col w-full lg:w-[70%] overflow-auto p-4 gap-2">
          <SearchBar onSearch={handleSearch} />
          <div className="flex items-center justify-between px-4 sm:px-6">
            <Link to="/" className="flex items-center">
              <IoIosArrowBack size={20} />
              <span className="text-xl font-bold ml-2">INVENTORY</span>
            </Link>
            <button
              className="md:hidden p-2 bg-[#E9DCCF] rounded-lg"
              onClick={() => setShowMobileCategories(!showMobileCategories)}
            >
              <BsThreeDotsVertical size={20} />
            </button>
          </div>

          <div className="hidden md:flex gap-2 flex-wrap px-4 sm:px-6 mt-4">
            <div
              className="py-2 px-4 bg-[var(--primary)] rounded-lg cursor-pointer text-sm font-medium"
              onClick={() => setSelectedCategory("All")}
            >
              All
            </div>
            {[...new Set(products.map((item) => item.category))].map(
              (category) => (
                <div
                  key={category}
                  className="py-2 px-4 bg-[var(--primary)] rounded-lg cursor-pointer text-sm font-medium"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </div>
              )
            )}
          </div>

          {showMobileCategories && (
            <div className="md:hidden flex flex-col gap-2 px-4 sm:px-6 mt-3">
              {[...new Set(products.map((item) => item.category))].map(
                (category) => (
                  <div
                    key={category}
                    className="py-2 px-4 bg-[var(--primary)] rounded-lg cursor-pointer text-sm font-medium"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </div>
                )
              )}
            </div>
          )}

          <div className="overflow-y-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 scrollbar-hide rounded-md pb-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAdd={() => handleAddToCart(product)}
              />
            ))}
          </div>

          <Link
            to="/request"
            className="flex items-center gap-1 font-medium text-black px-8 pb-4"
          >
            <span>Request Inventory</span>
            <IoIosArrowForward size={20} />
          </Link>
        </div>
        <div className="w-full lg:w-[30%] bg-(--secondary) flex flex-col justify-between max-h-full p-4 overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="w-full h-full bg-[var(--secondary)] flex flex-col">
            <div className="flex justify-center gap-3 mb-2">
              <button
                onClick={handleClearCart}
                className="bg-white w-full text-black py-2 px-4 rounded-md"
              >
                Clear cart
              </button>
              <button
                className="bg-(--main) w-full text-white px-4 rounded-md"
                onClick={handleHoldOrder}
              >
                Hold this order
              </button>
            </div>

            {showCustomerInput && (
              <form
                onSubmit={handleSaveCustomer}
                className="p-4 bg-white rounded-lg mb-3"
              >
                <input
                  type="text"
                  placeholder="Enter Customer Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="border p-2 rounded mb-2 w-full"
                />

                <input
                  type="text"
                  placeholder="Enter Customer Number"
                  value={customerphone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <button
                  type="submit"
                  className="mt-2 bg-[var(--main)] text-white px-4 py-2 rounded-md w-full"
                >
                  Submit
                </button>
              </form>
            )}

            <hr className="mb-2 opacity-20" />
            <div className="flex-1 overflow-y-auto space-y-3 rounded-lg scrollbar-hide">
              <Cart />
            </div>
          </div>
          {cart.length !== 0 && (
            <div className="text-sm space-y-2">
              <div className="flex justify-between items-center bg-white rounded-xl px-4 py-2 mb-4">
                <input
                  type="text"
                  placeholder="Discount"
                  className="bg-white text-sm text-black placeholder-black focus:outline-none w-full"
                />
                <button className="bg-(--buttonbg) text-sm font-semibold px-4 py-1.5 rounded-md ml-2">
                  <Link to="/discount">ADD</Link>
                </button>
              </div>
              <div className="flex justify-between">
                <span>Subtotal • {cart.length} items</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Discount (-{discountPercent}%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-400">{discountReason}</div>
              <div className="flex justify-between text-gray-500">
                <span>Tax (+8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="bg-(--main) w-full text-white font-semibold py-2 rounded-md block cursor-pointer text-center"
              >
                CHECKOUT &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
