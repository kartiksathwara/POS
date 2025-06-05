// import Checkout from "../Checkout";
// import Header from "../Header";
// import SearchBar from "../SearchBar";
// import { BsThreeDotsVertical } from "react-icons/bs";

// const Inventory = () => {
//   const categories = [
//     "Shirt",
//     "T-shirt",
//     "Top",
//     "Pants",
//     "Jeans",
//     "Trousers",
//     "Dress",
//   ];
//   return (
//     <div className="h-screen">
//       <Header />
//       <div className="flex">
//         <div className="-mt-4">
//           <SearchBar />
//           <h2 className="px-7 font-bold">INVENTORY</h2>
//           <div className="flex justify-between items-center px-7 py-4">
//             <div className="flex gap-4 flex-wrap">
//               {categories.map((item) => (
//                 <div className="py-3 px-4 bg-(--primary) rounded-lg">
//                   {item}
//                 </div>
//               ))}
//             </div>
//             <div className="py-3 px-4 bg-(--primary) rounded-lg">
//               <BsThreeDotsVertical />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 px-7 py-2 my-4 gap-6 h-[300px] overflow-y-auto">
//             <div className="flex justify-between items-center p-3 bg-(--bgorder) rounded-xl h-20">
//               <div className="flex gap-3">
//                 <img alt="demo" className="w-16 h-16 rounded-sm border" />
//                 <div>
//                   <h3>Name</h3>
//                   <p>Size - 30 UK</p>
//                 </div>
//               </div>
//               <div>$price</div>
//             </div>
//           </div>
//           <h6 className="px-7 text-sm">Request Inventory</h6>
//         </div>
//         <Checkout />
//       </div>
//     </div>
//   );
// };

// export default Inventory;
