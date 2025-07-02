import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

interface PaymentDropdownProps {
  dropdownOpen: boolean;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface cartItems extends Product {
  quantity: number;
}

const PaymentDropdown: React.FC<PaymentDropdownProps> = ({ dropdownOpen, setDropdownOpen }) => {
  const [cartItems, setCartItems] = useState<cartItems[]>([]);  

  const subtotal = cartItems.reduce(
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

  useEffect(() => {
      // const storedTotal = localStorage.getItem("totalAmount");
      // if (storedTotal) {
      //   setTotalAmount(storedTotal);
      // }
  
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }, []);
  return (
    <div className="cursor-pointer w-full scrollbar-hide max-h-64 overflow-auto max-w-3xl flex flex-col gap-2 justify-between items-center bg-(--secondary) rounded-xl px-4 py-2 text-gray-800 outline-0">
      <div className="flex justify-between w-full border-b">
        <p>More payment details</p>
        <FaChevronDown
          className={`${
            !dropdownOpen ? null : "rotate-180 translate-y-1"
          } right-0 transition-all`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
      </div>
      {/* <hr /> */}
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <span>Subtotal • {cartItems.length} items</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <div className="flex flex-col ">
            <span>Discount (-{discountPercent}%)</span>
            <span className="text-xs text-gray-400">{discountReason}</span>
          </div>
          <span>${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Tax (+8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-base">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentDropdown;
