import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import SearchBar from "./SearchBar";
import AddCustomerModal from "./AddCustomerModal";
import Checkout from "./Checkout";
import TableComp from "./TableComp/TableComp";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

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
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedCustomers = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCustomers) {
      const parsed = JSON.parse(storedCustomers);
      setCustomers(parsed);
      setFilteredCustomers(parsed);
    }
  }, []);

  const handleAddCustomer = (customer: Customer) => {
    const updatedCustomers = [...customers, customer];
    setCustomers(updatedCustomers);
    setFilteredCustomers(updatedCustomers);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCustomers));
  };

  const formattedData = filteredCustomers.map((c) => ({
    ...c,
    address: `${c.address1}, ${c.address2}, ${c.city}, ${c.state}, ${c.country} ${c.zip}`,
  }));

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredCustomers(customers);
      return;
    }

    const lowered = query.toLowerCase();
    const filtered = customers.filter(
      (item) =>
        item.name.toLowerCase().includes(lowered) ||
        item.email.toLowerCase().includes(lowered)
    );
    setFilteredCustomers(filtered);
  };

  const columns = [
    { Header: "Customer name", accessor: "name" },
    { Header: "Phone no.", accessor: "phone" },
    { Header: "Email", accessor: "email" },
    { Header: "Address", accessor: "address" },
  ];

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <div className="relative flex-1 overflow-y-auto p-4 flex flex-col items-center gap-4">
          <SearchBar onSearch={handleSearch} />
          <div className="flex w-full justify-between items-center px-4">
            <Link to="/" className="flex items-center">
              <MdOutlineArrowBackIosNew />
              <span className="text-xl font-bold ml-2">CUSTOMERS</span>
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-(--buttonbg) py-1 px-4 rounded-lg font-semibold flex items-center hover:cursor-pointer"
            >
              Add Customer
              <span className="ml-2">
                <IoIosArrowForward />
              </span>
            </button>
          </div>

          <div className="overflow-x-auto w-[93%] max-h-[65vh] scrollbar-hide ml-0 shadow-md rounded-xl">
            <TableComp columns={columns} data={formattedData} />
          </div>
        </div>

        <div className="w-full lg:w-[30%] bg-(--secondary) hidden lg:flex flex-col justify-between max-h-full p-4 overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-200">
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
