"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Target,
  Coffee,
  Heart,
  Zap,
  Brain,
  Clock,
  CheckCircle,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  action: () => void;
}

export default function QuickActions() {
  const [showRescueMode, setShowRescueMode] = useState(false);
  const [rescueStep, setRescueStep] = useState(0);
  const [isRescueActive, setIsRescueActive] = useState(false);

  const quickActions: QuickAction[] = [
    {
      id: "start-session",
      title: "Start Focus Session",
      description: "Begin a 25-minute focused work session",
      icon: Play,
      color: "text-green-600",
      bgColor: "bg-green-100",
      action: () => {
        // This would trigger the focus timer
        console.log("Starting focus session");
      },
    },
    {
      id: "add-task",
      title: "Add Quick Task",
      description: "Create a new task in under 30 seconds",
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      action: () => {
        console.log("Adding quick task");
      },
    },
    {
      id: "take-break",
      title: "Take a Break",
      description: "5-minute break with guided breathing",
      icon: Coffee,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      action: () => {
        console.log("Taking a break");
      },
    },
    {
      id: "mood-check",
      title: "Mood Check-in",
      description: "Quick emotional state assessment",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      action: () => {
        console.log("Mood check-in");
      },
    },
  ];

  const rescueSteps = [
    {
      title: "Clear Your Space",
      description: "Take 2 minutes to clear your immediate workspace",
      icon: Target,
      duration: 120,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Guided Breathing",
      description: "1 minute of focused breathing to reset",
      icon: Heart,
      duration: 60,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Tiny Starter Task",
      description: "Complete one small task to build momentum",
      icon: CheckCircle,
      duration: 60,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const startRescueMode = () => {
    setShowRescueMode(true);
    setIsRescueActive(true);
    setRescueStep(0);
  };

  const nextRescueStep = () => {
    if (rescueStep < rescueSteps.length - 1) {
      setRescueStep(rescueStep + 1);
    } else {
      // Rescue mode completed
      setIsRescueActive(false);
      setShowRescueMode(false);
      setRescueStep(0);
    }
  };

  const skipRescueStep = () => {
    nextRescueStep();
  };

  const cancelRescueMode = () => {
    setIsRescueActive(false);
    setShowRescueMode(false);
    setRescueStep(0);
  };

  return (
    <div className="space-y-4">
      {/* Rescue Button */}
      <div className="relative">
        <button
          onClick={startRescueMode}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <Zap className="h-5 w-5" />
          <span className="font-semibold">Quick Rescue</span>
        </button>
        <div className="absolute -top-2 -right-2">
          <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
        </div>
      </div>

      {/* Rescue Mode Overlay */}
      <AnimatePresence>
        {showRescueMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            >
              <div className="text-center space-y-4">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${rescueSteps[rescueStep].bgColor} mb-4`}
                >
                  {(() => {
                    const IconComponent = rescueSteps[rescueStep].icon;
                    return (
                      <IconComponent
                        className={`h-8 w-8 ${rescueSteps[rescueStep].color}`}
                      />
                    );
                  })()}
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  {rescueSteps[rescueStep].title}
                </h3>

                <p className="text-gray-600">
                  {rescueSteps[rescueStep].description}
                </p>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>
                    {Math.floor(rescueSteps[rescueStep].duration / 60)}m{" "}
                    {rescueSteps[rescueStep].duration % 60}s
                  </span>
                </div>

                <div className="flex space-x-2 pt-4">
                  <button
                    onClick={skipRescueStep}
                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {rescueStep === rescueSteps.length - 1
                      ? "Complete"
                      : "Next Step"}
                  </button>
                  <button
                    onClick={cancelRescueMode}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                {/* Progress Indicator */}
                <div className="flex justify-center space-x-1">
                  {rescueSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index <= rescueStep ? "bg-indigo-600" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Regular Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <motion.button
            key={action.id}
            onClick={action.action}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-left"
          >
            <div
              className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${action.bgColor} mb-2`}
            >
              <action.icon className={`h-4 w-4 ${action.color}`} />
            </div>
            <div className="text-sm font-medium text-gray-900">
              {action.title}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {action.description}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Smart Suggestions */}
      <div className="bg-indigo-50 p-3 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Brain className="h-4 w-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-900">
            Smart Suggestion
          </span>
        </div>
        <p className="text-xs text-indigo-700">
          Based on your patterns, you are most productive in the morning.
          Consider scheduling important tasks before 11 AM.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-lg font-bold text-indigo-600">3</div>
          <div className="text-xs text-gray-600">Todays Tasks</div>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-lg font-bold text-green-600">45m</div>
          <div className="text-xs text-gray-600">Focus Time</div>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <div className="text-lg font-bold text-purple-600">85%</div>
          <div className="text-xs text-gray-600">Success Rate</div>
        </div>
      </div>
    </div>
  );
}
