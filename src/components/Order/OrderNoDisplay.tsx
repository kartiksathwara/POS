import React from "react";
import { useDispatch } from "react-redux";
import { setOrderData, setSelectedOrder } from "../../auth/orderSlice";

const OrderNoDisplay: React.FC = () => {
  const dispatch = useDispatch();

  const heldOrders = JSON.parse(localStorage.getItem("heldOrders") || "[]");

  const handleResume = (index: number) => {
    const heldOrders = JSON.parse(localStorage.getItem("heldOrders") || "[]");
    const selected = heldOrders[index];

    if (!selected) return;

    dispatch(setOrderData(selected));
    dispatch(setSelectedOrder(selected.orderNo));

    heldOrders.splice(index, 1);
  };

  if (heldOrders.length === 0) {
    return;
  }

  return (
    <div className="flex gap-3 items-center p-3 bg-(--secondary)">
      {heldOrders.length != 0 ? (
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold mb-4">Orders:</h2>
          <ul className="flex gap-4">
            {heldOrders.map((order: any, index: number) => (
              <button
                key={order.orderNo}
                className={`w-12 h-10 rounded-md text-sm font-semibold transition-all border bg-(--main)/50 text-white
            }`}
                onClick={() => handleResume(index)}
              >
                {order.orderNo}
              </button>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default OrderNoDisplay;
