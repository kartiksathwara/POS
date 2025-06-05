import Header from "./Header";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import CollectionList from "./CollectionList";
import BagOrderInput from "./BagList";
import InventoryList from "./Inventory/InventoryList";
import { IoIosArrowBack } from "react-icons/io";

type CollectionItem = {
  image: string;
  name: string;
  category: string;
  price: string;
};

const RequestInventory = () => {
  const [activeTab, setActiveTab] = useState<
    "Inventory" | "Collection" | "Bag"
  >("Inventory");

  const collectionColumns = [
    { Header: "Image", accessor: "image" },
    { Header: "Name", accessor: "name" },
    { Header: "Category", accessor: "category" },
    { Header: "Price", accessor: "price" },
  ] satisfies { Header: string; accessor: keyof CollectionItem }[];

  const collectionData: CollectionItem[] = [
    {
      image: "https://via.placeholder.com/50",
      name: "Item One",
      category: "Shoes",
      price: "$120",
    },
    {
      image: "https://via.placeholder.com/50",
      name: "Item Two",
      category: "Apparel",
      price: "$80",
    },
    {
      image: "https://via.placeholder.com/50",
      name: "Item Three",
      category: "Accessories",
      price: "$40",
    },
  ];

  return (
    <div className="">
      <Header />
      <div className="flex">
        <div className="p-1">
          <SearchBar />
          <div className="flex items-center p-7 gap-2 -mt-10 ">
            <Link to="/">
              <IoIosArrowBack size={20}/>
            </Link>
            <h1 className="text-xl font-bold">REQUEST INVENTORY</h1>
          </div>
          <div className="flex px-9 gap-3">
            {["Inventory", "Collection", "Bag"].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(tab as "Inventory" | "Collection" | "Bag")
                }
                className={`p-4 rounded-xl font-semibold w-[250px] flex justify-items-start text-lg transition-all duration-200 shadow-sm ${
                  activeTab === tab
                    ? "bg-neutral-800 text-[#EEE2D9]"
                    : "bg-[#EEE2D9] text-neutral-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

            <div className="p-5">
              {activeTab === "Inventory" ? (
                <InventoryList />
              ) : activeTab === "Collection" ? (
                <CollectionList<CollectionItem>
                  columns={collectionColumns}
                  data={collectionData}
                />
              ) : (
                <BagOrderInput />
              )}
          </div>
        </div>
        <div className="w-1/2 p-5 bg-(--secondary) flex h-[calc(100vh-3.5rem)] flex-col ">
          <div className="flex p-3 items-center font-serif pl-7">
            <button className="bg-white text-black font-semibold py-2 w-sm rounded-md ">
              Clear cart
            </button>
          </div>
          <div className="flex-grow border-t border-b border-(--main) mb-4">
            products
          </div>
          <button className="bg-(--main) text-white font-semibold py-2 rounded-md block text-center">
            SEND &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestInventory;
