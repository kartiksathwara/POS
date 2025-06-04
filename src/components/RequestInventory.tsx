import Header from "./Header";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import InventoryList from "./InventoryList";
import CollectionList from "./CollectionList";
import BagOrderInput from "./BagList";

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
				<div className="p-1">
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
					<div className="flex px-9 gap-3">
						{["Inventory", "Collection", "Bag"].map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab as "Inventory" | "Collection" | "Bag")}
								className={`p-4 rounded-xl font-semibold w-[250px] flex justify-items-start text-lg transition-all duration-200 shadow-sm ${activeTab === tab
										? "bg-neutral-800 text-[#EEE2D9]"
										: "bg-[#EEE2D9] text-neutral-800"
									}`}
							>
								{tab}
							</button>
						))}
					</div>


					<div className="">
						<div className="">
							{activeTab === "Inventory" && <InventoryList />}
						</div>
						<div className="p-6">
							{activeTab === "Collection" && (
								<CollectionList<CollectionItem> columns={collectionColumns} data={collectionData} />
							)}
						</div>
						<div className="p-6">
							{activeTab === "Bag" && <BagOrderInput />}
						</div>
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