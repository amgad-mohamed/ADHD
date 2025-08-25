"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, CheckCircle } from "lucide-react";
import { TimeSlot } from "@/lib/doctors";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorName: string;
  slots: TimeSlot[];
  onConfirm: (
    slotId: string
  ) => Promise<{ success: boolean; bookingId?: string }>;
}

export default function BookingModal({
  isOpen,
  onClose,
  doctorName,
  slots,
  onConfirm,
}: BookingModalProps) {
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBookingId, setSuccessBookingId] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!selectedSlotId) return;
    setIsSubmitting(true);
    try {
      const res = await onConfirm(selectedSlotId);
      if (res.success && res.bookingId) {
        setSuccessBookingId(res.bookingId);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Book Appointment
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {successBookingId ? (
              <div className="text-center py-6">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <p className="text-gray-800 font-medium">Booking confirmed!</p>
                <p className="text-sm text-gray-500">
                  Confirmation ID: {successBookingId}
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Select an available slot with {doctorName}.
                </p>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {slots
                    .filter((s) => s.isAvailable)
                    .map((slot) => (
                      <label
                        key={slot.id}
                        className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer transition-colors ${
                          selectedSlotId === slot.id
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-4 w-4 text-indigo-600" />
                          <span className="text-sm font-medium text-gray-900">
                            {slot.date}
                          </span>
                          <Clock className="h-4 w-4 text-indigo-600 ml-2" />
                          <span className="text-sm text-gray-700">
                            {slot.time} • {slot.duration}m
                          </span>
                        </div>
                        <input
                          type="radio"
                          name="slot"
                          value={slot.id}
                          checked={selectedSlotId === slot.id}
                          onChange={() => setSelectedSlotId(slot.id)}
                        />
                      </label>
                    ))}
                </div>

                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={!selectedSlotId || isSubmitting}
                    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {isSubmitting ? "Booking..." : "Confirm Booking"}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
