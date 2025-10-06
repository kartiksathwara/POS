import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import SearchBar from "./SearchBar";
import AddCustomerModal from "./AddCustomerModal";
import Checkout from "./Checkout";
import TableComp from "./TableComp/TableComp";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import fetchCustomers, { type customers } from "../hooks/fetchCustomers";

const Customers = () => {
  const { customers } = fetchCustomers();
  const [filteredCustomers, setFilteredCustomers] = useState<customers[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);

  const formattedData = filteredCustomers.map((c) => ({
    ...c,
    address: `${c.address} , ${c.city}, ${c.state}, ${c.country} ${c.zip}`,
  }));
  // console.log(filteredCustomers);
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredCustomers(customers);
      return;
    }

    const lowered = query.toLowerCase();
    const filtered = customers.filter(
      (item) =>
        item.name.toLowerCase().includes(lowered) ||
        item.phone.toLowerCase().includes(lowered)
    );
    setFilteredCustomers(filtered);
  };

  const handleAddCustomer = async (customerData: customers) => {
    try {
      const res = await fetch("http://localhost:5000/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Customer added successfully");
        setIsModalOpen(false);
        const updatedCustomers = await fetch("http://localhost:5000/api/customers").then(res => res.json());
  setFilteredCustomers(updatedCustomers);
      } else {
        alert(data.error || "Failed to add customer");
      }
    } catch (error) {
      console.error("Add customer failed:", error);
      alert("Something went wrong while adding customer.");
    }
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
