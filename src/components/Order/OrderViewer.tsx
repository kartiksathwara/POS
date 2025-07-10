// import { useCart, type CartItem } from "../../auth/cartContext";
import useOrderHistory from "../../hooks/useOrderHistory";

const OrderHistoryViewer = () => {
  const { currentOrder, goBack, goForward, index, totalOrders } =
    useOrderHistory();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-2">Hold orders</h2>

      <div className="flex justify-between mb-2">
        <button
          onClick={goBack}
          disabled={index === 0}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          ← Previous
        </button>
        <span className="text-sm text-gray-600">
          Hold Orders {index + 1} of {totalOrders}
        </span>
        <button
          onClick={goForward}
          disabled={index === totalOrders - 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next →
        </button>
      </div>

      {currentOrder.length === 0 ? (
        <p>No order to show</p>
      ) : (
        <ul className="space-y-2">
          {currentOrder.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:5000/uploads/${item.thumbnail}`}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p>{item.title}</p>
                  <p className="text-sm text-gray-500">
                    ${item.price} × {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistoryViewer;
