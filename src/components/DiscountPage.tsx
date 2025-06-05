import Checkout from "./Checkout";
import SearchBar from "./SearchBar";
import Header from "./Header";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
	return (
		<div className=" h-screen">
			<Header />
			<div className="flex">
				<div className="">
					<SearchBar />
					<div className="px-8">
						<div className="">
							<div className="py-4 -ml-1.5 -mb-2">
								<h2 className="flex items-center text-xl font-semibold font-sans -mt-8 text-(--main) "><Link to="/"><FaAngleLeft className="text-(--main)" /></Link>DISCOUNT</h2>
							</div >

							<div className="overflow-x-auto rounded-xl -ml-0.5">
								<table className="w-full">
									<thead className="bg-(--main) text-white">
										<tr className="">
											<th className="p-2">Coupon Code</th>
											<th className="p-2">Percentage</th>
											<th className="p-2">Discount</th>
										</tr>
									</thead>
									<tbody>
										{discounts.map((d, i) => (
											<tr key={i} className="bg-(--primary)/20 border-(--primary) border-b">
												<td className="p-2 text-center">{d.code}</td>
												<td className="p-2 text-center">{d.percent}</td>
												<td className="p-2 text-center">{d.reason}</td>
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

	)
}

export default DiscountPage;