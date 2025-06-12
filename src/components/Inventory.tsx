import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

interface Product {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
}

interface CartItem extends Product {
	quantity: number;
}

const Inventory = () => {
	const navigate = useNavigate();
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
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
	const [couponDiscount, setCouponDiscount] = useState<number>(0);

	useEffect(() => {
		fetch("https://dummyjson.com/products")
			.then((res) => res.json())
			.then((data) => setProducts(data.products))
			.catch((err) => console.error("Error fetching products:", err));

		const savedCart = localStorage.getItem("cart");
		if (savedCart) {
			setCartItems(JSON.parse(savedCart));
		}

		const savedCoupon = localStorage.getItem("selectedCoupon");
		if (savedCoupon) {
			setSelectedCoupon(savedCoupon);
		}
	}, []);

	useEffect(() => {
		if (selectedCoupon !== null) {
			localStorage.setItem("selectedCoupon", selectedCoupon);
		} else {
			localStorage.removeItem("selectedCoupon");
		}
	}, [selectedCoupon]);

	useEffect(() => {
		const calculateCouponDiscount = () => {
			if (selectedCoupon) {
				const discountsString = localStorage.getItem("discounts");
				if (discountsString) {
					const discounts = JSON.parse(discountsString);
					const selectedDiscount = discounts.find((d: { code: string }) => d.code === selectedCoupon);
					if (selectedDiscount) {
						const discountAmount = subtotal * (parseFloat(selectedDiscount.percent) / 100);
						setCouponDiscount(discountAmount);
						return discountAmount;
					}
				}
			}
			setCouponDiscount(0);
			return 0;
		};

		calculateCouponDiscount();
	}, [selectedCoupon, cartItems]);

	const handleAddToCart = (product: Product) => {
		const existingItem = cartItems.find(item => item.id === product.id);

		let updatedCart;
		if (existingItem) {
			updatedCart = cartItems.map(item =>
				item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
			);
		} else {
			updatedCart = [...cartItems, { ...product, quantity: 1 }];
		}
		setCartItems(updatedCart);
		localStorage.setItem("cart", JSON.stringify(updatedCart));
	};

	const increaseQty = (id: number) => {
		const updated = cartItems.map(item =>
			item.id === id ? { ...item, quantity: item.quantity + 1 } : item
		);
		setCartItems(updated);
		localStorage.setItem("cart", JSON.stringify(updated));
	};

	const decreaseQty = (id: number) => {
		const updated = cartItems
			.map(item =>
				item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
			)
			.filter(item => item.quantity > 0);

		setCartItems(updated);
		localStorage.setItem("cart", JSON.stringify(updated));
	};

	const handleClearCart = () => {
		setCartItems([]);
		localStorage.removeItem("cart");
	};

	const handleRemoveItem = (id: number) => {
		const updatedCart = cartItems.filter(item => item.id !== id);
		setCartItems(updatedCart);
		localStorage.setItem("cart", JSON.stringify(updatedCart));
	};

	const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
	const discount = subtotal * 0.18;

	const discountedSubtotal = subtotal - discount - couponDiscount;
	const tax = discountedSubtotal * 0.08;
	const total = discountedSubtotal + tax;

	const handleCheckout = () => {
		localStorage.setItem("totalAmount", total.toFixed(2));
		navigate("/bill");
	};

	const handleGoToDiscount = () => {
		navigate("/discount", { state: { subtotal: subtotal } });
	};

	const handleRemoveCoupon = () => {
		setSelectedCoupon(null);
	};

	return (
		<div className="max-h-screen flex flex-col">
			<Header />
			<div className="flex flex-col md:flex-row flex-1 overflow-hidden">
				<div className="w-full md:w-2/3 flex flex-col overflow-auto">
					<SearchBar />
					<div className="px-4 md:px-8 -mt-5">
						<Link to="/" className="flex items-center">
							<MdOutlineArrowBackIosNew className="size-5" />
							<span className="text-xl font-bold ml-2">INVENTORY</span>
						</Link>
						<div className="flex justify-between items-center mt-4 flex-wrap gap-y-2">
							<div className="flex gap-2 flex-wrap">
								{categories.map(item => (
									<div
										key={item}
										className="py-2 px-4 bg-[var(--primary)] rounded-lg cursor-pointer text-sm font-medium"
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

					<div className="flex-1 overflow-y-auto p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
						{products.map(product => (
							<div
								key={product.id}
								onClick={() => handleAddToCart(product)}
								className="flex justify-between items-center p-4 rounded-md bg-[var(--bgorder)] shadow-sm hover:shadow-md cursor-pointer"
							>
								<div className="flex gap-4">
									<img
										src={product.thumbnail}
										alt={product.title}
										className="w-16 h-16 rounded-sm object-cover"
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
						className="flex items-center gap-1 font-medium text-black px-4 md:px-8 pb-4"
					>
						<span>Request Inventory</span>
						<IoIosArrowForward className="size-4" />
					</Link>
				</div>
				<div className="w-full md:w-1/2 bg-[var(--secondary)] p-4 md:p-6 flex flex-col justify-between">
					<div>
						<div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
							<button
								onClick={handleClearCart}
								className="bg-white w-full text-black py-2 px-4 rounded-md"
							>
								Clear cart
							</button>
							<button className="bg-[var(--main)] w-full text-white py-2 px-4 rounded-md">
								Hold this order
							</button>
						</div>
						<div className="overflow-y-auto space-y-3 max-h-[380px] pr-2">
							{cartItems.map((item) => (
								<div
									key={item.id}
									className="flex justify-between items-center bg-white p-3 rounded-lg"
								>
									<div className="flex gap-3 items-center">
										<img
											src={item.thumbnail}
											alt={item.title}
											className="w-12 h-12 rounded-sm object-cover"
										/>
										<div>
											<h4 className="font-medium text-sm">{item.title}</h4>
											<div className="flex space-x-1 items-center">
												<p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
												<button
													className="px-2 bg-gray-200 rounded hover:bg-gray-300"
													onClick={() => decreaseQty(item.id)}
												>
													-
												</button>
												<span className="px-2 text-sm">{item.quantity}</span>
												<button
													className="px-2 bg-gray-200 rounded hover:bg-gray-300"
													onClick={() => increaseQty(item.id)}
												>
													+
												</button>
											</div>
										</div>
									</div>
									<button
										onClick={() => handleRemoveItem(item.id)}
										className="text-gray-500"
									>
										<FaTrash />
									</button>
								</div>
							))}
						</div>
					</div>
					<div className="pt-4">
						<div className="flex justify-between items-center bg-white rounded-xl px-4 py-2 mb-2">
							<input
								type="text"
								placeholder="Discount"
								className="bg-white text-sm text-black placeholder-black focus:outline-none w-full"
								readOnly
								value={selectedCoupon || ""}
							/>
							<div className="flex">
								<button
									onClick={handleGoToDiscount}
									className="bg-[var(--buttonbg)] text-sm font-semibold px-4 py-1.5 rounded-md ml-2"
								>
									{selectedCoupon ? "Edit" : "Add"}
								</button>
								{selectedCoupon && (
									<button
										onClick={handleRemoveCoupon}
										className="bg-[var(--main)] text-white text-sm font-semibold px-2 py-1.5 rounded-md ml-2"
									>
										Remove
									</button>
								)}
							</div>
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
								<span>Coupon Discount</span>
								<span>-${couponDiscount.toFixed(2)}</span>
							</div>
							<div className="flex justify-between text-gray-500">
								<span>Tax (+8%)</span>
								<span>${tax.toFixed(2)}</span>
							</div>
							<div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
								<span>Total</span>
								<span>${total.toFixed(2)}</span>
							</div>
							<button
								onClick={handleCheckout}
								className="bg-[var(--main)] w-full text-white font-semibold py-2 rounded-md text-center"
							>
								CHECKOUT &gt;
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Inventory;


// import { useEffect, useState } from "react";
// import Header from "../components/Header";
// import SearchBar from "../components/SearchBar";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { FaTrash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";

// interface Product {
// 	id: number;
// 	title: string;
// 	price: number;
// 	thumbnail: string;
// }

// const Inventory = () => {
// 	const navigate = useNavigate();
// 	const categories = [
// 		"Shirt", "T-Shirt", "Top", "Pants", "Jeans", "Trousers", "Dress"
// 	];
// 	const [products, setProducts] = useState<Product[]>([]);
// 	const [cartItems, setCartItems] = useState<Product[]>([]);

// 	useEffect(() => {
// 		fetch("https://dummyjson.com/products")
// 			.then(res => res.json())
// 			.then(data => setProducts(data.products))
// 			.catch(err => console.error("Error fetching products:", err));


// 		const savedCart = localStorage.getItem("cart");
// 		if (savedCart) {
// 			setCartItems(JSON.parse(savedCart));
// 		}
// 	}, []);

// 	const handleAddToCart = (product: Product) => {
// 		const updatedCart = [...cartItems, product];
// 		setCartItems(updatedCart);
// 		localStorage.setItem("cart", JSON.stringify(updatedCart));
// 	};

// 	const handleClearCart = () => {
// 		setCartItems([]);
// 		localStorage.removeItem("cart");
// 	};

// 	const handleRemoveItem = (id: number) => {
// 		const updatedCart = cartItems.filter(item => item.id !== id);
// 		setCartItems(updatedCart);
// 		localStorage.setItem("cart", JSON.stringify(updatedCart));
// 	};

// 	const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
// 	const discount = subtotal * 0.18;
// 	const tax = (subtotal - discount) * 0.08;
// 	const total = subtotal - discount + tax;

// 	const handleCheckout = () => {
// 		localStorage.setItem("totalAmount", total.toFixed(2));
// 		navigate("/bill")
// 	}

// 	return (
// 		<div className="h-screen">
// 			<Header />
// 			<div className="flex h-screen">
// 				<div className="w-2/3 flex flex-col">
// 					<SearchBar />
// 					<div className="px-8 -mt-5">
// 							<Link to="/" className="flex items-center">
// 								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
// 									<path d="M12.2665 1.98191C12.6666 1.58183 13.3186 1.59307 13.7047 2.0067L13.7437 2.04845C14.1096 2.44049 14.1011 3.05137 13.7244 3.43311L7.69142 9.54765C7.3072 9.93706 7.3072 10.5629 7.69142 10.9523L13.7244 17.0669C14.1011 17.4486 14.1096 18.0595 13.7437 18.4516L13.7047 18.4933C13.3186 18.9069 12.6666 18.9182 12.2665 18.5181L4.70554 10.9571C4.31502 10.5666 4.31502 9.93342 4.70554 9.54289L12.2665 1.98191Z" fill="#333333" />
// 								</svg>
// 								<span className="text-xl font-bold ml-2">INVENTORY</span>
// 							</Link>
// 						<div className="flex justify-between  items-center mt-4">
// 							<div className="flex gap-2 flex-wrap">
// 								{categories.map(item => (
// 									<div
// 										key={item}
// 										className="py-2 px-4 bg-(--primary) rounded-lg cursor-pointer text-sm font-medium"
// 									>
// 										{item}
// 									</div>
// 								))}
// 							</div>
// 							<div className="p-2 bg-[#E9DCCF] rounded-lg">
// 								<BsThreeDotsVertical />
// 							</div>
// 						</div>
// 					</div>
// 					<div className="flex-1 overflow-y-auto p-6 px-10 grid grid-cols-2 gap-4 scrollbar-hide">
// 						{products.map(product => (
// 							<div
// 								key={product.id}
// 								onClick={() => handleAddToCart(product)}
// 								className="flex justify-between items-center p-4 rounded-md bg-(--bgorder) shadow-sm hover:shadow-md cursor-pointer"
// 							>
// 								<div className="flex gap-4">
// 									<img
// 										src={product.thumbnail}
// 										alt={product.title}
// 										className="w-16 h-16 rounded-sm border object-cover"
// 									/>
// 									<div>
// 										<h3 className="font-semibold text-base">{product.title}</h3>
// 										<p className="text-sm text-gray-500">Size - 30 UK</p>
// 									</div>
// 								</div>
// 								<div className="text-sm font-semibold">${product.price.toFixed(2)}</div>
// 							</div>
// 						))}
// 					</div>
// 					<Link
// 						to="/requestinventory"
// 						className="flex items-center gap-1 font-medium text-black px-8 pb-4"
// 					>
// 						<span>Request Inventory</span>
// 						<svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
// 							<path
// 								d="M4.65207 1.55133C4.40515 1.30441 4.00273 1.31135 3.76447 1.56663C3.53864 1.80859 3.54387 2.18561 3.77633 2.42121L7.10737 5.79726C7.49159 6.18667 7.49159 6.81254 7.10737 7.20195L3.77633 10.578C3.54387 10.8136 3.53864 11.1906 3.76447 11.4326C4.00273 11.6879 4.40515 11.6948 4.65207 11.4479L8.89324 7.20672C9.28377 6.81619 9.28377 6.18303 8.89324 5.7925L4.65207 1.55133Z"
// 								fill="#333333"
// 							/>
// 						</svg>
// 					</Link>
// 				</div>
// 				<div className="w-1/2 bg-(--secondary) p-6 flex flex-col justify-between">
// 					<div>
// 						<div className="flex justify-center gap-3 mb-4">
// 							<button
// 								onClick={handleClearCart}
// 								className="bg-white w-full text-black py-2 px-4 rounded-md"
// 							>
// 								Clear cart
// 							</button>
// 							<button className="bg-(--main) w-full text-white  py-2 px-4 rounded-md">
// 								Hold this order
// 							</button>
// 						</div>
// 						<div className="flex-1 overflow-y-auto space-y-3 max-h-[225px] pr-2 scrollbar-hide">
// 							{cartItems.map((item) => (
// 								<div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-lg">
// 									<div className="flex gap-3 items-center">
// 										<img
// 											src={item.thumbnail}
// 											alt={item.title}
// 											className="w-12 h-12 rounded-sm object-cover"
// 										/>
// 										<div>
// 											<h4 className="font-medium text-sm">{item.title}</h4>
// 											<p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
// 										</div>
// 									</div>
// 									<button onClick={() => handleRemoveItem(item.id)} className="text-gray-500">
// 										<FaTrash />
// 									</button>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 					<div className="mt-6">
// 						<div className="flex justify-between items-center bg-white rounded-xl px-4 py-2 mb-4">
// 							<input
// 								type="text"
// 								placeholder="Discount"
// 								className="bg-white text-sm text-black placeholder-black focus:outline-none w-full"
// 							/>
// 							<button className="bg-(--buttonbg) text-sm font-semibold px-4 py-1.5 rounded-md ml-2">
// 								ADD
// 							</button>
// 						</div>
// 						<div className="text-sm space-y-2">
// 							<div className="flex justify-between">
// 								<span>Subtotal • {cartItems.length} items</span>
// 								<span>${subtotal.toFixed(2)}</span>
// 							</div>
// 							<div className="flex justify-between text-gray-500">
// 								<span>Discount (-18%)</span>
// 								<span>-${discount.toFixed(2)}</span>
// 							</div>
// 							<div className="text-xs text-gray-400">Regular customer discount</div>
// 							<div className="flex justify-between text-gray-500">
// 								<span>Tax (+8%)</span>
// 								<span>${tax.toFixed(2)}</span>
// 							</div>
// 							<div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
// 								<span>Total</span>
// 								<span>${total.toFixed(2)}</span>
// 							</div>
// 							<button onClick={handleCheckout} className="bg-(--main) w-full text-white font-semibold py-2 rounded-md block cursor-pointer text-center">
// 								CHECKOUT &gt;
// 							</button>
// 						</div>
// 						{/* <button className="bg-(--main) w-full text-white font-semibold py-2 rounded-md block text-center">
// 						<Link to="/bill">CHECKOUT &gt;</Link>
// 						</button> */}
// 					</div>
// 				</div>
// 			</div>

// 		</div>
// 	);
// };

// export default Inventory;