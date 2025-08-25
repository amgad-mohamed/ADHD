"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Check,
  CheckCircle2,
  Clock,
  Target,
  Calendar,
  MessageSquare,
} from "lucide-react";

export interface AppNotification {
  id: string;
  type: "reminder" | "achievement" | "booking" | "message";
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
}

const mockNotifications: AppNotification[] = [
  {
    id: "n1",
    type: "reminder",
    title: "Focus session reminder",
    description: "Time to start your 25m focus session.",
    createdAt: "2025-01-14 09:00",
    read: false,
  },
  {
    id: "n2",
    type: "achievement",
    title: "Great job!",
    description: "You've completed 3 tasks today.",
    createdAt: "2025-01-14 10:10",
    read: false,
  },
  {
    id: "n3",
    type: "booking",
    title: "Appointment confirmed",
    description: "Your booking with Dr. Johnson is confirmed.",
    createdAt: "2025-01-13 16:20",
    read: true,
  },
  {
    id: "n4",
    type: "message",
    title: "New message",
    description: "Dr. Chen sent you a message.",
    createdAt: "2025-01-12 14:05",
    read: true,
  },
];

export default function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<AppNotification[]>(mockNotifications);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const iconFor = (type: AppNotification["type"]) => {
    switch (type) {
      case "reminder":
        return <Clock className="h-4 w-4 text-indigo-600" />;
      case "achievement":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "booking":
        return <Calendar className="h-4 w-4 text-purple-600" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          <div className="flex items-center justify-between px-3 py-2 border-b">
            <span className="text-sm font-medium text-gray-900">
              Notifications
            </span>
            <button
              onClick={markAllRead}
              className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center"
            >
              <Check className="h-3.5 w-3.5 mr-1" /> Mark all as read
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-sm text-gray-500">No notifications</div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`px-3 py-2 border-b last:border-b-0 ${
                    n.read ? "bg-white" : "bg-indigo-50"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {iconFor(n.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {n.title}
                        </p>
                        {!n.read && (
                          <span className="ml-2 inline-block w-2 h-2 rounded-full bg-indigo-600"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 truncate">
                        {n.description}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {n.createdAt}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
