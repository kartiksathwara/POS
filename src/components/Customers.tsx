import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import SearchBar from "./SearchBar";
import AddCustomerModal from "./AddCustomerModal";
import Checkout from "./Checkout";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

export interface Customer {
	name: string;
	phone: string;
	email: string;
	address1: string;
	address2: string;
	country: string;
	state: string;
	city: string;
	zip: string;
}

const LOCAL_STORAGE_KEY = "customerData";

const Customers = () => {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const storedCustomers = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (storedCustomers) {
			setCustomers(JSON.parse(storedCustomers));
		}
	}, []);

	const handleAddCustomer = (customer: Customer) => {
		const updatedCustomers = [...customers, customer];
		setCustomers(updatedCustomers);
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCustomers));
	};

	const handleDeleteCustomer = (index: number) => {
		const updatedCustomers = [...customers];
		updatedCustomers.splice(index, 1);
		setCustomers(updatedCustomers);
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCustomers));
	};

	return (
		<div className="h-screen">
			<Header />
			<div className="flex flex-col lg:flex-row">
				<div>
					<SearchBar />
					<div className="flex flex-row pb-5 sm:flex-row justify-between items-center px-4 sm:px-8 gap-4 sm:gap-0">
						<Link to="/" className="flex items-center">
							<MdOutlineArrowBackIosNew className="size-5" />
							<span className="text-xl font-bold ml-1">CUSTOMERS</span>
						</Link>
						<button
							onClick={() => setIsModalOpen(true)}
							className="bg-(--buttonbg) py-1 px-4 rounded-lg font-semibold flex items-center"
						>
							Add Customer
							<IoIosArrowForward className="size-4 ml-1"/>
						</button>
					</div>

					<div className="overflow-auto h-95 scrollbar-hide rounded-2xl w-full lg:w-3xl ml-0 lg:ml-8">
						<table className="min-w-full text-left text-xs sm:text-sm text-gray-700">
							<thead className="bg-(--main) sticky top-0 w-3xl text-white rounded-t-2xl">
								<tr>
									<th className="px-6 py-4 font-medium">Customer name</th>
									<th className="px-6 py-4 font-medium">Phone no.</th>
									<th className="px-6 py-4 font-medium">Email</th>
									<th className="px-6 py-4 font-medium">Address</th>
									<th className="px-6 py-4 font-medium">Delete</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-(--primary) bg-(--primary)/10">
								{customers.map((customer, index) => (
									<tr key={index} className="">
										<td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
										<td className="px-6 py-4 whitespace-nowrap">{customer.phone}</td>
										<td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
										<td className="px-6 py-4">
											{customer.address1}, {customer.address2}, {customer.city}, {customer.state}, {customer.country} {customer.zip}
										</td>
										<button
											onClick={() => handleDeleteCustomer(index)}
											className="text-red-500 font-semibold"
										>
											Delete
										</button>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<Checkout />
			</div>

			<AddCustomerModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSave={handleAddCustomer}
			/>
		</div>
	);
};

export default Customers;
