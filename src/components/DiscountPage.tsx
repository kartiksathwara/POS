// import Checkout from "./Checkout";
// import SearchBar from "./SearchBar";
// import Header from "./Header";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { IoIosArrowBack } from "react-icons/io";


// const discounts = [
// 	{ code: "#TP-520392-72", percent: "26%", reason: "Regular Customer" },
// 	{ code: "#TP-520392-73", percent: "10%", reason: "Loyal Customer" },
// 	{ code: "#TP-520392-74", percent: "2%", reason: "Regular Customer" },
// 	{ code: "#TP-520392-75", percent: "12%", reason: "Loyal Customer" },
// 	{ code: "#TP-520392-76", percent: "50%", reason: "Special Customer" },
// 	{ code: "#TP-520392-77", percent: "18%", reason: "Regular Customer" },
// 	{ code: "#TP-520392-78", percent: "8%", reason: "Loyal Customer" },
// 	{ code: "#TP-520392-79", percent: "5%", reason: "Regular Customer" },
// ];

// const DiscountPage: React.FC = () => {
//   const [discount, setDiscount] = useState(discounts);
//   const navigate = useNavigate();
//   const handleSearch = (query: string) => {
//     if (!query.trim()) {
//       setDiscount(discounts);
//       return;
//     }

//     const filtered = discounts.filter(
//       (item) =>
//         item.reason.toLowerCase().includes(query.toLowerCase()) ||
//         item.code.toLowerCase().includes(query.toLowerCase())
//     );
//     setDiscount(filtered);
//   };

//   return (
//     <div className="h-screen flex flex-col">
//       <Header />
//       <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
//         <div className="w-full lg:w-[70%] overflow-y-auto p-4 flex flex-col gap-4">
//           <SearchBar onSearch={handleSearch} />

// 					<div className="px-2 sm:px-6">
// 						<h2 className="flex items-center text-xl font-semibold text-[var(--main)] gap-2">
// 							<Link to="/" className="text-[var(--main)]">
// 								<IoIosArrowBack />
// 							</Link>
// 							DISCOUNT
// 						</h2>
// 					</div>

//           <div className="px-2 sm:px-6">
//             <div className="overflow-auto shadow-md rounded-xl">
//               <table className="min-w-full text-sm text-gray-700">
//                 <thead className="bg-[var(--main)] text-white">
//                   <tr>
//                     <th className="p-3 text-left">Coupon Code</th>
//                     <th className="p-3 text-center">Percentage</th>
//                     <th className="p-3 text-right">Reason</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-gray-200 bg-white">
//                   {discount.map((d, i) => (
//                     <tr
//                       key={i}
//                       className="bg-[var(--primary)]/20 border-b border-[var(--primary)]"
//                       onClick={() => {
//                         localStorage.setItem("selectedDiscount", d.percent);
//                         localStorage.setItem("discountReason", d.reason);
//                         navigate("/inventory");
//                       }}
//                     >
//                       <td className="p-3">{d.code}</td>
//                       <td className="p-3 text-center">{d.percent}</td>
//                       <td className="p-3 text-right">{d.reason}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

// 				<div className="w-full lg:w-[30%] bg-(--secondary) hidden lg:flex flex-col justify-between max-h-full p-4 overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-200">
// 					<Checkout />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default DiscountPage;




import Checkout from "./Checkout";
import SearchBar from "./SearchBar";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

let counter = 80;

const generateCoupon = () => {
  counter++;
  return `#TP-520392-${counter}`;
};

const initialDiscounts = [
  { code: "#TP-520392-72", percent: "26%", reason: "Regular Customer" },
  { code: "#TP-520392-73", percent: "10%", reason: "Loyal Customer" },
];

const DiscountPage: React.FC = () => {
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [percent, setPercent] = useState("");
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  // LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const stored = localStorage.getItem("coupons");
    if (stored) {
      setDiscounts(JSON.parse(stored));
    } else {
      setDiscounts(initialDiscounts);
      localStorage.setItem("coupons", JSON.stringify(initialDiscounts));
    }
  }, []);

  // SAVE TO LOCAL STORAGE
  const saveCoupons = (data: any[]) => {
    setDiscounts(data);
    localStorage.setItem("coupons", JSON.stringify(data));
  };

  // SEARCH
  const handleSearch = (query: string) => {
    const stored = JSON.parse(localStorage.getItem("coupons") || "[]");

    if (!query.trim()) {
      setDiscounts(stored);
      return;
    }

    const filtered = stored.filter(
      (item: any) =>
        item.reason.toLowerCase().includes(query.toLowerCase()) ||
        item.code.toLowerCase().includes(query.toLowerCase())
    );

    setDiscounts(filtered);
  };

  // ADD COUPON
  const handleAddCoupon = () => {
    if (!percent || !reason) return;

    const newCoupon = {
      code: generateCoupon(),
      percent: percent + "%",
      reason: reason,
    };

    const updated = [newCoupon, ...discounts];
    saveCoupons(updated);

    setPercent("");
    setReason("");
    setShowForm(false);
  };

  // DELETE COUPON
  const handleDelete = (code: string) => {
    const updated = discounts.filter((d) => d.code !== code);
    saveCoupons(updated);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

        <div className="w-full lg:w-[70%] overflow-y-auto p-4 flex flex-col gap-4">

          <SearchBar onSearch={handleSearch} />

          <div className="px-2 sm:px-6 flex justify-between items-center">
            <h2 className="flex items-center text-xl font-semibold text-[var(--main)] gap-2">
              <Link to="/" className="text-[var(--main)]">
                <IoIosArrowBack />
              </Link>
              DISCOUNT
            </h2>

            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[var(--main)] text-white px-4 py-2 rounded-lg"
            >
              Add Coupon
            </button>
          </div>

          {/* FORM */}
          {showForm && (
            <div className="px-2 sm:px-6">
              <div className="bg-[var(--primary)]/20 border border-[var(--primary)] p-4 rounded-xl flex flex-col gap-3 items-center text-center relative">

                <IoClose
                  className="absolute top-2 right-2 text-xl cursor-pointer text-[var(--main)] hover:scale-110"
                  onClick={() => setShowForm(false)}
                />

                <h3 className="font-semibold text-[var(--main)]">
                  Create Coupon
                </h3>

                <input
                  type="number"
                  placeholder="Percentage"
                  value={percent}
                  onChange={(e) => setPercent(e.target.value)}
                  className="p-2 border rounded-lg w-2/3"
                />

                <input
                  type="text"
                  placeholder="Reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="p-2 border rounded-lg w-2/3"
                />

                <button
                  onClick={handleAddCoupon}
                  className="bg-[var(--main)] text-white py-2 px-6 rounded-lg"
                >
                  Generate Coupon
                </button>
              </div>
            </div>
          )}

          {/* TABLE */}
          <div className="px-2 sm:px-6">
            <div className="overflow-auto shadow-md rounded-xl">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-[var(--main)] text-white">
                  <tr>
                    <th className="p-3 text-left">Coupon Code</th>
                    <th className="p-3 text-center">Percentage</th>
                    <th className="p-3 text-right">Reason</th>
                    <th className="p-3 text-center">Delete</th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {discounts.map((d, i) => (
                    <tr
                      key={i}
                      className="bg-[var(--primary)]/20 border-b border-[var(--primary)] cursor-pointer hover:opacity-80"
                      onClick={() => {
                        localStorage.setItem("selectedDiscount", d.percent);
                        localStorage.setItem("discountReason", d.reason);
                        navigate("/inventory");
                      }}
                    >
                      <td className="p-3">{d.code}</td>

                      <td className="p-3 text-center">{d.percent}</td>
                      <td className="p-3 text-right">{d.reason}</td>

                      <td className="text-center pl-30">
                        <FaTrash
                          className="text-red-500 cursor-pointer hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation(); // prevents row click
                            handleDelete(d.code);
                          }}
                        />
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>
            </div>
          </div>

        </div>

        <div className="w-full lg:w-[30%] bg-(--secondary) hidden lg:flex flex-col justify-between p-4 border-l">
          <Checkout />
        </div>

      </div>
    </div>
  );
};

export default DiscountPage;
