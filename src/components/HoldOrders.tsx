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
