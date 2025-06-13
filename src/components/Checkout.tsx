// import { Link } from "react-router-dom";

// const Checkout = () => {
//   return (
//     <div className="w-full h-full p-5 bg-(--secondary) flex flex-col">
//       <div className="flex justify-center p-3 font-serif gap-3 mb-4">
//         <button className="bg-white text-black w-full py-2 px-4 rounded-md">
//           Clear cart
//         </button>
//         <button className="bg-(--main) text-white w-full py-2 px-4 rounded-md">
//           Hold this order
//         </button>
//       </div>
//       <div className="flex-grow flex items-center justify-center border-t border-b border-(--main) mb-4 sm:h-[20%] lg:h-[70%] h-[100%]">
//         <div className="text-gray-500 text-center text-sm">
//           Add product manually or via scanner
//         </div>
//       </div>
//       <Link
//         to="/bill"
//         className="bg-(--main) text-white font-semibold py-2 rounded-md block text-center"
//       >
//         CHECKOUT &gt;
//       </Link>
//     </div>
//   );
// };

// export default Checkout;

import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handleRemoveItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="w-full h-full bg-[var(--secondary)] flex flex-col">
      <div className="flex justify-center gap-3 mb-2 ">
        <button className="bg-white text-black w-full py-2 px-4 rounded-md">
          Clear cart
        </button>
        <button className="bg-[var(--main)] text-white w-full py-2 px-4 rounded-md">
          Hold this order
        </button>
      </div>
      <hr className="mb-2 opacity-20" />
      <div className="flex-1 overflow-y-auto h-fit flex flex-col gap-3 scrollbar-hide">
        {cartItems.length === 0 ? (
          <div className="flex-grow h-full flex items-center justify-center border-[var(--main)]">
            <div className="text-gray-500 text-center text-sm px-2">
              Add product manually or via scanner
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
                    ${item.price.toFixed(2)}
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
