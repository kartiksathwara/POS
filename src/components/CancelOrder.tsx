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
    address2: string
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
}

const CancelOrder: React.FC = () => {
    const [selectedOrder, setSelectedOrder] = useState("002");
    const [isvalidate, setIsValidate] = useState(false);
    const orderNumbers = ["001", "002", "003", "004"];
    const [totalAmount, setTotalAmount] = useState("0")
    const [customerData, setCustomerData] = useState<Customer[]>([]);
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [newCustomer, setNewCustomer] = useState<Customer>({
        name: '',
        phone: '',
        email: '',
        address1: '',
        address2: '',
        country: '',
        state: '',
        city: '',
        zip: ''
    })
    useEffect(() => {
        const storedTotal = localStorage.getItem("totalAmount");
        if (storedTotal) {
            setTotalAmount(storedTotal)
        }

        const StoredData = localStorage.getItem("customerData");
        if (StoredData) {
            setCustomerData(JSON.parse(StoredData))
        }

        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart))
        }

    }, []);

    const handleCancelCart = () => {
        setCartItems([]);
        setTotalAmount("0");
        localStorage.setItem("totalAmount", "0");
        localStorage.removeItem("cart");
    };
    const handleAddCustomer = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {

            const updatedCustomers = [...customerData, newCustomer];
            setCustomerData(updatedCustomers);
            localStorage.setItem("customerData", JSON.stringify(updatedCustomers));

            setNewCustomer({
                name: '',
                phone: '',
                email: '',
                address1: '',
                address2: '',
                country: '',
                state: '',
                city: '',
                zip: '',
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
            <div className="relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full px-1 text-left text-lg"
                >
                    <FaChevronDown className={`absolute ${!dropdownOpen ? null : "rotate-180"} right-0 `} />
                    {selectedCustomer ? selectedCustomer.name : "Select customer"}
                </button>

                {dropdownOpen && (
                    <div className="absolute mt-2 cursor-pointer w-full bg-white border border-gray-300 rounded shadow-lg max-h-64 overflow-auto">
                        <table className="min-w-full text-left text-sm text-gray-700">
                            <thead className="bg-(--main) text-white">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Customer name</th>
                                    <th className="px-6 py-4 font-medium">Phone no.</th>
                                    <th className="px-6 py-4 font-medium">Email</th>
                                    <th className="px-6 py-4 font-medium">Address</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 bg-white">
                                {customers.map((customer, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition" onClick={() => handleSelect(customer)}>
                                        <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{customer.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
                                        <td className="px-6 py-4">
                                            {customer.address1}, {customer.address2}, {customer.city}, {customer.state}, {customer.country} {customer.zip}
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
            <div className="flex">
                <div className=" bg-white rounded ">

                    <div className="p-4">

                        <div className="bg-(--pin-button) p-5 rounded-2xl">

                            <div className="text-2xl font-semibold 4">${totalAmount}</div>
                            <div className="border-2 rounded-2xl border-(--main)/50 w-4xl p-3  6">
                                <h2 className="font-semibold 2 text-(--eye-icon) flex gap-2 text-1.5xl items-center py-0.5">
                                    <FaUser className="text-(--eye-icon)/70" />
                                    Customer</h2>
                                <div className="flex flex-col border border-(--primary) rounded px-2 py-1">
                                    <label className="text-xs text-gray-600 pl-1 mb-1">Select Customer</label>
                                    <CustomerSelectDropdown
                                        customers={customerData}
                                        selectedCustomer={newCustomer.name ? newCustomer : null}
                                        onSelect={(customer) => {
                                            setNewCustomer(customer);
                                        }}
                                    />

                                </div>

                                <div className="flex items-center">
                                    <div className="border w-full h-0 text-(--main)/50"></div><p className="p-2" >or</p><div className="border w-full h-0 text-(--main)/50"></div>
                                </div>
                                <div className="flex justify-center  text-black-400 text-sm 3"></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col border border-(--primary) rounded px-2">
                                        <label className="text-xs text-(--form) 1 mt-2">Full name*</label>
                                        <input
                                            className="text-lg font-semibold text-(--main) outline-none"
                                            placeholder="Name"
                                            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                            onKeyDown={handleAddCustomer}
                                        value={newCustomer.name}
                                        >
                                        </input>
                                    </div>

                                    <div className="flex flex-col border border-(--primary) rounded px-2">
                                        <label className="text-xs text-(--form) 1 mt-2">Phone no*</label>
                                        <input
                                            className="text-lg font-semibold text-(--main) 2 outline-none"
                                            placeholder="Phone no"
                                            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                                            onKeyDown={handleAddCustomer}
                                        value={newCustomer.phone}
                                        >
                                        </input>
                                    </div>
                                    <div className="flex flex-col border border-(--primary) rounded px-2">
                                        <label className="text-xs text-(--form) 1 mt-2">Email*</label>
                                        <input
                                            className="text-lg font-semibold text-(--main) 2 outline-none"
                                            placeholder="Email"
                                            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                            onKeyDown={handleAddCustomer}
                                        value={newCustomer.email}
                                        >
                                        </input>
                                    </div>
                                    <div className="flex flex-col border border-(--primary) rounded px-2">
                                        <label className="text-xs text-(--form) 1 mt-2">Address</label>
                                        <input
                                            className="text-lg font-semibold text-(--main) 2 outline-none"
                                            placeholder="Address"
                                            onChange={(e) => setNewCustomer({ ...newCustomer, address1: e.target.value })}
                                            onKeyDown={handleAddCustomer}
                                        value={newCustomer.address1}
                                        >
                                        </input>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="py-4 px-1">

                            <div>
                                <p className="font-medium ">Payment</p>
                                <p className="text-sm text-gray-500 ">All transactions are secure and encrypted.</p>
                                <div className="space-y-3 py-3">
                                    <label className="flex items-center gap-2">
                                        <div className="bg-(--pin-button) rounded p-2 flex gap-2">
                                            <input type="radio" name="payment" />
                                            <span className="flex items-center gap-210">Cash <RiCashLine className="text-2xl" /></span>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <div className="bg-(--pin-button) rounded p-2 flex gap-2">
                                            <input type="radio" name="payment" />
                                            <span className="flex items-center gap-210 ">Card <CiCreditCard1 className="text-2xl" /></span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">

                        <div className=" flex justify-between items-center p-4 bg-(--secondary)">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-(--eye-icon)">Order:</span>
                                {orderNumbers.map((order) => (
                                    <button
                                        key={order}
                                        onClick={() => setSelectedOrder(order)}
                                        className={`w-12 h-10 rounded-md text-sm font-semibold transition-all border ${selectedOrder === order
                                            ? 'bg-(--main) text-white'
                                            : 'bg-(--main)/50 text-white'
                                            }`}
                                    >
                                        {order}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 p-5 bg-(--secondary) flex flex-col ">
                    <div className="flex justify-between p-3 font-serif 4">
                        <button onClick={handleCancelCart} className="bg-white w-full text-black font-semibold py-2 px-4 rounded-md ">
                            Cancel order
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto  border-t py-4 space-y-3 max-h-[500px] pr-2 scrollbar-hide">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-lg">
                                <div className="flex gap-3 items-center">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-12 h-12 rounded-sm object-cover"
                                    />
                                    <div>
                                        <h4 className="font-medium text-sm">{item.title}</h4>
                                        <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-between gap-2">
                        <Link to={"/inventory"}>
                            <button className="w-60 py-2 bg-(--back-button) rounded shadow">Back</button>
                        </Link>
                        <button
                            onClick={() => setIsValidate(!isvalidate)}
                            className={`w-60 py-2 bg-(--main)/40 text-white rounded ${isvalidate ? "bg-(--main)/100" : "bg-(--main)/40"}`} >Validate &gt;</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CancelOrder;
