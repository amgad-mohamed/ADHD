"use client";

import { useEffect, useState } from "react";
import {
  Gift,
  Coins,
  CheckCircle,
  ArrowLeft,
  Star,
  TrendingUp,
  Calendar,
  Target,
  Zap,
  Award,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { rewardsAPI, Reward, Task } from "@/lib/rewards";
import toast from "react-hot-toast";

interface User {
  streak_days: number;
  level: number;
}

interface ExtendedTask extends Task {
  status: string;
  completion_date?: string;
}

interface WalletTransaction {
  id: number;
  type: "earn" | "spend" | "bonus";
  description: string;
  amount: number;
  date: string;
}

interface WalletData {
  transactions: WalletTransaction[];
}

export default function RewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [tasks, setTasks] = useState<ExtendedTask[]>([]);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [redeemingId, setRedeemingId] = useState<number | null>(null);
  const [completingTaskId, setCompletingTaskId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"rewards" | "tasks" | "wallet">(
    "rewards"
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userData, tasksData, rewardsData] = await Promise.all([
        rewardsAPI.getCurrentUser(),
        rewardsAPI.getUserTasks(),
        rewardsAPI.getRewards(),
      ]);

      setUser(userData);
      setTasks(tasksData.tasks);
      setRewards(rewardsData.rewards);
      setUserBalance(rewardsData.user_balance);
    } finally {
      setLoading(false);
    }
  };

  const redeemReward = async (id: number) => {
    setRedeemingId(id);
    const res = await rewardsAPI.redeemReward(id);
    setRedeemingId(null);

    if (res.status === "success" && typeof res.new_balance === "number") {
      setUserBalance(res.new_balance);
      toast.success(
        `${res.message} (Spent ${res.tokens_spent} tokens, New balance: ${res.new_balance})`
      );
      loadData();
    } else {
      toast.error(res.message);
    }
  };

  const completeTask = async (taskId: number) => {
    setCompletingTaskId(taskId);
    const res = await rewardsAPI.completeTask(taskId);
    setCompletingTaskId(null);

    if (res.status === "success") {
      setUserBalance(res.new_balance || userBalance);
      toast.success(
        `${res.message} +${res.tokens_earned} tokens${
          res.streak_bonus ? ` +${res.streak_bonus} streak bonus!` : ""
        }`
      );
      const tasksData = await rewardsAPI.getUserTasks();
      setTasks(tasksData.tasks);
    } else {
      toast.error(res.message);
    }
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "discount":
        return <Gift className="h-4 w-4" />;
      case "content":
        return <Target className="h-4 w-4" />;
      case "premium":
        return <Star className="h-4 w-4" />;
      case "physical":
        return <Award className="h-4 w-4" />;
      default:
        return <Gift className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Gift className="h-6 w-6 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Rewards & Tasks
              </h1>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Token Balance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userBalance}
                </p>
              </div>
              <Coins className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Streak Days</p>
                <p className="text-2xl font-bold text-gray-900">
                  {user?.streak_days || 0}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Level</p>
                <p className="text-2xl font-bold text-gray-900">
                  {user?.level || 1}
                </p>
              </div>
              <Star className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasks Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tasks.filter((t) => t.status === "completed").length}/
                  {tasks.length}
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-1 mb-8">
          <div className="flex space-x-1">
            {[
              { id: "rewards", label: "Rewards Store", icon: Gift },
              { id: "tasks", label: "Daily Tasks", icon: Target },
              { id: "wallet", label: "Wallet", icon: Coins },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id as "rewards" | "tasks" | "wallet")
                }
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "rewards" && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(reward.category)}
                        <span className="text-xs font-medium text-gray-500 uppercase">
                          {reward.category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-600">
                        <Coins className="h-4 w-4" />
                        <span className="font-semibold">
                          {reward.token_cost}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {reward.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {reward.description}
                    </p>

                    <button
                      onClick={() => redeemReward(reward.id)}
                      disabled={
                        redeemingId === reward.id ||
                        userBalance < reward.token_cost
                      }
                      className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                        userBalance < reward.token_cost
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {redeemingId === reward.id
                        ? "Redeeming..."
                        : userBalance < reward.token_cost
                        ? "Insufficient Tokens"
                        : "Redeem Reward"}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "tasks" && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {tasks.map((task) => (
                <div key={task.id} className="bg-white border rounded-xl p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <button
                          onClick={() => completeTask(task.id)}
                          disabled={
                            completingTaskId === task.id ||
                            task.status === "completed"
                          }
                          className={`p-2 rounded-lg transition-colors ${
                            task.status === "completed"
                              ? "text-green-600 bg-green-100"
                              : "text-gray-400 hover:text-green-600 hover:bg-green-50"
                          }`}
                        >
                          {task.status === "completed" ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <div className="h-5 w-5 border-2 border-current rounded-full" />
                          )}
                        </button>

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {task.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {task.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Coins className="h-4 w-4 text-yellow-500" />
                          <span>{task.token_reward} tokens</span>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                            task.difficulty
                          )}`}
                        >
                          {task.difficulty}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{task.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4">
                      <button
                        onClick={() => completeTask(task.id)}
                        disabled={
                          completingTaskId === task.id ||
                          task.status === "completed"
                        }
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          task.status === "completed"
                            ? "bg-green-100 text-green-700 cursor-not-allowed"
                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                        }`}
                      >
                        {completingTaskId === task.id
                          ? "Completing..."
                          : task.status === "completed"
                          ? "Completed"
                          : "Complete Task"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "wallet" && (
            <motion.div
              key="wallet"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <WalletHistory />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function WalletHistory() {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    try {
      const data = await rewardsAPI.getWalletHistory();
      setWalletData(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!walletData) return null;

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "earn":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "spend":
        return <Gift className="h-4 w-4 text-red-600" />;
      case "bonus":
        return <Zap className="h-4 w-4 text-yellow-600" />;
      default:
        return <Coins className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Transaction History
        </h2>

        {walletData.transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Coins className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No transactions yet. Complete tasks to earn tokens!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {walletData.transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <div
                  className={`font-semibold ${
                    transaction.type === "earn" || transaction.type === "bonus"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "earn" || transaction.type === "bonus"
                    ? "+"
                    : "-"}
                  {transaction.amount} tokens
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
