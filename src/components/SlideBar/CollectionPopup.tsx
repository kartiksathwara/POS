import type React from "react";
import { IoMdClose } from "react-icons/io";
import TableComp from "../TableComp/TableComp";

type FeeProps = {
  closeCollection: () => void;
};

const columns = [
  { Header: "Image", accessor: "image" },
  { Header: "Name", accessor: "name" },
  { Header: "No. of Product", accessor: "product" },
];

const data = [
  {
    image: "/girl_img.png",
    name: "John Doe",
    product: 28,
  },
  {
    image: "/kid_img.png",
    name: "Abc",
    product: 28,
  },
  {
    image: "/girl_img.png",
    name: "John Doe",
    product: 28,
  },
  {
    image: "/kid_img.png",
    name: "Abc",
    product: 28,
  },
  {
    image: "/kid_img.png",
    name: "Abc",
    product: 28,
  },
  {
    image: "/kid_img.png",
    name: "Abc",
    product: 28,
  },
  {
    image: "/kid_img.png",
    name: "Abc",
    product: 28,
  },
  {
    image: "/kid_img.png",
    name: "Abc",
    product: 28,
  },
  {
    image: "/kid_img.png",
    name: "Abc",
    product: 28,
  },
  {
    image: "/kid_img.png",
    name: "Abc",
    product: 28,
  },
  {
    image: "/kid_img.png",
    name: "Abc",
    product: 28,
  },
  {
    image: "/kid_img.png",
    name: "Abc",
    product: 28,
  },
];

const CollectionPopup: React.FC<FeeProps> = ({ closeCollection }) => {
  return (
    <div className="absolute bottom-0 bg-white rounded-t-2xl h-[75%] w-[122vh] px-5 pt-5 border border-b-0 shadow-lg">
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
        <TableComp data={data} columns={columns}/>
      </div>
    </div>
  );
};

export default CollectionPopup;
