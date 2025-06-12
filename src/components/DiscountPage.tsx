import Checkout from "./Checkout";
import SearchBar from "./SearchBar";
import Header from "./Header";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";

const discounts = [
  { code: "#TP-520392-72", percent: "26%", reason: "Regular Customer" },
  { code: "#TP-520392-73", percent: "10%", reason: "Loyal Customer" },
  { code: "#TP-520392-74", percent: "2%", reason: "Regular Customer" },
  { code: "#TP-520392-75", percent: "12%", reason: "Loyal Customer" },
  { code: "#TP-520392-76", percent: "50%", reason: "Special Customer" },
  { code: "#TP-520392-77", percent: "18%", reason: "Regular Customer" },
  { code: "#TP-520392-78", percent: "8%", reason: "Loyal Customer" },
  { code: "#TP-520392-79", percent: "5%", reason: "Regular Customer" },
];

const DiscountPage: React.FC = () => {
  const [discount, setDiscount] = useState(discounts);
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setDiscount(discounts);
      return;
    }

    const filtered = discounts.filter(
      (item) =>
        item.reason.toLowerCase().includes(query.toLowerCase()) ||
        item.code.toLowerCase().includes(query.toLowerCase())
    );
    setDiscount(filtered);
  };
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <div className="w-full lg:w-[70%] overflow-y-auto p-4 flex flex-col gap-4">
          <SearchBar onSearch={handleSearch} />

          <div className="px-2 sm:px-6">
            <h2 className="flex items-center text-xl font-semibold text-[var(--main)] gap-2">
              <Link to="/" className="text-[var(--main)]">
                <FaAngleLeft />
              </Link>
              DISCOUNT
            </h2>
          </div>

          <div className="px-2 sm:px-6">
            <div className="overflow-auto shadow-md rounded-xl">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-[var(--main)] text-white">
                  <tr>
                    <th className="p-3 text-left">Coupon Code</th>
                    <th className="p-3 text-center">Percentage</th>
                    <th className="p-3 text-right">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {discount.map((d, i) => (
                    <tr
                      key={i}
                      className="bg-[var(--primary)]/20 border-b border-[var(--primary)]"
                    >
                      <td className="p-3">{d.code}</td>
                      <td className="p-3 text-center">{d.percent}</td>
                      <td className="p-3 text-right">{d.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[30%] max-h-full overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-200">
          <Checkout />
        </div>
      </div>
    </div>
  );
};

export default DiscountPage;
