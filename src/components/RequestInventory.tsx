import Header from "./Header";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import CollectionList from "./CollectionList";
import BagOrderInput from "./BagList";
import InventoryList from "./Inventory/InventoryList";
import { IoIosArrowBack } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";

type CollectionItem = {
  image: string;
  name: string;
  category: string;
  price: string;
};

type InventoryItem = {
  id: string;
  title: string;
  price: string;
  thumbnail: string;
};

const RequestInventory = () => {
  const [activeTab, setActiveTab] = useState<
    "Inventory" | "Collection" | "Bag"
  >("Inventory");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileCategories, setShowMobileCategories] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

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

  const inventoryData: InventoryItem[] = [
    {
      id: "1",
      title: "Black Shoes",
      price: "100",
      thumbnail: "https://via.placeholder.com/50",
    },
    {
      id: "2",
      title: "Red Shirt",
      price: "50",
      thumbnail: "https://via.placeholder.com/50",
    },
    {
      id: "3",
      title: "Red Shirt",
      price: "50",
      thumbnail: "https://via.placeholder.com/50",
    },
    {
      id: "4",
      title: "Black Shoes",
      price: "100",
      thumbnail: "https://via.placeholder.com/50",
    },
    {
      id: "5",
      title: "Red Shirt",
      price: "50",
      thumbnail: "https://via.placeholder.com/50",
    },
    {
      id: "6",
      title: "Red Shirt",
      price: "50",
      thumbnail: "https://via.placeholder.com/50",
    },
    {
      id: "7",
      title: "Red Shirt",
      price: "50",
      thumbnail: "https://via.placeholder.com/50",
    },
  ];

  const filteredCollectionData = collectionData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery) ||
      item.category.toLowerCase().includes(searchQuery) ||
      item.price.toLowerCase().includes(searchQuery)
  );

  const filteredInventoryData = inventoryData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery) ||
      item.price.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <div className="flex flex-col  w-full lg:w-[70%] overflow-auto p-4">
          <SearchBar onSearch={handleSearch} />
          <div className="flex items-center justify-between px-4 sm:px-6 mt-2">
            <Link to="/" className="flex items-center">
              <IoIosArrowBack size={20} />
              <h1 className="text-xl font-bold">REQUEST INVENTORY</h1>
            </Link>
            <button
              className="md:hidden p-2 bg-[#E9DCCF] rounded-lg"
              onClick={() => setShowMobileCategories(!showMobileCategories)}
            >
              <BsThreeDotsVertical size={20} />
            </button>
          </div>
          <div className="hidden md:flex gap-2 px-4 sm:px-10 mt-4">
            {["Inventory", "Collection", "Bag"].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(tab as "Inventory" | "Collection" | "Bag")
                }
                className={`p-4 rounded-xl font-semibold w-[200px] flex justify-center text-lg transition-all duration-200 shadow-sm ${
                  activeTab === tab
                    ? "bg-neutral-800 text-[#EEE2D9]"
                    : "bg-[#EEE2D9] text-neutral-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {showMobileCategories && (
            <div className="md:hidden flex flex-col gap-2 px-4 sm:px-6 mt-3">
              {["Inventory", "Collection", "Bag"].map((item) => (
                <div
                  key={item}
                  className="py-2 px-4 bg-[var(--primary)] rounded-lg cursor-pointer text-sm font-medium"
                  onClick={() =>
                    setActiveTab(item as "Inventory" | "Collection" | "Bag")
                  }
                >
                  {item}
                </div>
              ))}
            </div>
          )}
          <div className="p-5 flex-1 overflow-y-auto scrollbar-hide">
            {activeTab === "Inventory" ? (
              <InventoryList data={filteredInventoryData} />
            ) : activeTab === "Collection" ? (
              <CollectionList<CollectionItem>
                columns={collectionColumns}
                data={filteredCollectionData}
              />
            ) : (
              <BagOrderInput />
            )}
          </div>
        </div>
        <div className="w-full lg:w-[30%] bg-(--secondary) hidden lg:flex flex-col justify-between max-h-full p-4 overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="w-full h-full bg-[var(--secondary)] flex flex-col">
            <div className="mb-2 ">
              <button className="bg-white text-black w-full py-2 px-4 rounded-md">
                Clear cart
              </button>
            </div>
            <hr className="mb-2 opacity-20" />
            <div className="flex-1 overflow-y-auto h-fit flex flex-col gap-3 scrollbar-hide">
              <div className="flex-grow h-full flex items-center justify-center border-[var(--main)]">
                <div className="text-gray-500 text-center text-sm px-2">
                  Products
                </div>
              </div>
            </div>
            <hr className="my-2 opacity-20" />
            <div>
              <Link
                to="/bill"
                className="bg-[var(--main)] text-white font-semibold py-2 rounded-md block text-center"
              >
                SEND &gt;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestInventory;
