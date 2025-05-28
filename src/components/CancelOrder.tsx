import Header from "./Header";
import { FaUser } from "react-icons/fa6";
import { RiCashLine } from "react-icons/ri";
import { CiCreditCard1 } from "react-icons/ci";
import { useState } from "react";

const CancelOrder: React.FC = () => {
    const [selectedOrder, setSelectedOrder] = useState("002");
    const [isvalidate, setIsValidate] = useState(false);
    const orderNumbers = ["001", "002", "003", "004"];
    return (
        <div className=" h-screen">
            <Header />
            <div className="flex">
                <div className=" bg-white rounded">

                    <div className="p-4">

                        <div className="bg-(--pin-button) p-4 rounded-2xl">

                            <div className="text-2xl font-semibold">$861.03</div>
                            <div className="border-2 rounded-2xl border-(--main)/50 w-2xl p-3">
                                <h2 className="font-semibold 2 text-(--eye-icon) flex gap-2 text-1.5xl items-center py-0.5">
                                    <FaUser className="text-(--eye-icon)/70" />
                                    Customer</h2>
                                <div className=" flex flex-col border 4 px-1 rounded border-(--primary)">
                                    <label className="text-xs text-(--form) pl-1 1">Select Customer</label>
                                    <select className="outline-0 text-(--main) ">
                                        <option value="john">John Doe</option>
                                    </select>
                                </div>
                                <div className="flex items-center">
                                    <div className="border w-full h-0 text-(--main)/50"></div><p className="p-2" >or</p><div className="border w-full h-0 text-(--main)/50"></div>
                                </div>
                                <div className="flex justify-center  text-black-400 text-sm 3"></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col border border-(--primary) rounded px-2">
                                        <label className="text-xs text-(--form) 1 mt-2">Full name*</label>
                                        <p className="text-lg font-semibold text-(--main) 2">{"john doe"}</p>
                                    </div>

                                    <div className="flex flex-col border border-(--primary) rounded px-2">
                                        <label className="text-xs text-(--form) 1 mt-2">Phone no*</label>
                                        <p className="text-lg font-semibold text-(--main) 2">{"1234567890"}</p>
                                    </div>
                                    <div className="flex flex-col border border-(--primary) rounded px-2">
                                        <label className="text-xs text-(--form) 1 mt-2">Email*</label>
                                        <p className="text-lg font-semibold text-(--main) 2">{"tim.jennings@example.com"}</p>
                                    </div>
                                    <div className="flex flex-col border border-(--primary) rounded px-2">
                                        <label className="text-xs text-(--form) 1 mt-2">Address</label>
                                        <p className="text-lg font-semibold text-(--main) 2">{"-"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-2xl py-2 px-1">

                            <div>
                                <p className="font-medium ">Payment</p>
                                <p className="text-sm text-gray-500 ">All transactions are secure and encrypted.</p>
                                <div className="space-y-3 py-3">
                                    <label className="flex items-center gap-2">
                                        <div className="bg-(--pin-button) rounded p-2 flex gap-2">
                                            <input type="radio" name="payment" />
                                            <span className="flex items-center gap-144">Cash <RiCashLine className="text-2xl" /></span>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <div className="bg-(--pin-button) rounded p-2 flex gap-2">
                                            <input type="radio" name="payment" />
                                            <span className="flex items-center gap-144 ">Card <CiCreditCard1 className="text-2xl" /></span>
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
                <div className="w-auto p-5 bg-(--secondary) flex flex-col ">
                    <div className="flex justify-between p-3 font-serif 4">
                        <button className="bg-white w-full text-black font-semibold py-2 px-4 rounded-md ">
                            Cancel order
                        </button>
                    </div>
                    <div className="flex-grow border-t border-(--main) py-4 ">
                        

                    </div>

                    <div className="mt-4 flex justify-between gap-2">
                        <button className="w-60 py-2 bg-(--back-button) rounded shadow">Back</button>
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