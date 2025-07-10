
import { FaTrash } from "react-icons/fa";
import { useCart } from "../auth/cartContext";

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty  } = useCart();

  return (
    <div className="max-w-xl mx-auto mt-8">
      {cart.length === 0 ? (
        <p className="text-center">Cart is empty</p>
      ) : (
        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 bg-gray-100 rounded">
              <div className="flex items-center gap-4">
                <img src={`http://localhost:5000/uploads/${item.thumbnail}`} className="w-16 h-16 object-cover" />
                <div>
                  <p>{item.title}</p>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>
              <div onClick={() => removeFromCart(item.id)} className="text-red-500 cursor-pointer">
                <FaTrash />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
