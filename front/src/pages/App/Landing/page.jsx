import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  CheckCircle,
  Target,
  TrendingUp,
  Star,
  ArrowRight,
} from "lucide-react";
import Navbar from "./NavBar";
import { NavLink } from "react-router-dom";

const HabitTrackerLanding = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100); // Delay triggers transition
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 to-black -z-10"></div>

      <main className="flex-grow flex items-center justify-center px-6">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight text-white">
            Master your day.
            <br />
            Only with&nbsp;
            <span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent font-bold">
              Real.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Build lasting habits, track your progress, and unlock your potential
            with our habit tracker.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <NavLink
              to="/auth/register"
              className="text-decoration-none group bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-black font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 py-8 text-center text-gray-400">
        <p>Real Habit Tracker.</p>
      </footer>
    </div>
  );
};

export default HabitTrackerLanding;
