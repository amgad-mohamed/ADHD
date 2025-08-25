"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Circle,
  Clock,
  Edit,
  Trash2,
  Plus,
  Target,
  AlertCircle,
  Star,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  estimatedTime: number; // in minutes
  category: string;
  subtasks: Subtask[];
  createdAt: Date;
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  estimatedTime: number;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete project proposal",
      description: "Write and review the Q4 project proposal document",
      completed: false,
      priority: "high",
      estimatedTime: 120,
      category: "Work",
      subtasks: [
        {
          id: "1-1",
          title: "Research requirements",
          completed: false,
          estimatedTime: 30,
        },
        {
          id: "1-2",
          title: "Draft initial proposal",
          completed: false,
          estimatedTime: 60,
        },
        {
          id: "1-3",
          title: "Review and edit",
          completed: false,
          estimatedTime: 30,
        },
      ],
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Study for exam",
      description: "Review chapters 5-8 for the upcoming test",
      completed: false,
      priority: "medium",
      estimatedTime: 90,
      category: "Study",
      subtasks: [
        {
          id: "2-1",
          title: "Read chapter 5",
          completed: false,
          estimatedTime: 30,
        },
        {
          id: "2-2",
          title: "Read chapter 6",
          completed: false,
          estimatedTime: 30,
        },
        {
          id: "2-3",
          title: "Practice problems",
          completed: false,
          estimatedTime: 30,
        },
      ],
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "Clean workspace",
      description: "Organize desk and file important documents",
      completed: true,
      priority: "low",
      estimatedTime: 20,
      category: "Personal",
      subtasks: [
        {
          id: "3-1",
          title: "Clear desk surface",
          completed: true,
          estimatedTime: 10,
        },
        {
          id: "3-2",
          title: "File documents",
          completed: true,
          estimatedTime: 10,
        },
      ],
      createdAt: new Date(),
    },
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<{
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    estimatedTime: number;
    category: string;
  } | null>(null);
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    estimatedTime: number;
    category: string;
  }>({
    title: "",
    description: "",
    priority: "medium",
    estimatedTime: 30,
    category: "Personal",
  });

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
            }
          : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      completed: false,
      priority: newTask.priority,
      estimatedTime: newTask.estimatedTime,
      category: newTask.category,
      subtasks: [],
      createdAt: new Date(),
    };

    setTasks((prev) => [task, ...prev]);
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      estimatedTime: 30,
      category: "Personal",
    });
    setShowAddTask(false);
  };

  const startEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditDraft({
      title: task.title,
      description: task.description,
      priority: task.priority,
      estimatedTime: task.estimatedTime,
      category: task.category,
    });
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditDraft(null);
  };

  const saveEdit = () => {
    if (!editingTaskId || !editDraft) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTaskId
          ? {
              ...t,
              title: editDraft.title,
              description: editDraft.description,
              priority: editDraft.priority,
              estimatedTime: editDraft.estimatedTime,
              category: editDraft.category,
            }
          : t
      )
    );
    cancelEdit();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return "🔴";
      case "medium":
        return "🟡";
      case "low":
        return "🟢";
      default:
        return "⚪";
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="space-y-4">
      {/* Add Task Button */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setShowAddTask(true)}
            className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {pendingTasks.length} pending, {completedTasks.length} completed
        </div>
      </div>

      {/* Add Task Form */}
      <AnimatePresence>
        {showAddTask && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 p-4 rounded-lg space-y-3"
          >
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Description (optional)"
              value={newTask.description}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={2}
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask((prev) => ({
                    ...prev,
                    priority: e.target.value as "low" | "medium" | "high",
                  }))
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <select
                value={newTask.estimatedTime}
                onChange={(e) =>
                  setNewTask((prev) => ({
                    ...prev,
                    estimatedTime: parseInt(e.target.value),
                  }))
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
                <option value={120}>2 hours</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={addTask}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddTask(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence>
          {pendingTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="mt-1 text-gray-400 hover:text-green-600 transition-colors"
                >
                  <Circle className="h-5 w-5" />
                </button>

                <div className="flex-1 min-w-0">
                  {editingTaskId === task.id && editDraft ? (
                    <div className="space-y-2 mb-2">
                      <input
                        value={editDraft.title}
                        onChange={(e) =>
                          setEditDraft({ ...editDraft, title: e.target.value })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                      <textarea
                        value={editDraft.description}
                        onChange={(e) =>
                          setEditDraft({
                            ...editDraft,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded resize-none"
                        rows={2}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={editDraft.priority}
                          onChange={(e) =>
                            setEditDraft({
                              ...editDraft,
                              priority: e.target.value as
                                | "low"
                                | "medium"
                                | "high",
                            })
                          }
                          className="px-2 py-1 border border-gray-300 rounded"
                        >
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                        </select>
                        <select
                          value={editDraft.estimatedTime}
                          onChange={(e) =>
                            setEditDraft({
                              ...editDraft,
                              estimatedTime: parseInt(e.target.value),
                            })
                          }
                          className="px-2 py-1 border border-gray-300 rounded"
                        >
                          <option value={15}>15 minutes</option>
                          <option value={30}>30 minutes</option>
                          <option value={45}>45 minutes</option>
                          <option value={60}>1 hour</option>
                          <option value={90}>1.5 hours</option>
                          <option value={120}>2 hours</option>
                        </select>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={saveEdit}
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-500 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900 truncate">
                          {task.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      {task.description && (
                        <p className="text-sm text-gray-600 mb-2">
                          {task.description}
                        </p>
                      )}
                    </>
                  )}

                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(task.estimatedTime)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="h-3 w-3" />
                      <span>{task.category}</span>
                    </div>
                    {task.subtasks.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <span>
                          {task.subtasks.filter((st) => st.completed).length}/
                          {task.subtasks.length} subtasks
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Subtasks */}
                  {task.subtasks.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {task.subtasks.map((subtask) => (
                        <div
                          key={subtask.id}
                          className="flex items-center space-x-2 ml-4"
                        >
                          <button
                            onClick={() => toggleSubtask(task.id, subtask.id)}
                            className={`text-sm transition-colors ${
                              subtask.completed
                                ? "text-green-600"
                                : "text-gray-400 hover:text-green-600"
                            }`}
                          >
                            {subtask.completed ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Circle className="h-4 w-4" />
                            )}
                          </button>
                          <span
                            className={`text-sm ${
                              subtask.completed
                                ? "line-through text-gray-500"
                                : "text-gray-700"
                            }`}
                          >
                            {subtask.title}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({formatTime(subtask.estimatedTime)})
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => startEdit(task)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Completed Today
            </h4>
            <div className="space-y-2">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 line-through">
                      {task.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      Completed{" "}
                      {`${task.createdAt.getFullYear()}-${String(
                        task.createdAt.getMonth() + 1
                      ).padStart(2, "0")}-${String(
                        task.createdAt.getDate()
                      ).padStart(2, "0")} ${String(
                        task.createdAt.getHours()
                      ).padStart(2, "0")}:${String(
                        task.createdAt.getMinutes()
                      ).padStart(2, "0")}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
