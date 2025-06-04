import { useState } from "react";

const BagOrderInput = () => {
  const [bags, setBags] = useState<number>();

  return (
    <div className="border border-gray-300 rounded-xl p-4  w-3xl">
      <label className="block text-gray-700 font-medium">
        How many bags would you like to order?
      </label>
      <input
        type="number"
        value={bags}
        onChange={(e) => setBags(Number(e.target.value))}
        className="w-full px-4 py-2 border border-[#f4ebe5] rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
      />
    </div>
  );
};

export default BagOrderInput;
