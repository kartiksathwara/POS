import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Header from "./Header";

export interface Activities {
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

const Activities = () => {
  const [loginTime, setLoginTime] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [collection, setCollection] = useState<any[]>([]);
  const [filteredCollection, setFilteredCollection] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    const filtered = collection.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCollection(filtered);
  };

  useEffect(() => {
    const loginTimestamp = localStorage.getItem("tokenLoginTime");
    const userData = localStorage.getItem("User");

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser.name || "Unknown");
      } catch (error) {
        console.error("Error parsing User data from localStorage:", error);
      }
    }

    if (loginTimestamp) {
      const parsedTimestamp = parseInt(loginTimestamp);
      if (!isNaN(parsedTimestamp)) {
        const loginDate = new Date(parsedTimestamp);
        setLoginTime(loginDate.toLocaleString());
      }
    }
  }, []);

  useEffect(() => {
    const dummyData = [
      { name: "Elara Gown", price: "$550.00", status: "Ongoing" },
      { name: "Nadine Merabi", price: "$420.00", status: "Completed" },
      { name: "Kids wear", price: "$350.00", status: "Rejected" },
      { name: "qwert", price: "$350.00", status: "Ongoing" },
      { name: "pooty", price: "$30.00", status: "Rejected" },
      { name: "hjklk", price: "$650.00", status: "Rejected" },
      { name: "asdfkj", price: "$90.00", status: "Completed" },
    ];
    setCollection(dummyData);
    setFilteredCollection(dummyData);
  }, []);

  return (
    <div className="h-screen flex flex-col">  
      <Header />
      <div className="flex flex-col gap-4 p-4 overflow-hidden">
        <SearchBar onSearch={handleSearch} />
        <div className="flex items-center gap-2">
          <Link to="/" className="">
            <IoIosArrowBack size={20} />
          </Link>
          <h1 className="text-xl capitalize font-bold">ACTIVITIES</h1>
        </div>
        <div className="flex flex-col gap-3 overflow-y-scroll scrollbar-hide rounded-xl">
          <div className="flex justify-between p-2 bg-(--bgorder) rounded-xl">
            <p>{user}</p>
            <p>Login:{loginTime}</p>
          </div>
          {filteredCollection.map((item, index) => (
            <div
              key={index}
              className="flex justify-between p-2 bg-(--bgorder) rounded-2xl"
            >
              <div className="flex gap-3">
                <img alt="image" className="aspect-auto" />
                <div className="flex flex-col gap-2">
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p>16/06/25 • 12:01 PM</p>
                <button
                  className={`py-2 px-6 rounded-2xl ${
                    item.status === "Completed"
                      ? "bg-(--completed)"
                      : item.status === "Ongoing"
                      ? "bg-(--ongoing)"
                      : "bg-(--rejected)"
                  }`}
                >
                  {item.status}
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between p-2 bg-(--bgorder) rounded-2xl">
            <div className="flex flex-col gap-3">
              <p>Winter Collection</p>
              <p className="px-8 py-2 text-center bg-(--secondary) rounded-xl">
                10
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p>16/06/25 • 12:01 PM</p>
              <button className="py-2 px-6 rounded-2xl bg-(--completed)">
                completed
              </button>
            </div>
          </div>
          <div className="flex justify-between p-2 bg-(--bgorder) rounded-2xl">
            <div className="flex flex-col gap-3">
              <p>Bag</p>
              <p className="px-8 py-2 text-center bg-(--secondary) rounded-xl">
                800
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p>16/06/25 • 12:01 PM</p>
              <button className="py-2 px-6 rounded-2xl bg-(--completed)">
                completed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
