import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Batches from "./pages/Batches";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  const [auth, setAuth] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [subPage, setSubPage] = useState("all");

  if (!auth) return <Login setAuth={setAuth} />;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-black text-white font-inter">
      <Sidebar setPage={setPage} setSubPage={setSubPage} activePage={page} activeSubPage={subPage} />

      <div
        className="flex-1 p-8 overflow-auto"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {page === "dashboard" && <Dashboard />}
        {page === "students" && <Students subPage={subPage} />}
        {page === "teachers" && <Teachers />}
        {page === "batches" && <Batches />}
      </div>
    </div>
  );
}

export default App;