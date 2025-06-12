import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import SearchBar from "./SearchBar";
import AddCustomerModal from "./AddCustomerModal";
import Checkout from "./Checkout";

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

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-col lg:flex-row flex-1 ">
        <div className="relative flex-1 overflow-y-auto p-2 flex flex-col items-center gap-4 scrollbar-hide">
          <SearchBar />
          <div className="flex w-full justify-between items-center px-4">
            <Link to="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M12.2665 1.98191C12.6666 1.58183 13.3186 1.59307 13.7047 2.0067L13.7437 2.04845C14.1096 2.44049 14.1011 3.05137 13.7244 3.43311L7.69142 9.54765C7.3072 9.93706 7.3072 10.5629 7.69142 10.9523L13.7244 17.0669C14.1011 17.4486 14.1096 18.0595 13.7437 18.4516L13.7047 18.4933C13.3186 18.9069 12.6666 18.9182 12.2665 18.5181L4.70554 10.9571C4.31502 10.5666 4.31502 9.93342 4.70554 9.54289L12.2665 1.98191Z"
                  fill="#333333"
                />
              </svg>
              <span className="text-xl font-bold ml-2">CUSTOMERS</span>
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-(--buttonbg) py-1 px-4 rounded-lg font-semibold flex items-center hover:cursor-pointer"
            >
              Add Customer
              <span className="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                >
                  <path
                    d="M4.65207 1.55133C4.40515 1.30441 4.00273 1.31135 3.76447 1.56663C3.53864 1.80859 3.54387 2.18561 3.77633 2.42121L7.10737 5.79726C7.49159 6.18667 7.49159 6.81254 7.10737 7.20195L3.77633 10.578C3.54387 10.8136 3.53864 11.1906 3.76447 11.4326C4.00273 11.6879 4.40515 11.6948 4.65207 11.4479L8.89324 7.20672C9.28377 6.81619 9.28377 6.18303 8.89324 5.7925L4.65207 1.55133Z"
                    fill="#333333"
                  />
                </svg>
              </span>
            </button>
          </div>

          <div className="overflow-x-auto w-[93%] ml-0  shadow-md rounded-xl scrollbar-hide">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-(--main) text-white">
                <tr>
                  <th className="px-6 py-4 font-medium">Customer name</th>
                  <th className="px-6 py-4 font-medium">Phone no.</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Address</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {customers.map((customer, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4">
                      {customer.address1}, {customer.address2}, {customer.city},{" "}
                      {customer.state}, {customer.country} {customer.zip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full lg:w-[30%] max-h-full overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-200">
          <Checkout />
        </div>
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


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Header from "./Header";
// import SearchBar from "./SearchBar";
// import AddCustomerModal from "./AddCustomerModal";
// import Checkout from "./Checkout";
// import { MdOutlineArrowBackIosNew } from "react-icons/md";
// import { IoIosArrowForward } from "react-icons/io";

// export interface Customer {
// 	name: string;
// 	phone: string;
// 	email: string;
// 	address1: string;
// 	address2: string;
// 	country: string;
// 	state: string;
// 	city: string;
// 	zip: string;
// }

// const LOCAL_STORAGE_KEY = "customerData";

// const Customers = () => {
// 	const [customers, setCustomers] = useState<Customer[]>([]);
// 	const [isModalOpen, setIsModalOpen] = useState(false);

// 	useEffect(() => {
// 		const storedCustomers = localStorage.getItem(LOCAL_STORAGE_KEY);
// 		if (storedCustomers) {
// 			setCustomers(JSON.parse(storedCustomers));
// 		}
// 	}, []);

// 	const handleAddCustomer = (customer: Customer) => {
// 		const updatedCustomers = [...customers, customer];
// 		setCustomers(updatedCustomers);
// 		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCustomers));
// 	};

// 	const handleDeleteCustomer = (index: number) => {
// 		const updatedCustomers = [...customers];
// 		updatedCustomers.splice(index, 1);
// 		setCustomers(updatedCustomers);
// 		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCustomers));
// 	};

// 	return (
// 		<div className="h-screen">
// 			<Header />
// 			<div className="flex flex-col lg:flex-row">
// 				<div>
// 					<SearchBar />
// 					<div className="flex flex-row pb-5 sm:flex-row justify-between items-center px-4 sm:px-8 gap-4 sm:gap-0">
// 						<Link to="/" className="flex items-center">
// 							<MdOutlineArrowBackIosNew className="size-5" />
// 							<span className="text-xl font-bold ml-1">CUSTOMERS</span>
// 						</Link>
// 						<button
// 							onClick={() => setIsModalOpen(true)}
// 							className="bg-(--buttonbg) py-1 px-4 rounded-lg font-semibold flex items-center"
// 						>
// 							Add Customer
// 							<IoIosArrowForward className="size-4 ml-1"/>
// 						</button>
// 					</div>

// 					<div className="overflow-auto h-95 scrollbar-hide rounded-2xl w-full lg:w-3xl ml-0 lg:ml-8">
// 						<table className="min-w-full text-left text-xs sm:text-sm text-gray-700">
// 							<thead className="bg-(--main) sticky top-0 w-3xl text-white rounded-t-2xl">
// 								<tr>
// 									<th className="px-6 py-4 font-medium">Customer name</th>
// 									<th className="px-6 py-4 font-medium">Phone no.</th>
// 									<th className="px-6 py-4 font-medium">Email</th>
// 									<th className="px-6 py-4 font-medium">Address</th>
// 									<th className="px-6 py-4 font-medium">Delete</th>
// 								</tr>
// 							</thead>

// 							<tbody className="divide-y divide-(--primary) bg-(--primary)/10">
// 								{customers.map((customer, index) => (
// 									<tr key={index} className="">
// 										<td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
// 										<td className="px-6 py-4 whitespace-nowrap">{customer.phone}</td>
// 										<td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
// 										<td className="px-6 py-4">
// 											{customer.address1}, {customer.address2}, {customer.city}, {customer.state}, {customer.country} {customer.zip}
// 										</td>
// 										<button
// 											onClick={() => handleDeleteCustomer(index)}
// 											className="text-red-500 font-semibold"
// 										>
// 											Delete
// 										</button>
// 									</tr>
// 								))}
// 							</tbody>
// 						</table>
// 					</div>
// 				</div>
// 				<Checkout />
// 			</div>

// 			<AddCustomerModal
// 				isOpen={isModalOpen}
// 				onClose={() => setIsModalOpen(false)}
// 				onSave={handleAddCustomer}
// 			/>
// 		</div>
// 	);
// };

// export default Customers;