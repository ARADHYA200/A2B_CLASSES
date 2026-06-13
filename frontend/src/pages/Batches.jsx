import axios from "axios";
import { useEffect, useState } from "react";
import { FaLayerGroup, FaSearch, FaCalendarAlt, FaClock, FaRupeeSign } from "react-icons/fa";

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
    className={`w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${className}`}
  />
);

function Batches() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/batches");
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch batches:", error);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter(b =>
    b.NAME_OF_BATCH?.toLowerCase().includes(search.toLowerCase()) ||
    b.CATEGORY?.toLowerCase().includes(search.toLowerCase()) ||
    b.SESSION?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        Batches 📚
      </h2>

      <GlassCard className="mb-8">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <GlassInput
            placeholder="Search batches by name, category, or session..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12"
          />
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((b, index) => (
          <GlassCard key={b.ID || index}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <FaLayerGroup className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{b.NAME_OF_BATCH}</h3>
                <p className="text-gray-300">{b.CATEGORY}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <FaClock className="text-xs" />
                <span>{b.SESSION}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <FaRupeeSign className="text-xs" />
                <span>{b.FEE}</span>
              </div>
              {b.START_DATE && (
                <div className="flex items-center gap-2 text-gray-400">
                  <FaCalendarAlt className="text-xs" />
                  <span>Starts: {b.START_DATE}</span>
                </div>
              )}
              <p className="text-gray-400">ID: {b.ID}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      {filteredData.length === 0 && search && (
        <GlassCard>
          <p className="text-center text-gray-400">No batches found matching "{search}"</p>
        </GlassCard>
      )}

      {filteredData.length === 0 && !search && (
        <GlassCard>
          <p className="text-center text-gray-400">No batches found</p>
        </GlassCard>
      )}
    </div>
  );
}

export default Batches;