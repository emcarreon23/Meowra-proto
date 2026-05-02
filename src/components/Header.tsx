import { Link, useLocation } from "react-router-dom";
import { Cat, History, Layout } from "lucide-react";
import { motion } from "motion/react";

export default function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/50 backdrop-blur-md border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 bg-rose-200 rounded-full flex items-center justify-center shadow-inner"
          >
            <Cat className="w-6 h-6 text-rose-400" />
          </motion.div>
          <span className="text-2xl font-bold tracking-tight text-rose-400 uppercase">
            MEOWRA
          </span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            to="/app"
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/app" ? "text-rose-400" : "text-slate-500 hover:text-rose-300"
            }`}
          >
            Converter
          </Link>
          <Link
            to="/history"
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/history" ? "text-rose-400" : "text-slate-500 hover:text-rose-300"
            }`}
          >
            History
          </Link>
          <div className="flex items-center gap-4 ml-4">
            <button className="hidden sm:block px-5 py-2 rounded-full border border-rose-200 text-rose-400 text-sm font-semibold hover:bg-rose-50 transition-colors">
              Log In
            </button>
            <Link
              to="/app"
              className="px-5 py-2 rounded-full bg-rose-400 text-white text-sm font-semibold shadow-lg shadow-rose-200 hover:bg-rose-500 transition-all active:scale-95"
            >
              Try Premium
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
