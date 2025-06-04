import type React from "react";
import { IoMdClose } from "react-icons/io";

type FeeProps = {
  closeCollection: () => void;
};

const CollectionPopup: React.FC<FeeProps> = ({ closeCollection }) => {
  return (
    <div className="absolute bottom-0 bg-white rounded-t-2xl h-[75%] w-[130vh] px-5 pt-5 border border-b-0 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-700 font-semibold text-lg">Link </h2>
        <button
          className="text-2xl text-gray-500 hover:text-gray-700"
          onClick={closeCollection}
        >
          <IoMdClose />
        </button>
      </div>

      <div className="space-y-4">
        <div className="border px-2 py-1 flex flex-col gap-2 rounded-md">
          <label className="absolute text-sm text-gray-500 ">Title</label>
          <input
            type="text"
            placeholder="Google"
            className="relative w-full h-10 mt-1 pt-4 text-gray-800 outline-0"
          />
        </div>
        <div className="border px-2 py-1 flex flex-col gap-2 rounded-md">
          <label className="absolute text-sm text-gray-500 ">URL</label>
          <input
            type="text"
            placeholder="www.google.com"
            className="relative w-full h-10 mt-1 pt-4 text-gray-800 outline-0"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button className="px-4 py-2 text-sm text-gray-600 border rounded-md hover:bg-gray-100">
          CLEAR
        </button>
        <button className="px-4 py-2 text-sm bg-peach-100 text-gray-800 rounded-md hover:bg-peach-200">
          SAVE
        </button>
      </div>
    </div>
  );
};

export default CollectionPopup;
