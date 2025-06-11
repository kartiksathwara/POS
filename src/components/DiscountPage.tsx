import Checkout from "./Checkout";
import SearchBar from "./SearchBar";
import Header from "./Header";
import { FaAngleLeft } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const discounts = [
	{ code: '#TP-520392-72', percent: '26%', reason: 'Regular Customer' },
	{ code: '#TP-520392-73', percent: '10%', reason: 'Loyal Customer' },
	{ code: '#TP-520392-74', percent: '2%', reason: 'Regular Customer' },
	{ code: '#TP-520392-75', percent: '12%', reason: 'Loyal Customer' },
	{ code: '#TP-520392-76', percent: '50%', reason: 'Special Customer' },
	{ code: '#TP-520392-77', percent: '18%', reason: 'Regular Customer' },
	{ code: '#TP-520392-78', percent: '8%', reason: 'Loyal Customer' },
	{ code: '#TP-520392-79', percent: '5%', reason: 'Regular Customer' }
];

const DiscountPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const subtotal = location.state?.subtotal || 0;

	useEffect(() => {
		localStorage.setItem("discounts", JSON.stringify(discounts));
	}, []);

	const handleCouponSelect = (code: string) => {
		localStorage.setItem("selectedCoupon", code);
		navigate(-1); 
	};

	return (
		<div className=" h-screen">
			<Header />
			<div className="flex">
				<div className="">
					<SearchBar />
					<div className="px-8">
						<div className="py-4">
							<h2 className="flex items-center text-xl font-semibold font-sans text-(--main) ">
								<Link to="/">
									<FaAngleLeft className="text-(--main)" />
								</Link>
								DISCOUNT
							</h2>
						</div>
						<div className="">
							<div className="overflow-x-auto  rounded-xl">
								<table className="w-full">
									<thead className="bg-(--main) text-white">
										<tr className="">
											<th className="p-2">Coupon Code</th>
											<th className="p-2">Percentage</th>
											<th className="p-2">Discount</th>
											<th className="p-2">Action</th>
										</tr>
									</thead>
									<tbody>
										{discounts.map((d, i) => (
											<tr key={i} className="bg-(--primary)/20 border-(--primary) border-b">
												<td className="p-2 text-center">{d.code}</td>
												<td className="p-2 text-center">{d.percent}</td>
												<td className="p-2 text-center">{d.reason}</td>
												<td className="p-2 text-center">
													<button
														onClick={() => handleCouponSelect(d.code)}
														className="bg-[var(--buttonbg)] text-sm font-semibold px-4 py-1.5 rounded-md"
													>
														Select
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<Checkout />
			</div>
		</div>
	);
};

export default DiscountPage;
