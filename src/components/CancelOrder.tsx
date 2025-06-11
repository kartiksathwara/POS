import Header from "./Header";
import { FaUser } from "react-icons/fa6";
import { RiCashLine } from "react-icons/ri";
import { CiCreditCard1 } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";

export interface Customer {
  name: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zip: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

const CancelOrder: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState("002");
  const [isvalidate, setIsValidate] = useState(false);
  const orderNumbers = ["001", "002", "003", "004"];
  const [totalAmount, setTotalAmount] = useState("0");
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [newCustomer, setNewCustomer] = useState<Customer>({
    name: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    zip: "",
  });
  useEffect(() => {
    const storedTotal = localStorage.getItem("totalAmount");
    if (storedTotal) {
      setTotalAmount(storedTotal);
    }

    const StoredData = localStorage.getItem("customerData");
    if (StoredData) {
      setCustomerData(JSON.parse(StoredData));
    }

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handleCancelCart = () => {
    setCartItems([]);
    setTotalAmount("0.00");
    localStorage.setItem("totalAmount", "0.00");
    localStorage.removeItem("cart");
  };
  const handleAddCustomer = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const updatedCustomers = [...customerData, newCustomer];
      setCustomerData(updatedCustomers);
      localStorage.setItem("customerData", JSON.stringify(updatedCustomers));

      setNewCustomer({
        name: "",
        phone: "",
        email: "",
        address1: "",
        address2: "",
        country: "",
        state: "",
        city: "",
        zip: "",
      });
    }
  };

  const CustomerSelectDropdown = ({
    customers,
    selectedCustomer,
    onSelect,
  }: {
    customers: Customer[];
    selectedCustomer: Customer | null;
    onSelect: (customer: Customer) => void;
  }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSelect = (customer: Customer) => {
      setDropdownOpen(false);
      onSelect(customer);
    };

    return (
      <div className="relative w-full">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full px-1 text-left text-lg"
        >
          <FaChevronDown
            className={`absolute ${!dropdownOpen ? null : "rotate-180"
              } right-0 transition-all`}
          />
          {selectedCustomer ? selectedCustomer.name : "Select customer"}
        </button>

        {dropdownOpen && (
          <div className="absolute cursor-pointer w-full scrollbar-hide rounded  max-h-64 overflow-auto">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-(--main) sticky top-0 w-3xl text-white">
                <tr>
                  <th className="px-6 py-4 font-medium">Customer name</th>
                  <th className="px-6 py-4 font-medium">Phone no.</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Address</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-(--primary) bg-white">
                {customers.map((customer, index) => (
                  <tr
                    key={index}
                    className=""
                    onClick={() => handleSelect(customer)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4">
                      {customer.address1}, {customer.address2}, {customer.city},{" "}
                      {customer.state}, {customer.country} {customer.zip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className=" h-screen">
      <Header />
      <div className="flex flex-col lg:flex-row h-[calc(100%-4rem)]">
        <div className="w-full lg:w-2/3 flex flex-col justify-between bg-white rounded-md">
          <div className="flex flex-col h-[80%] justify-between p-1">
            <div className="bg-(--pin-button) flex flex-col gap-3 p-2 rounded-2xl">
              <div className="text-2xl font-semibold">${totalAmount}</div>
              <div className="border-2 rounded-2xl border-(--main)/50 w-[100%] p-2">
                <h2 className="font-semibold text-(--eye-icon) flex gap-2 text-1.5xl items-center py-0.5">
                  <FaUser className="text-(--eye-icon)/70" />
                  Customer
                </h2>
                <div className="flex flex-col border border-(--primary) rounded px-2 py-1">
                  <label className="text-xs text-gray-600">
                    Select Customer
                  </label>
                  <CustomerSelectDropdown
                    customers={customerData}
                    selectedCustomer={newCustomer.name ? newCustomer : null}
                    onSelect={(customer) => {
                      setNewCustomer(customer);
                    }}
                  />
                </div>

                <div className="flex items-center">
                  <div className="border w-full text-(--main)/50"></div>
                  <p className="p-2">or</p>
                  <div className="border w-full h-0 text-(--main)/50"></div>
                </div>
                <div className="flex justify-center text-black-400 text-sm 3"></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col border border-(--primary) rounded px-2">
                    <label className="text-xs text-(--for)">
                      Full name*
                    </label>
                    <input
                      className="text-lg font-semibold text-(--main) outline-none"
                      placeholder="Name"
                      onChange={(e) =>
                        setNewCustomer({ ...newCustomer, name: e.target.value })
                      }
                      onKeyDown={handleAddCustomer}
                      value={newCustomer.name}
                    ></input>
                  </div>

                  <div className="flex flex-col border border-(--primary) rounded px-2">
                    <label className="text-xs text-(--form) ">
                      Phone no*
                    </label>
                    <input
                      className="text-lg font-semibold text-(--main) 2 outline-none"
                      placeholder="Phone no"
                      onChange={(e) =>
                        setNewCustomer({
                          ...newCustomer,
                          phone: e.target.value,
                        })
                      }
                      onKeyDown={handleAddCustomer}
                      value={newCustomer.phone}
                    ></input>
                  </div>
                  <div className="flex flex-col border border-(--primary) rounded px-2">
                    <label className="text-xs text-(--form)">Email*</label>
                    <input
                      className="text-lg font-semibold text-(--main) 2 outline-none"
                      placeholder="Email"
                      onChange={(e) =>
                        setNewCustomer({
                          ...newCustomer,
                          email: e.target.value,
                        })
                      }
                      onKeyDown={handleAddCustomer}
                      value={newCustomer.email}
                    ></input>
                  </div>
                  <div className="flex flex-col border border-(--primary) rounded px-2">
                    <label className="text-xs text-(--form) 1 -2">
                      Address
                    </label>
                    <input
                      className="text-lg font-semibold text-(--main) 2 outline-none"
                      placeholder="Address"
                      onChange={(e) =>
                        setNewCustomer({
                          ...newCustomer,
                          address1: e.target.value,
                        })
                      }
                      onKeyDown={handleAddCustomer}
                      value={newCustomer.address1}
                    ></input>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 px-5">
              <p className="font-medium">Payment</p>
              <p className="text-sm text-gray-500 ">
                All transactions are secure and encrypted.
              </p>
              <div className="bg-(--pin-button) rounded p-2 flex gap-2">
                <input type="radio" name="payment" />
                <span className="flex items-center justify-between w-full">
                  Cash <RiCashLine className="text-2xl" />
                </span>
              </div>
              <div className="bg-(--pin-button) rounded p-2 flex gap-2">
                <input type="radio" name="payment" />
                <span className="flex items-center justify-between w-full">
                  Card <CiCreditCard1 className="text-2xl" />
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 items-center p-3 bg-(--secondary)">
            <span className="text-sm font-semibold text-(--eye-icon)">
              Order:
            </span>
            {orderNumbers.map((order) => (
              <button
                key={order}
                onClick={() => setSelectedOrder(order)}
                className={`w-12 h-10 rounded-md text-sm font-semibold transition-all border ${selectedOrder === order
                  ? "bg-(--main) text-white"
                  : "bg-(--main)/50 text-white"
                  }`}
              >
                {order}
              </button>
            ))}

          </div>
        </div>
        <div className="w-full lg:w-[42%] p-6 bg-(--secondary) flex flex-col justify-between">
          <div className="font-serif">
            <button
              onClick={handleCancelCart}
              className="bg-white w-full text-black font-semibold py-2 px-4 rounded-md "
            >
              Cancel order
            </button>
            <hr className="mt-3"/>
          </div>
          {/* <hr /> */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3 max-h-[60vh] scrollbar-hide">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-3 rounded-lg gap-2"
              >
                <div className="flex gap-3 items-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-12 h-12 rounded-sm object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-500">
                      ${item.price.toFixed(2)} × {item.quantity} ={" "}
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {cartItems.length === 0 && (
              <div className="h-screen mt-8"></div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-3 w-full mt-10">
            <Link to="/inventory" className="w-full sm:w-1/2">
              <button className="w-full py-3 px-4 rounded bg-white text-black text-base font-medium border border-gray-300 hover:bg-gray-50 transition">
                Back
              </button>
            </Link>
            <button
              onClick={() => setIsValidate(!isvalidate)}
              className={`w-full sm:w-1/2 py-3 px-4 rounded text-white text-base font-medium transition ${isvalidate ? "bg-black" : "bg-black/70"
                }`}
            >
              Validate &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;