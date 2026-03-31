import { useRef, useEffect } from "react";
const NAV_ITEMS = [
  { icon: "◈", label: "Dashboard" },
  { icon: "◫", label: "Orders" },
  { icon: "◉", label: "Users" },
  { icon: "⬡", label: "Products" },
  { icon: "◎", label: "Reports" },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AdminSidebar = ({ isOpen, onClose }: Props) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" />
      )}

      <aside
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-full w-[240px] bg-[#3D2314] z-50
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C8A882] to-[#8B6F5E] flex items-center justify-center text-white font-bold">
            D
          </div>
          <span className="text-white font-bold">DKC Admin</span>
        </div>

        <nav className="mt-4">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-4 py-3 text-sm text-[#E9DCCF]/70 hover:bg-white/5 cursor-pointer"
            >
              <span>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;