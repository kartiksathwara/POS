import { useEffect, useState } from "react";
// import Checkout from "./Checkout";
import Header from "./Header";
import { Link } from "react-router-dom";
import { FaRegSquare } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

const Invoice = () => {
  const [totalAmount, setTotalAmount] = useState("0");
  const [customer, setCustomer] = useState<{ name?: string; phone?: string }>(
    {}
  );
  const [remainingAmount, setRemainingAmount] = useState<number | null>(null);
  const [manualAmount, setManualAmount] = useState("");

  useEffect(() => {
    const storedTotal = localStorage.getItem("totalAmount");
    if (storedTotal) {
      setTotalAmount(storedTotal);
    }

    const StoredData = localStorage.getItem("customer");
    if (StoredData) {
      setCustomer(JSON.parse(StoredData));
    }
  }, []);

  const handleManualChange = (value: number | string) => {
    const inputValue = typeof value === "number" ? value.toString() : value;
    setManualAmount(inputValue);

    const input = parseFloat(inputValue);
    const total = parseFloat(totalAmount);

    if (!isNaN(input)) {
      const remaining = input - total;
      setRemainingAmount(remaining);
    } else {
      setRemainingAmount(null);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden ">
        <div className="relative flex-1 overflow-y-auto p-8 flex flex-col items-center gap-4">
          <div className="w-full flex flex-col gap-4 bg-(--bgorder) p-5 rounded-xl">
            <div className="flex justify-between items-center text-2xl font-semibold">
              ${totalAmount}
              <p className="flex items-center gap-2 text-sm bg-(--buttonbg) p-1 rounded-md">
                <FaRegSquare size={10} />
                Invoice
              </p>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg border-gray-500 border-2">
              <FaUser /> <span>{customer.name}</span> • <span>{customer.phone}</span>
            </div>
          </div>
          <div className="w-full flex justify-between items-center gap-3">
            {[900, 1000, 1500].map((amount) => (
              <button
                key={amount}
                onClick={() => handleManualChange(amount)}
                className="bg-[var(--secondary)] py-3 w-full text-center rounded-lg hover:bg-opacity-80 transition hover:bg-(--eye-icon)"
              >
                ${amount}
              </button>
            ))}
          </div>
          <input
            type="number"
            placeholder="Add manually"
            className="w-full rounded px-3 py-2 outline-0 bg-[var(--secondary)]"
            value={manualAmount}
            onChange={(e) => handleManualChange(e.target.value)}
          />
          <div className="w-full px-4 py-4 border rounded-lg flex flex-col gap-2">
            <span className="font-semibold">Change</span>
            <span>
              {remainingAmount !== null
                ? `$${remainingAmount.toFixed(2)}`
                : "—"}
            </span>
          </div>
        </div>

        <div className="w-full lg:w-[30%] bg-(--secondary) hidden lg:flex flex-col justify-between max-h-full p-4 overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="font-serif">
            <button
              //   onClick={handleCancelCart}
              className="bg-white w-full text-black font-semibold py-2 px-4 rounded-md "
            >
              Cancel order
            </button>
            <hr className="mt-3" />
          </div>
          <div className="flex-1 overflow-y-auto py-4 space-y-3 max-h-[60vh] scrollbar-hide">
            {/* {cartItems.map((item) => (
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
                      ${item.price.toFixed(2)} * {item.quantity} = {""}
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))} */}
            {/* {cartItems.length === 0 && <div className="h-screen mt-8"></div>} */}
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-3 w-full mt-10">
            <Link to="/inventory" className="w-full sm:w-1/2">
              <button className="w-full py-3 px-4 rounded bg-white text-black text-base font-medium border border-gray-300 hover:bg-gray-50 transition">
                Back
              </button>
            </Link>
            <Link to="/payment" className="w-full sm:w-1/2">
              <button className="w-full py-2 text-white rounded sm:w-40 px-4 text-sm sm:text-base disabled:bg-(--main)/40 bg-(--main)">
                Validate &gt;
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
