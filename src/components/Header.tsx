import { useState, useEffect, useRef } from "react";
import { FaAngleDown, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuopen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <header className="bg-(--main) w-full p-8 py-3 font-semibold text-2xl flex justify-between">
        <Link to="/">
          <div className="text-white">DKC</div>
        </Link>

        <div className="text-white">
          <div className="flex items-center text-xl text-white relative">

            {/* REF ADDED HERE */}
            <div className="relative" ref={menuRef}>
              <button
                className="flex items-center gap-2 px-0 py-2 rounded-xl transition"
                onClick={() => setMenuOpen(!menuopen)}
              >
                <FaUser />
                <FaAngleDown className={`transition-transform ${menuopen ? "rotate-180" : ""}`} />
              </button>

              {menuopen && (
                <div className="absolute lg:right-0 -right-6 w-56 rounded-xl border shadow-xl overflow-hidden z-50 bg-(--primary) transition-all duration-300">
                  <div className="bg-(--primary)">
                    <Link to="" className="block px-4 py-3 text-lg text-black border-b border-gray-400 hover:bg-gray-100">
                      Profile
                    </Link>

                    <div className="p-2.5">
                      <Link to="/order" className="block px-4 py-3 text-lg text-(--main) border-b border-gray-400">
                        Orders
                      </Link>
                      <Link to="/activities" className="block px-4 py-3 text-lg text-(--main) border-b border-gray-400">
                        Activities
                      </Link>
                      <Link to="/request" className="block px-4 py-3 text-lg text-(--main) border-b border-gray-400">
                        Request Inventory
                      </Link>
                      <Link to="/setting" className="block px-4 py-3 text-lg text-(--main) border-b border-gray-400">
                        Settings
                      </Link>
                      <Link to="/lock" className="block px-4 py-1.5 text-lg border-b text-(--main) border-gray-400">
                        Close shop
                      </Link>
                      <Link to="/hold-order" className="block px-4 py-1.5 text-lg text-(--main)">
                        Hold Order
                      </Link>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
