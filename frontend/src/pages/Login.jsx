import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";

const GlassInput = ({ placeholder, value, onChange, type = "text", icon: Icon, className = "" }) => (
  <div className="relative">
    {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-4 ${Icon ? 'pl-12' : 'pl-4'} pr-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${className}`}
    />
  </div>
);

const GlassButton = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full p-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {children}
  </button>
);

function Login({ setAuth }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (user === "admin" && password === "admin") {
      setAuth(true);
    } else {
      // Simple shake animation for wrong credentials
      const loginCard = document.getElementById("login-card");
      if (loginCard) {
        loginCard.style.animation = "shake 0.5s";
        setTimeout(() => {
          loginCard.style.animation = "";
        }, 500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-black flex items-center justify-center p-4">
      <div
        id="login-card"
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
      >
        <div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-400">Sign in to A2B Classes Dashboard</p>
        </div>

        <div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <GlassInput
            placeholder="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            icon={FaUser}
          />
          <GlassInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={FaLock}
          />

          <GlassButton onClick={login}>
            <FaLock className="inline mr-2" /> Sign In
          </GlassButton>
        </div>

        <div
          className="text-center mt-6 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p>Demo credentials: admin / admin</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}

export default Login;