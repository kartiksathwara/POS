import { FaAngleDown, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"

const Header = () => {
	return (
		<div>
			<header className="bg-(--main) w-full p-8 py-3 font-semibold text-2xl flex justify-between">
				<div className="text-white">DKC</div>
				<div className="text-white">
					<div className="flex items-center text-xl text-white relative">
						<div className="relative group">
							<button className="flex items-center gap-2 px-4 py-2 rounded-xl  transition">
								<FaUser />
								<FaAngleDown className="transition-transform group-hover:rotate-180" />
							</button>

							<div className="absolute right-0 w-56 rounded-xl border shadow-xl overflow-hidden opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300">

								<div className="bg-(--primary)">
									<Link
										to=""
										className="block  px-4 py-3 text-lg text-black border-b-1 border-b-gray-400"
									>
										Profile
									</Link>
									<div className="p-2.5">
										<Link
											to=""
											className="block px-4 py-3 text-lg text-(--main) border-b-1 border-b-gray-400"
										>
											Orders
										</Link>
										<Link
											to=""
											className="block px-4 py-3 text-lg text-(--main) border-b-1 border-b-gray-400"
										>
											Activites
										</Link>
										<Link
											to="/requestinventory"
											className="block px-4 py-3 text-lg text-(--main) border-b-1 border-b-gray-400"
										>
											Request Inventory
										</Link>
										<Link
											to="/setting"
											className="block px-4 py-3 text-lg text-(--main) border-b-1 border-b-gray-400"
										>
											Settings
										</Link>
										<button
											className="w-full text-left px-4 py-3 text-lg text-(--main)"
										>
											Close shop
										</button>
									</div>
									<div />
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</div>
	)
}

export default Header