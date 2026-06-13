import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { FaPlus, FaEdit, FaSearch, FaTrash, FaUser } from "react-icons/fa";

const GlassCard = ({ children, className = "" }) => (
  <div
    className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
  >
    {children}
  </div>
);

const GlassInput = ({ placeholder, value, onChange, className = "" }) => (
  <input
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${className}`}
  />
);

const GlassButton = ({ children, onClick, variant = "primary", className = "" }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
      variant === "primary"
        ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
        : variant === "danger"
        ? "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl"
        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
    } ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </button>
);

function Students({ subPage }) {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/students/");
      setData(res.data);
    } catch {
      showToast("Failed to fetch students", "error");
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
    };
    void loadData();
  }, [fetchData]);

  // ADD
  const addStudent = async () => {
    if (!form.first_name) {
      showToast("Please enter first name", "error");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:5000/students/", {
        first_name: form.first_name,
        last_name: form.last_name || "NA",
        city: form.city || "NA"
      });
      fetchData();
      setForm({});
      showToast("Student added successfully!");
    } catch {
      showToast("Failed to add student", "error");
    }
  };

  // DELETE
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/students/${id}`);
      fetchData();
      showToast("Student deleted successfully!");
    } catch {
      showToast("Failed to delete student", "error");
    }
  };

  // UPDATE
  const updateStudent = async () => {
    if (!form.id || !form.first_name) {
      showToast("Please enter ID and new name", "error");
      return;
    }

    try {
      await axios.put(`http://127.0.0.1:5000/students/${form.id}`, {
        first_name: form.first_name,
        last_name: form.last_name || "NA",
        city: form.city || "NA"
      });
      fetchData();
      setForm({});
      showToast("Student updated successfully!");
    } catch {
      showToast("Failed to update student", "error");
    }
  };

  // ================= UI =================

  if (subPage === "add") {
    return (
      <div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Add Student
        </h2>

        <GlassCard className="max-w-md">
          <div className="space-y-4">
            <GlassInput
              placeholder="First Name"
              value={form.first_name || ""}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            />
            <GlassInput
              placeholder="Last Name"
              value={form.last_name || ""}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            />
            <GlassInput
              placeholder="City"
              value={form.city || ""}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <GlassButton onClick={addStudent}>
              <FaPlus className="inline mr-2" /> Add Student
            </GlassButton>
          </div>
        </GlassCard>

        {toast.show && (
          <div
            className={`fixed top-4 right-4 p-4 rounded-xl shadow-2xl ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            {toast.message}
          </div>
        )}
      </div>
    );
  }

  if (subPage === "update") {
    return (
      <div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Update Student
        </h2>

        <GlassCard className="max-w-md">
          <div className="space-y-4">
            <GlassInput
              placeholder="Student ID"
              value={form.id || ""}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
            />
            <GlassInput
              placeholder="New First Name"
              value={form.first_name || ""}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            />
            <GlassInput
              placeholder="New Last Name"
              value={form.last_name || ""}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            />
            <GlassInput
              placeholder="New City"
              value={form.city || ""}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <GlassButton onClick={updateStudent}>
              <FaEdit className="inline mr-2" /> Update Student
            </GlassButton>
          </div>
        </GlassCard>

        {toast.show && (
          <div
            className={`fixed top-4 right-4 p-4 rounded-xl shadow-2xl ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            {toast.message}
          </div>
        )}
      </div>
    );
  }

  if (subPage === "search") {
    const filteredData = data.filter(s =>
      s.FIRST_NAME?.toLowerCase().includes(search.toLowerCase()) ||
      s.LAST_NAME?.toLowerCase().includes(search.toLowerCase()) ||
      s.CITY?.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Search Students
        </h2>

        <GlassCard className="mb-8">
          <GlassInput
            placeholder="Search by name or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((s, index) => (
            <GlassCard key={s.ID_NO || index}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{s.FIRST_NAME} {s.LAST_NAME}</h3>
                  <p className="text-gray-300">{s.CITY}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">ID: {s.ID_NO}</p>
            </GlassCard>
          ))}
        </div>

        {filteredData.length === 0 && search && (
          <GlassCard>
            <p className="text-center text-gray-400">No students found matching "{search}"</p>
          </GlassCard>
        )}

        {toast.show && (
          <div
            className={`fixed top-4 right-4 p-4 rounded-xl shadow-2xl ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            {toast.message}
          </div>
        )}
      </div>
    );
  }

  // DEFAULT = ALL
  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-cyan-500 bg-clip-text text-transparent">
        All Students
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((s, index) => (
          <GlassCard key={s.ID_NO || index}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <FaUser className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{s.FIRST_NAME} {s.LAST_NAME}</h3>
                <p className="text-gray-300">{s.CITY}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">ID: {s.ID_NO}</p>
            <GlassButton
              onClick={() => deleteStudent(s.ID_NO)}
              variant="danger"
              className="w-full"
            >
              <FaTrash className="inline mr-2" /> Delete
            </GlassButton>
          </GlassCard>
        ))}
      </div>

      {data.length === 0 && (
        <GlassCard>
          <p className="text-center text-gray-400">No students found</p>
        </GlassCard>
      )}

      {toast.show && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-xl shadow-2xl ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default Students;