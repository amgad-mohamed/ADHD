"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Clock,
  Target,
  TrendingUp,
  Shield,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "Adaptive Focus Plan",
      description:
        "AI-powered session planning based on your peak focus hours and previous success patterns.",
    },
    {
      icon: Target,
      title: "Smart Task Breakdown",
      description:
        "Break down complex tasks into manageable subtasks with time estimates.",
    },
    {
      icon: Clock,
      title: "Focus Timer",
      description:
        "Customizable Pomodoro timer with smart breaks and session tracking.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description:
        "Visual progress reports and insights to celebrate your achievements.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "All data processed locally. Your information stays on your device.",
    },
    {
      icon: Sparkles,
      title: "Smart Reminders",
      description:
        "Intelligent notifications that adapt to your patterns and reduce distractions.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-indigo-600" />
          <span className="text-2xl font-bold text-gray-900">ADHD Focus</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Organize Your Day,
            <span className="text-indigo-600 block">Reduce Distractions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            A privacy-first web platform designed specifically for individuals
            with ADHD. Smart task management, adaptive focus planning, and
            progress tracking to help you succeed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/register">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Start Free Trial</span>
              </button>
            </Link>
            <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 transition-colors flex items-center space-x-2">
              <span>Watch Demo</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Features Designed for ADHD
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every feature is built with ADHD challenges in mind, helping you
            stay focused and organized.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of users who have improved their focus and
            organization with ADHD Focus.
          </p>
          <Link href="/register">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
              Start Your Free Trial
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-indigo-400" />
              <span className="text-xl font-bold">ADHD Focus</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 ADHD Focus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
