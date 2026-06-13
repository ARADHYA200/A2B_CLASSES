import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaLayerGroup,
  FaTachometerAlt,
  FaChevronDown,
  FaChevronRight,
  FaPlus,
  FaEdit,
  FaSearch,
  FaList
} from "react-icons/fa";

function Sidebar({ setPage, setSubPage, activePage, activeSubPage }) {
  const [studentsOpen, setStudentsOpen] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: FaTachometerAlt,
      onClick: () => setPage("dashboard")
    },
    {
      id: "students",
      label: "Students",
      icon: FaUserGraduate,
      hasSubmenu: true,
      isOpen: studentsOpen,
      toggle: () => setStudentsOpen(!studentsOpen),
      submenu: [
        { id: "add", label: "Add Student", icon: FaPlus, onClick: () => { setPage("students"); setSubPage("add"); } },
        { id: "update", label: "Update Student", icon: FaEdit, onClick: () => { setPage("students"); setSubPage("update"); } },
        { id: "search", label: "Search Students", icon: FaSearch, onClick: () => { setPage("students"); setSubPage("search"); } },
        { id: "all", label: "All Students", icon: FaList, onClick: () => { setPage("students"); setSubPage("all"); } }
      ]
    },
    {
      id: "teachers",
      label: "Teachers",
      icon: FaChalkboardTeacher,
      onClick: () => setPage("teachers")
    },
    {
      id: "batches",
      label: "Batches",
      icon: FaLayerGroup,
      onClick: () => setPage("batches")
    }
  ];

  return (
    <div className="w-64 h-screen bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 shadow-2xl">
      <h1
        className="text-3xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        A2B 🚀
      </h1>

      <div className="space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <div key={item.id}>
              <div
                className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-white/20 shadow-lg border border-white/30"
                    : "hover:bg-white/10 hover:shadow-md"
                }`}
                onClick={item.hasSubmenu ? item.toggle : item.onClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="text-xl" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.hasSubmenu && (
                  <div
                    animate={{ rotate: item.isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-sm" />
                  </div>
                )}
              </div>

              <AnimatePresence>
                {item.hasSubmenu && item.isOpen && (
                  <div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-6 mt-2 space-y-2 overflow-hidden"
                  >
                    {item.submenu.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = activeSubPage === subItem.id;

                      return (
                        <div
                          key={subItem.id}
                          className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all duration-300 ${
                            isSubActive
                              ? "bg-white/15 shadow-md border border-white/20"
                              : "hover:bg-white/5"
                          }`}
                          onClick={subItem.onClick}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <SubIcon className="text-sm" />
                          <span className="text-sm font-medium">{subItem.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;