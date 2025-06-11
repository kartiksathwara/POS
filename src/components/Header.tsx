import { useState } from "react"
import { FaAngleDown, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"


const Header = () => {
	const [menuopen, setMenuOpen] = useState(false);
	return (
		<div>
			<header className="bg-(--main) w-full p-8 py-3 font-semibold text-2xl flex justify-between">
				<Link to="/">
					<div className="text-white">DKC</div>
				</Link>
				<div className="text-white">
					<div className="flex items-center text-xl text-white relative">
						<div className="relative">
							<button className="flex items-center gap-2 px-0 py-2 rounded-xl  transition"
							 onClick={() => setMenuOpen(!menuopen)}>
								<FaUser />
								<FaAngleDown className={`transition-transform ${menuopen ? "rotate-180" : ""}`} />

							</button>

							{menuopen && (

								<div className="absolute lg:right-0 -right-6 w-56 rounded-xl border shadow-xl overflow-hidden z-50 bg-(--primary) transition-all duration-300">

									<div className="bg-(--primary)">
										<Link
											to=""
											className="block px-4 py-3 text-lg text-black border-b-1 border-b-gray-400 hover:bg-gray-100"
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
											<Link to="/lock" className="block px-4 py-1.5 text-lg text-(--main) border-b-gray-400">
												Close shop
											</Link>
										</div>
										<div />
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</header>
		</div>
	)
}

export default Header


// import { useState } from "react";
// import { FaAngleDown, FaUser } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Header = () => {
// 	const [menuopen, setMenuOpen] = useState(false);

// 	return (
// 		<div>
// 			<header className="bg-[var(--main)] w-full p-8 py-3 font-semibold text-2xl flex justify-between">
// 				<Link to="/">
// 					<div className="text-white">DKC</div>
// 				</Link>
// 				<div className="text-white">
// 					<div className="flex items-center text-xl relative">
// 						<div className="relative">
// 							<button
// 								className="flex items-center gap-2 px-0 py-2 rounded-xl transition"
// 								onClick={() => setMenuOpen(!menuopen)}
// 							>
// 								<FaUser />
// 								<FaAngleDown className={`transition-transform ${menuopen ? "rotate-180" : ""}`} />
// 							</button>

// 							{menuopen && (
// 								<div className="absolute right-0 w-56 mt-2 rounded-xl border shadow-xl bg-[var(--primary)] z-50 transition-all duration-300">
// 									<Link
// 										to=""
// 										className="block px-4 py-3 text-lg text-black border-b border-gray-300 hover:bg-gray-100"
// 									>
// 										Profile
// 									</Link>
// 									<div className="p-2.5">
// 										<Link
// 											to=""
// 											className="block px-4 py-3 text-lg text-[var(--main)] border-b border-gray-300"
// 										>
// 											Orders
// 										</Link>
// 										<Link
// 											to=""
// 											className="block px-4 py-3 text-lg text-[var(--main)] border-b border-gray-300"
// 										>
// 											Activities
// 										</Link>
// 										<Link
// 											to="/requestinventory"
// 											className="block px-4 py-3 text-lg text-[var(--main)] border-b border-gray-300"
// 										>
// 											Request Inventory
// 										</Link>
// 										<Link
// 											to="/setting"
// 											className="block px-4 py-3 text-lg text-[var(--main)] border-b border-gray-300"
// 										>
// 											Settings
// 										</Link>
// 										<Link
// 											to="/lock"
// 											className="block px-4 py-2 text-lg text-[var(--main)]"
// 										>
// 											Close Shop
// 										</Link>
// 									</div>
// 								</div>
// 							)}
// 						</div>
// 					</div>
// 				</div>
// 			</header>
// 		</div>
// 	);
// };

// export default Header;
