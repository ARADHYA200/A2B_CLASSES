import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from "axios";
import { FaUserGraduate, FaChalkboardTeacher, FaLayerGroup, FaChartBar } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatCard = ({ title, value, icon: Icon, color }) => {
  const IconComponent = Icon;

  return (
    <div
      className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl ${color}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <IconComponent className="text-2xl text-white" />
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  const [stats, setStats] = useState({ students: 0, teachers: 0, batches: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, teachersRes, batchesRes] = await Promise.all([
          axios.get("http://127.0.0.1:5000/students/"),
          axios.get("http://127.0.0.1:5000/teachers"),
          axios.get("http://127.0.0.1:5000/batches")
        ]);
        setStats({
          students: studentsRes.data.length,
          teachers: teachersRes.data.length,
          batches: batchesRes.data.length
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, []);

  const chartData = {
    labels: ["Students", "Teachers", "Batches"],
    datasets: [
      {
        label: "Count",
        data: [stats.students, stats.teachers, stats.batches],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)"
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)"
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
          font: {
            size: 14,
            weight: "bold"
          }
        }
      },
      title: {
        display: true,
        text: "A2B Classes Overview",
        color: "white",
        font: {
          size: 20,
          weight: "bold"
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
          font: {
            size: 12
          }
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)"
        }
      },
      x: {
        ticks: {
          color: "white",
          font: {
            size: 12
          }
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)"
        }
      },
    },
  };

  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Dashboard 📊
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value={stats.students}
          icon={FaUserGraduate}
          color="hover:shadow-blue-500/25"
        />
        <StatCard
          title="Total Teachers"
          value={stats.teachers}
          icon={FaChalkboardTeacher}
          color="hover:shadow-green-500/25"
        />
        <StatCard
          title="Total Batches"
          value={stats.batches}
          icon={FaLayerGroup}
          color="hover:shadow-yellow-500/25"
        />
      </div>

      <div
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <FaChartBar className="text-2xl text-blue-400" />
          <h3 className="text-2xl font-bold text-white">Statistics Overview</h3>
        </div>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default Dashboard;