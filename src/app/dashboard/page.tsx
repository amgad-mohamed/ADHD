"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Clock,
  Target,
  TrendingUp,
  Settings,
  Bell,
  User,
  Plus,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  XCircle,
  Calendar,
  BarChart3,
  LogOut,
  Search,
  Gift,
} from "lucide-react";
import FocusTimer from "@/components/FocusTimer";
import TaskList from "@/components/TaskList";
import ProgressChart from "@/components/ProgressChart";
import QuickActions from "@/components/QuickActions";
import FloatingQuickActions from "@/components/FloatingQuickActions";
import NotificationsMenu from "@/components/NotificationsMenu";
import MusicPractice from "@/components/MusicPractice";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

type Task = {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
};

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Please log in to access your dashboard.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">
                ADHD Focus
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900">
                  {formatTime(currentTime)}
                </div>
                <div className="text-xs text-gray-500">
                  {formatDate(currentTime)}
                </div>
              </div>

              <Link
                href="/doctors"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                <Search className="h-4 w-4 mr-2" />
                Find Doctors
              </Link>

              <Link
                href="/rewards"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                <Gift className="h-4 w-4 mr-2" />
                Rewards & Tasks
              </Link>

              <NotificationsMenu />

              <div className="relative group">
                <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span>{user.name}</span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User className="h-4 w-4 mr-3" />
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Focus Timer & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Focus Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Focus Timer
                </h2>
                <Clock className="h-5 w-5 text-indigo-600" />
              </div>
              <FocusTimer />
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Quick Actions
                </h2>
                <Plus className="h-5 w-5 text-indigo-600" />
              </div>
              <QuickActions />
            </motion.div>

            {/* Current Task */}
            {currentTask && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Current Task
                  </h2>
                  <Target className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {currentTask.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {currentTask.description}
                  </p>
                  <div className="flex space-x-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors">
                      Complete
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors">
                      Skip
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Center Column - Task List */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Today&lsquo;s Tasks
                </h2>
                <button className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <TaskList />
            </motion.div>
          </div>

          {/* Right Column - Progress & Insights */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Weekly Progress
                </h2>
                <BarChart3 className="h-5 w-5 text-indigo-600" />
              </div>
              <ProgressChart />
            </motion.div>

            {/* Daily Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Daily Insights
                </h2>
                <Brain className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Great Progress!
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    You&lsquo;ve completed 3 tasks today. Your focus sessions
                    are 15% longer than last week.
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">
                      Peak Focus Time
                    </span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Your best focus hours are 9-11 AM. Schedule important tasks
                    during this time.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Today&lsquo;s Stats
                </h2>
                <TrendingUp className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">3</div>
                  <div className="text-sm text-gray-600">Tasks Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">45m</div>
                  <div className="text-sm text-gray-600">Focus Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">85%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">2</div>
                  <div className="text-sm text-gray-600">Sessions</div>
                </div>
              </div>
            </motion.div>

            {/* Listening Practice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className=""
            >
              <MusicPractice />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Floating Quick Actions */}
      <FloatingQuickActions />
    </div>
  );
}
