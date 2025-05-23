import Header from "./Header";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import InventoryList from "./InventoryList";
import CollectionList from "./CollectionList";

type CollectionItem = {
  image: string;
  name: string;
  category: string;
  price: string;
};

const RequestInventory = () => {
  const [activeTab, setActiveTab] = useState<"Inventory" | "Collection" | "Bag">("Inventory");

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
    <div className="h-screen">
      <Header />
      <div className="flex">
        <div className="">
          <SearchBar />
          <div className="flex items-center p-7 gap-2 -mt-10">
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                <path
                  d="M12.2665 1.98191C12.6666 1.58183 13.3186 1.59307 13.7047 2.0067L13.7437 2.04845C14.1096 2.44049 14.1011 3.05137 13.7244 3.43311L7.69142 9.54765C7.3072 9.93706 7.3072 10.5629 7.69142 10.9523L13.7244 17.0669C14.1011 17.4486 14.1096 18.0595 13.7437 18.4516L13.7047 18.4933C13.3186 18.9069 12.6666 18.9182 12.2665 18.5181L4.70554 10.9571C4.31502 10.5666 4.31502 9.93342 4.70554 9.54289L12.2665 1.98191Z"
                  fill="#333333"
                />
              </svg>
            </Link>
            <h1 className="text-xl font-bold">REQUEST INVENTORY</h1>
          </div>

          <div className="flex px-7 py-4 gap-4">
            {["Inventory", "Collection", "Bag"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "Inventory" | "Collection" | "Bag")}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  activeTab === tab ? "bg-neutral-800 text-[#EEE2D9]" : "bg-[#EEE2D9] text-neutral-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="px-2">
            {activeTab === "Inventory" && <InventoryList />}
            {activeTab === "Collection" && (
              <CollectionList<CollectionItem> columns={collectionColumns} data={collectionData} />
            )}
            {activeTab === "Bag" && <div className="p-4">Bag content goes here.</div>}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default RequestInventory;
