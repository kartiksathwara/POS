// import { useEffect, useState } from "react";
// import { FaTrash } from "react-icons/fa";
// import { Link } from "react-router-dom";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   thumbnail: string;
// }

// const Checkout = () => {
//   const [cartItems, setCartItems] = useState<Product[]>([]);

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const handleRemoveItem = (id: number) => {
//     const updatedCart = cartItems.filter((item) => item.id !== id);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   return (
//     <div className="w-full h-full bg-[var(--secondary)] flex flex-col">
//       <div className="flex justify-center gap-3 mb-2 ">
//         <button className="bg-white text-black w-full py-2 px-4 rounded-md">
//           Clear cart
//         </button>
//         <button className="bg-[var(--main)] text-white w-full py-2 px-4 rounded-md">
//           Hold this order
//         </button>
//       </div>
//       <hr className="mb-2 opacity-20" />
//       <div className="flex-1 overflow-y-auto h-fit flex flex-col gap-3 scrollbar-hide">
//         {cartItems.length === 0 ? (
//           <div className="flex-grow h-full flex items-center justify-center border-[var(--main)]">
//             <div className="text-gray-500 text-center text-sm px-2">
//               Add product manually or via scanner
//             </div>
//           </div>
//         ) : (
//           cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex justify-between items-center bg-white p-3 rounded-lg"
//             >
//               <div className="flex gap-3 items-center">
//                 <img
//                   src={item.thumbnail}
//                   alt={item.title}
//                   className="w-12 h-12 rounded-sm object-cover"
//                 />
//                 <div>
//                   <h4 className="font-medium text-sm">{item.title}</h4>
//                   <p className="text-xs text-gray-500">
//                     ${item.price.toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => handleRemoveItem(item.id)}
//                 className="text-gray-500"
//               >
//                 <FaTrash />
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//       <hr className="my-2 opacity-20" />
//       <div>
//         <Link
//           to="/bill"
//           className="bg-[var(--main)] text-white font-semibold py-2 rounded-md block text-center"
//         >
//           CHECKOUT &gt;
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { RootState } from "../app/store";
import { clearOrderItems, removeItemFromOrder, setOrderData } from "../auth/orderSlice";
import { useEffect, useState } from "react";

const Checkout = () => {
  const dispatch = useDispatch();
  const { selectedOrder, orderData } = useSelector(
    (state: RootState) => state.order
  );
  const [orderNo, setOrderNo] = useState<number>(1);
  const cartItems = orderData?.items || [];
  const userData = JSON.parse(localStorage.getItem("User") || "{}");
  const user = userData.name || "Unknown";

  const handleRemoveItem = (id: number) => {
    if (!selectedOrder || !orderData) return;
    dispatch(removeItemFromOrder(id));

    const updatedOrder = {
      ...orderData,
      items: orderData.items.filter((item) => item.id !== id),
    };
    localStorage.setItem(
      `order-${user}-${selectedOrder}`,
      JSON.stringify(updatedOrder)
    );

    dispatch(setOrderData(updatedOrder));
  };

  const handleHoldOrder = () => {
    const customerDet = JSON.parse(localStorage.getItem("customer") || "{}");
    const holdOrder = {
      orderNo,
      customer: customerDet,
      items: cartItems,
      timestamp: new Date().toISOString(),
      status: "held",
    };

    const heldOrders = JSON.parse(localStorage.getItem("heldOrders") || "[]");

    if (heldOrders.length >= 4) {
      alert("Maximum of 4 orders can be held at a time.");
      return;
    }

    heldOrders.push(holdOrder);
    localStorage.setItem("heldOrders", JSON.stringify(heldOrders));

    dispatch(clearOrderItems());
    localStorage.removeItem("customer");

    const nextOrderNo = orderNo + 1;
    setOrderNo(nextOrderNo);
    localStorage.setItem("orderNo", nextOrderNo.toString());
  };

  useEffect(() => {
    const storedOrderNo = localStorage.getItem("orderNo");
    if (storedOrderNo) {
      setOrderNo(parseInt(storedOrderNo));
    }
  }, []);

  return (
    <div className="w-full h-full bg-[var(--secondary)] flex flex-col">
      <div className="flex justify-center gap-3 mb-2">
        <button className="bg-white text-black w-full py-2 px-4 rounded-md">
          Clear cart
        </button>
        <button
          onClick={handleHoldOrder}
          className="bg-[var(--main)] text-white w-full py-2 px-4 rounded-md"
        >
          Hold this order
        </button>
      </div>
      <hr className="mb-2 opacity-20" />
      <div className="flex-1 overflow-y-auto h-fit flex flex-col gap-3 scrollbar-hide">
        {cartItems.length === 0 ? (
          <div className="flex-grow h-full flex items-center justify-center border-[var(--main)]">
            <div className="text-gray-500 text-center text-sm px-2">
              {selectedOrder
                ? "This order has no products."
                : "Select an order from the left side to preview"}
            </div>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-3 rounded-lg"
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
                    ₹{item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-gray-500"
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
      <hr className="my-2 opacity-20" />
      <div>
        <Link
          to="/bill"
          className="bg-[var(--main)] text-white font-semibold py-2 rounded-md block text-center"
        >
          CHECKOUT &gt;
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
