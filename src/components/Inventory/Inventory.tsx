import { useEffect, useState } from "react";
import Header from "../Header";
import SearchBar from "../SearchBar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosArrowBack ,IoIosArrowForward} from "react-icons/io";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const Inventory = () => {
  const categories = [
    "Shirt",
    "T-shirt",
    "Top",
    "Pants",
    "Jeans",
    "Trousers",
    "Dress",
  ];

  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const discount = subtotal * 0.18;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax;
  return (
    <div className="h-screen">
      <Header />
      <div className="flex h-[calc(100%-4rem)]">
				<div className="w-2/3 flex flex-col">
					<SearchBar />
					<div className="px-8 -mt-5">
							<Link to="/" className="flex items-center">
							<IoIosArrowBack size={20}/>
								<span className="text-xl font-bold ml-2">INVENTORY</span>
							</Link>
						<div className="flex justify-between  items-center mt-4">
							<div className="flex gap-2 flex-wrap">
								{categories.map(item => (
									<div
										key={item}
										className="py-2 px-4 bg-(--primary) rounded-lg cursor-pointer text-sm font-medium"
									>
										{item}
									</div>
								))}
							</div>
							<div className="p-2 bg-[#E9DCCF] rounded-lg">
								<BsThreeDotsVertical />
							</div>
						</div>
					</div>
					<div className="flex-1 overflow-y-auto p-6 px-10 grid grid-cols-2 gap-4 scrollbar-hide">
						{products.map(product => (
							<div
								key={product.id}
								onClick={() => handleAddToCart(product)}
								className="flex justify-between items-center p-4 rounded-md bg-(--bgorder) shadow-sm hover:shadow-md cursor-pointer"
							>
								<div className="flex gap-4">
									<img
										src={product.thumbnail}
										alt={product.title}
										className="w-16 h-16 rounded-sm border object-cover"
									/>
									<div>
										<h3 className="font-semibold text-base">{product.title}</h3>
										<p className="text-sm text-gray-500">Size - 30 UK</p>
									</div>
								</div>
								<div className="text-sm font-semibold">${product.price.toFixed(2)}</div>
							</div>
						))}
					</div>
					<Link
						to="/requestinventory"
						className="flex items-center gap-1 font-medium text-black px-8 pb-4"
					>
						<span>Request Inventory</span>
						<IoIosArrowForward size={20}/>
					</Link>
				</div>
				<div className="w-1/2 bg-(--secondary) p-6 flex flex-col justify-between">
					<div>
						<div className="flex justify-center gap-3 mb-4">
							<button
								onClick={handleClearCart}
								className="bg-white w-full text-black py-2 px-4 rounded-md"
							>
								Clear cart
							</button>
							<button className="bg-(--main) w-full text-white  py-2 px-4 rounded-md">
								Hold this order
							</button>
						</div>
						<div className="flex-1 overflow-y-auto space-y-3 max-h-[300px] pr-2 scrollbar-hide">
							{cartItems.map((item) => (
								<div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-lg">
									<div className="flex gap-3 items-center">
										<img
											src={item.thumbnail}
											alt={item.title}
											className="w-12 h-12 rounded-sm object-cover"
										/>
										<div>
											<h4 className="font-medium text-sm">{item.title}</h4>
											<p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
										</div>
									</div>
									<button onClick={() => handleRemoveItem(item.id)} className="text-gray-500">
										<FaTrash />
									</button>
								</div>
							))}
						</div>
					</div>
					<div className="mt-6">
						<div className="flex justify-between items-center bg-white rounded-xl px-4 py-2 mb-4">
							<input
								type="text"
								placeholder="Discount"
								className="bg-white text-sm text-black placeholder-black focus:outline-none w-full"
							/>
							<button className="bg-(--buttonbg) text-sm font-semibold px-4 py-1.5 rounded-md ml-2">
								{/* <Link to="/discount"> */}
                ADD
                {/* </Link> */}
							</button>
						</div>
						<div className="text-sm space-y-2">
							<div className="flex justify-between">
								<span>Subtotal • {cartItems.length} items</span>
								<span>${subtotal.toFixed(2)}</span>
							</div>
							<div className="flex justify-between text-gray-500">
								<span>Discount (-18%)</span>
								<span>-${discount.toFixed(2)}</span>
							</div>
							<div className="text-xs text-gray-400">Regular customer discount</div>
							<div className="flex justify-between text-gray-500">
								<span>Tax (+8%)</span>
								<span>${tax.toFixed(2)}</span>
							</div>
							<div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
								<span>Total</span>
								<span>${total.toFixed(2)}</span>
							</div>
						</div>
						<button className="bg-(--main) w-full text-white font-semibold py-2 rounded-md block text-center">
							<Link to="/bill">CHECKOUT &gt;</Link>
						</button>
					</div>
				</div>
			</div>
    </div>
  );
};

export default Inventory;
