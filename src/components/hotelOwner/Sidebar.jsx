import { MdDashboard, MdOutlinePlaylistAdd } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const sidebarLinks = [
    {
      name: "Dashboard",
      path: "/owner",
      icon: <MdDashboard />,
    },
    {
      name: "Add Rooms",
      path: "/owner/add-room",
      icon: <MdOutlinePlaylistAdd />,
    },
    {
      name: "List Rooms",
      path: "/owner/list-room",
      icon: <FaListUl />,
    },
  ];
  return (
    <div className="md:w-64 w-16 border-r h-full text-base border-gray-400 pt-4 flex flex-col transition-all duration-300">
      {sidebarLinks.map((link, index) => (
        <NavLink
          to={link.path}
          key={index}
          end="/owner"
          className={({ isActive }) =>
            `flex items-center gap-4 py-2 px-6 md:px-8 ${
              isActive
                ? "border-r-4 border-indigo-500 md:border-r-[6px] bg-gray-200 text-gray-900"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"
            }`
          }
        >
          {/* <img src={link.icon} alt={link.name} className="min-h-6 min-w-6" /> */}
          <span className="text-2xl">{link.icon}</span>
          <p className="md:block hidden text-center">{link.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
