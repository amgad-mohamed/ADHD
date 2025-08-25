'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimerState {
  isRunning: boolean;
  isBreak: boolean;
  timeLeft: number;
  totalTime: number;
  sessionCount: number;
}

export default function FocusTimer() {
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    isBreak: false,
    timeLeft: 25 * 60, // 25 minutes in seconds
    totalTime: 25 * 60,
    sessionCount: 0
  });

  const [settings, setSettings] = useState({
    focusTime: 25,
    breakTime: 5,
    longBreakTime: 15,
    sessionsUntilLongBreak: 4
  });

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = (): number => {
    return ((timerState.totalTime - timerState.timeLeft) / timerState.totalTime) * 100;
  };

  const startTimer = useCallback(() => {
    setTimerState(prev => ({ ...prev, isRunning: true }));
  }, []);

  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({ ...prev, isRunning: false }));
  }, []);

  const resetTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      timeLeft: prev.isBreak ? settings.breakTime * 60 : settings.focusTime * 60,
      totalTime: prev.isBreak ? settings.breakTime * 60 : settings.focusTime * 60
    }));
  }, [settings]);

  const skipTimer = useCallback(() => {
    const isLongBreak = (timerState.sessionCount + 1) % settings.sessionsUntilLongBreak === 0;
    const nextBreakTime = isLongBreak ? settings.longBreakTime : settings.breakTime;
    
    setTimerState(prev => ({
      isRunning: false,
      isBreak: !prev.isBreak,
      timeLeft: prev.isBreak ? settings.focusTime * 60 : nextBreakTime * 60,
      totalTime: prev.isBreak ? settings.focusTime * 60 : nextBreakTime * 60,
      sessionCount: prev.isBreak ? prev.sessionCount + 1 : prev.sessionCount
    }));
  }, [timerState.sessionCount, settings]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerState.isRunning && timerState.timeLeft > 0) {
      interval = setInterval(() => {
        setTimerState(prev => {
          if (prev.timeLeft <= 1) {
            // Timer finished
            const isLongBreak = (prev.sessionCount + 1) % settings.sessionsUntilLongBreak === 0;
            const nextBreakTime = isLongBreak ? settings.longBreakTime : settings.breakTime;
            
            return {
              isRunning: false,
              isBreak: !prev.isBreak,
              timeLeft: prev.isBreak ? settings.focusTime * 60 : nextBreakTime * 60,
              totalTime: prev.isBreak ? settings.focusTime * 60 : nextBreakTime * 60,
              sessionCount: prev.isBreak ? prev.sessionCount + 1 : prev.sessionCount
            };
          }
          
          return {
            ...prev,
            timeLeft: prev.timeLeft - 1
          };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerState.isRunning, timerState.timeLeft, settings]);

  const getTimerColor = (): string => {
    if (timerState.isBreak) return 'text-green-600';
    return 'text-indigo-600';
  };

  const getProgressColor = (): string => {
    if (timerState.isBreak) return 'bg-green-500';
    return 'bg-indigo-500';
  };

  return (
    <div className="space-y-6">
      {/* Timer Display */}
      <div className="text-center">
        <div className="relative inline-block">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              className={getProgressColor()}
              initial={{ strokeDasharray: "0 352" }}
              animate={{ strokeDasharray: `${(calculateProgress() / 100) * 352} 352` }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getTimerColor()}`}>
                {formatTime(timerState.timeLeft)}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {timerState.isBreak ? 'Break Time' : 'Focus Time'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex justify-center space-x-4">
        {timerState.isRunning ? (
          <button
            onClick={pauseTimer}
            className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors"
          >
            <Pause className="h-6 w-6" />
          </button>
        ) : (
          <button
            onClick={startTimer}
            className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
          >
            <Play className="h-6 w-6" />
          </button>
        )}
        
        <button
          onClick={resetTimer}
          className="bg-gray-500 text-white p-3 rounded-full hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="h-6 w-6" />
        </button>
        
        <button
          onClick={skipTimer}
          className="bg-indigo-500 text-white p-3 rounded-full hover:bg-indigo-600 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Session Info */}
      <div className="text-center">
        <div className="text-sm text-gray-600">
          Session {timerState.sessionCount + 1} of {settings.sessionsUntilLongBreak}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {timerState.isBreak ? 'Take a break!' : 'Stay focused!'}
        </div>
      </div>

      {/* Quick Settings */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Quick Settings</span>
          <Settings className="h-4 w-4 text-gray-400" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => {
              setSettings(prev => ({ ...prev, focusTime: 15 }));
              resetTimer();
            }}
            className={`text-xs px-2 py-1 rounded ${
              settings.focusTime === 15 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            15m
          </button>
          <button
            onClick={() => {
              setSettings(prev => ({ ...prev, focusTime: 25 }));
              resetTimer();
            }}
            className={`text-xs px-2 py-1 rounded ${
              settings.focusTime === 25 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            25m
          </button>
          <button
            onClick={() => {
              setSettings(prev => ({ ...prev, focusTime: 45 }));
              resetTimer();
            }}
            className={`text-xs px-2 py-1 rounded ${
              settings.focusTime === 45 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            45m
          </button>
        </div>
      </div>
    </div>
  );
}
