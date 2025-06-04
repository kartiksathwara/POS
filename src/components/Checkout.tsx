
const Checkout = () => {
	return (
		
			<div className="w-1/2 p-5 bg-(--secondary) flex h-[calc(100vh-3.5rem)] flex-col "> 
				<div className="flex justify-between p-3 font-serif mb-4">
					<button className="bg-white text-black font-semibold py-2 px-4 rounded-md ">
						Clear cart
					</button>
					<button className="bg-(--main) text-white font-semibold py-2 px-4 rounded-md ">
						Hold this order
					</button>
				</div>
				<div className="flex-grow border-t border-b border-(--main) mb-4">
					<div className="text-gray-500 text-center">Add product manually or via scanner</div>
				</div>
				<button className="bg-(--main) text-white font-semibold py-2 rounded-md block text-center">
					CHECKOUT &gt;
				</button>
			</div>
	)
}

export default Checkout