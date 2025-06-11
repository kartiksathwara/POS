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

import { Link } from "react-router-dom";

const Checkout = () => {
  return (
    <div className="w-full h-full p-4 sm:p-6 bg-[var(--secondary)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
        <button className="bg-white text-black w-full py-2 px-4 rounded-md">
          Clear cart
        </button>
        <button className="bg-[var(--main)] text-white w-full py-2 px-4 rounded-md">
          Hold this order
        </button>
      </div>

      <div className="flex-grow flex items-center justify-center border-y border-[var(--main)] mb-4">
        <div className="text-gray-500 text-center text-sm px-2">
          Add product manually or via scanner
        </div>
      </div>

      <Link
        to="/bill"
        className="bg-[var(--main)] text-white font-semibold py-2 rounded-md block text-center"
      >
        CHECKOUT &gt;
      </Link>
    </div>
  );
};

export default Checkout;
