"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Brain,
  Clock,
  Target,
  Heart,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Coffee,
  BookOpen,
  Workflow,
  Zap,
} from "lucide-react";

interface Question {
  id: string;
  title: string;
  description: string;
  type: "multiple-choice" | "slider" | "time" | "checkbox";
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  type AnswerValue = string | number | string[];
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});

  const questions: Question[] = [
    {
      id: "focus-difficulty",
      title: "How would you rate your difficulty with focus and concentration?",
      description: "This helps us understand your specific challenges",
      type: "slider",
      min: 1,
      max: 10,
      step: 1,
    },
    {
      id: "peak-hours",
      title: "When are you typically most productive?",
      description: "Select your peak focus hours",
      type: "multiple-choice",
      options: [
        "Early morning (6-9 AM)",
        "Morning (9 AM-12 PM)",
        "Afternoon (12-3 PM)",
        "Late afternoon (3-6 PM)",
        "Evening (6-9 PM)",
        "Late night (9 PM-12 AM)",
      ],
    },
    {
      id: "common-challenges",
      title: "What are your biggest challenges?",
      description: "Select all that apply",
      type: "checkbox",
      options: [
        "Getting started on tasks",
        "Staying focused during work",
        "Managing time effectively",
        "Remembering appointments",
        "Completing projects",
        "Organizing thoughts and ideas",
        "Following through on plans",
        "Managing distractions",
      ],
    },
    {
      id: "session-length",
      title: "What's your ideal focus session length?",
      description: "How long can you typically maintain focus?",
      type: "multiple-choice",
      options: [
        "15 minutes or less",
        "15-25 minutes",
        "25-45 minutes",
        "45-60 minutes",
        "More than 60 minutes",
      ],
    },
    {
      id: "break-preference",
      title: "How do you prefer to take breaks?",
      description: "Choose your preferred break activities",
      type: "checkbox",
      options: [
        "Short walks",
        "Deep breathing exercises",
        "Quick stretches",
        "Listening to music",
        "Having a snack",
        "Checking social media",
        "Reading something light",
        "Meditation",
      ],
    },
    {
      id: "goals",
      title: "What are your main goals?",
      description: "What do you want to achieve with this app?",
      type: "checkbox",
      options: [
        "Improve work productivity",
        "Better time management",
        "Complete more tasks daily",
        "Reduce procrastination",
        "Improve study habits",
        "Better organization",
        "Reduce stress and anxiety",
        "Build consistent routines",
      ],
    },
  ];

  const handleAnswer = (questionId: string, answer: AnswerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    // Save answers to localStorage or send to backend
    localStorage.setItem("adhd-onboarding", JSON.stringify(answers));

    // Redirect to dashboard
    router.push("/dashboard");
  };

  const getProgressPercentage = () => {
    return ((currentStep + 1) / questions.length) * 100;
  };

  const renderQuestion = (question: Question) => {
    const currentAnswer = answers[question.id];

    switch (question.type) {
      case "slider":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {currentAnswer || 5}
              </div>
              <div className="text-sm text-gray-500">
                {typeof currentAnswer === "number" && currentAnswer <= 3
                  ? "Mild difficulty"
                  : typeof currentAnswer === "number" && currentAnswer <= 6
                  ? "Moderate difficulty"
                  : typeof currentAnswer === "number" && currentAnswer <= 8
                  ? "Significant difficulty"
                  : "Severe difficulty"}
              </div>
            </div>
            <input
              type="range"
              min={question.min}
              max={question.max}
              step={question.step}
              value={currentAnswer || 5}
              onChange={(e) =>
                handleAnswer(question.id, parseInt(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Very Easy</span>
              <span>Very Difficult</span>
            </div>
          </div>
        );

      case "multiple-choice":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(question.id, option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  currentAnswer === option
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {currentAnswer === option && (
                    <CheckCircle className="h-5 w-5 text-indigo-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label
                key={index}
                className="flex items-center p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-all"
              >
                <input
                  type="checkbox"
                  checked={
                    Array.isArray(currentAnswer) &&
                    currentAnswer.includes(option)
                  }
                  onChange={(e) => {
                    const currentArray = Array.isArray(currentAnswer)
                      ? currentAnswer
                      : [];
                    const newArray = e.target.checked
                      ? [...currentArray, option]
                      : currentArray.filter((item) => item !== option);
                    handleAnswer(question.id, newArray);
                  }}
                  className="mr-3 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const currentQuestion = questions[currentStep];
  const canProceed =
    answers[currentQuestion.id] &&
    (Array.isArray(answers[currentQuestion.id])
      ? (answers[currentQuestion.id] as string[]).length > 0
      : true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">ADHD Focus</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Let&#39;s Personalize Your Experience
          </h1>
          <p className="text-gray-600">
            Help us understand your needs to create the best experience for you
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Step {currentStep + 1} of {questions.length}
            </span>
            <span>{Math.round(getProgressPercentage())}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-indigo-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {currentQuestion.title}
            </h2>
            <p className="text-gray-600">{currentQuestion.description}</p>
          </div>

          {renderQuestion(currentQuestion)}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
              currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={nextStep}
            disabled={!canProceed}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
              canProceed
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <span>
              {currentStep === questions.length - 1 ? "Complete Setup" : "Next"}
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Skip for now, I&#39;ll set this up later
          </button>
        </div>
      </div>
    </div>
  );
}
