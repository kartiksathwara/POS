import { Link } from "react-router-dom"

const Checkout = () => {
	return (

		<div className="w-1/2 p-5 bg-(--secondary) flex h-[calc(100vh-3.5rem)] flex-col ">
			<div className="flex justify-center p-3 font-serif gap-3 mb-4">
				<button className="bg-white text-black  w-full py-2 px-4 rounded-md ">
					Clear cart
				</button>
				<button className="bg-(--main) text-white  w-full py-2 px-4 rounded-md ">
					Hold this order
				</button>
			</div>
			<div className="flex-grow flex items-center justify-center border-t border-b border-[--main] mb-4">
				<div className="text-gray-500 text-center text-sm">
					Add product manually or via scanner
				</div>
			</div>
			<button className="bg-(--main) text-white font-semibold py-2 rounded-md block text-center">
				 <Link to="/bill">CHECKOUT &gt;</Link>
			</button>
		</div>
	)
}

export default Checkout