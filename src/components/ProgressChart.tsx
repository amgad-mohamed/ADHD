'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Target, Clock, CheckCircle } from 'lucide-react';

interface ProgressData {
  date: string;
  focusTime: number;
  tasksCompleted: number;
  sessionsCompleted: number;
  successRate: number;
}

export default function ProgressChart() {
  const [selectedMetric, setSelectedMetric] = useState<'focusTime' | 'tasksCompleted' | 'sessionsCompleted' | 'successRate'>('focusTime');

  // Mock data for the past 7 days
  const progressData: ProgressData[] = [
    { date: 'Mon', focusTime: 120, tasksCompleted: 4, sessionsCompleted: 3, successRate: 85 },
    { date: 'Tue', focusTime: 90, tasksCompleted: 3, sessionsCompleted: 2, successRate: 75 },
    { date: 'Wed', focusTime: 150, tasksCompleted: 5, sessionsCompleted: 4, successRate: 90 },
    { date: 'Thu', focusTime: 80, tasksCompleted: 2, sessionsCompleted: 2, successRate: 70 },
    { date: 'Fri', focusTime: 180, tasksCompleted: 6, sessionsCompleted: 5, successRate: 95 },
    { date: 'Sat', focusTime: 60, tasksCompleted: 2, sessionsCompleted: 1, successRate: 80 },
    { date: 'Sun', focusTime: 100, tasksCompleted: 3, sessionsCompleted: 2, successRate: 85 }
  ];

  const getMetricData = () => {
    return progressData.map(item => ({
      date: item.date,
      value: item[selectedMetric]
    }));
  };

  const getMetricInfo = () => {
    switch (selectedMetric) {
      case 'focusTime':
        return {
          label: 'Focus Time',
          unit: 'minutes',
          icon: Clock,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100'
        };
      case 'tasksCompleted':
        return {
          label: 'Tasks Completed',
          unit: 'tasks',
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100'
        };
      case 'sessionsCompleted':
        return {
          label: 'Sessions',
          unit: 'sessions',
          icon: Target,
          color: 'text-purple-600',
          bgColor: 'bg-purple-100'
        };
      case 'successRate':
        return {
          label: 'Success Rate',
          unit: '%',
          icon: TrendingUp,
          color: 'text-indigo-600',
          bgColor: 'bg-indigo-100'
        };
    }
  };

  const getCurrentValue = () => {
    const today = progressData[progressData.length - 1];
    return today[selectedMetric];
  };

  const getPreviousValue = () => {
    const yesterday = progressData[progressData.length - 2];
    return yesterday[selectedMetric];
  };

  const getChange = () => {
    const current = getCurrentValue();
    const previous = getPreviousValue();
    const change = ((current - previous) / previous) * 100;
    return change;
  };

  const getMaxValue = () => {
    return Math.max(...progressData.map(item => item[selectedMetric]));
  };

  const metricInfo = getMetricInfo();
  const currentValue = getCurrentValue();
  const previousValue = getPreviousValue();
  const change = getChange();
  const maxValue = getMaxValue();

  return (
    <div className="space-y-4">
      {/* Metric Selector */}
      <div className="grid grid-cols-2 gap-2">
        {(['focusTime', 'tasksCompleted', 'sessionsCompleted', 'successRate'] as const).map((metric) => {
          const info = getMetricInfo();
          return (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                selectedMetric === metric
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {metric === 'focusTime' && 'Focus Time'}
              {metric === 'tasksCompleted' && 'Tasks'}
              {metric === 'sessionsCompleted' && 'Sessions'}
              {metric === 'successRate' && 'Success'}
            </button>
          );
        })}
      </div>

      {/* Current Value Display */}
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${metricInfo.bgColor} mb-3`}>
          <metricInfo.icon className={`h-6 w-6 ${metricInfo.color}`} />
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {selectedMetric === 'focusTime' 
            ? `${Math.floor(currentValue / 60)}h ${currentValue % 60}m`
            : selectedMetric === 'successRate'
            ? `${currentValue}%`
            : currentValue
          }
        </div>
        <div className="text-sm text-gray-600">{metricInfo.label}</div>
      </div>

      {/* Change Indicator */}
      <div className="flex items-center justify-center space-x-2">
        {change > 0 ? (
          <TrendingUp className="h-4 w-4 text-green-600" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-600" />
        )}
        <span className={`text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {Math.abs(change).toFixed(1)}% from yesterday
        </span>
      </div>

      {/* Chart */}
      <div className="space-y-2">
        <div className="flex items-end justify-between h-24">
          {getMetricData().map((item, index) => {
            const height = (item.value / maxValue) * 100;
            return (
              <div key={item.date} className="flex flex-col items-center space-y-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`w-6 rounded-t ${
                    selectedMetric === 'focusTime' ? 'bg-blue-500' :
                    selectedMetric === 'tasksCompleted' ? 'bg-green-500' :
                    selectedMetric === 'sessionsCompleted' ? 'bg-purple-500' :
                    'bg-indigo-500'
                  }`}
                />
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="text-sm font-medium text-gray-700 mb-2">This Week</div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-gray-500">Total Focus Time</div>
            <div className="font-medium text-gray-900">
              {Math.floor(progressData.reduce((sum, item) => sum + item.focusTime, 0) / 60)}h 
              {progressData.reduce((sum, item) => sum + item.focusTime, 0) % 60}m
            </div>
          </div>
          <div>
            <div className="text-gray-500">Tasks Completed</div>
            <div className="font-medium text-gray-900">
              {progressData.reduce((sum, item) => sum + item.tasksCompleted, 0)}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Sessions</div>
            <div className="font-medium text-gray-900">
              {progressData.reduce((sum, item) => sum + item.sessionsCompleted, 0)}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Avg Success Rate</div>
            <div className="font-medium text-gray-900">
              {Math.round(progressData.reduce((sum, item) => sum + item.successRate, 0) / progressData.length)}%
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-700">Insights</div>
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Your best day was Friday with {Math.max(...progressData.map(item => item.focusTime))} minutes of focus time</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>You completed {progressData.reduce((sum, item) => sum + item.tasksCompleted, 0)} tasks this week</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Average success rate: {Math.round(progressData.reduce((sum, item) => sum + item.successRate, 0) / progressData.length)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
