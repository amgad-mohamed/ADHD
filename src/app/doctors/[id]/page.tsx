"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Star,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  Check,
} from "lucide-react";
import { Doctor, mockDoctors, doctorsAPI } from "@/lib/doctors";
import BookingModal from "@/components/BookingModal";
import { useAuth } from "@/contexts/AuthContext";

export default function DoctorDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const doctorId = params?.id as string;
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Simulate fetching doctor by id
    const d = mockDoctors.find((doc) => doc.id === doctorId) || null;
    setDoctor(d);
    setLoading(false);

    if (searchParams?.get("tab") === "booking") {
      setIsBookingOpen(true);
    }
  }, [doctorId, searchParams]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : i < rating
            ? "text-yellow-400 fill-current opacity-50"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Doctor not found.</p>
          <Link
            href="/doctors"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Back to doctors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/doctors"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Doctors
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
              {doctor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {doctor.name}
                  </h1>
                  <p className="text-indigo-600 font-medium">
                    {doctor.specialty}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center">
                      {renderStars(doctor.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {doctor.rating} ({doctor.reviews?.length || 0} reviews)
                    </span>
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Book Appointment
                  </button>
                  <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                    Message
                  </button>
                </div>
              </div>
              {doctor.bio && <p className="mt-4 text-gray-700">{doctor.bio}</p>}

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
                  <span>
                    {doctor.availableSlots.filter((s) => s.isAvailable).length}{" "}
                    available slots
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="h-5 w-5 text-indigo-600 mr-2" />
                  <span>
                    Typical duration: {doctor.availableSlots[0]?.duration || 60}{" "}
                    minutes
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 text-indigo-600 mr-2" />
                  <span>Online consultations available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {doctor.reviews && doctor.reviews.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Reviews
            </h2>
            <div className="space-y-4">
              {doctor.reviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-700">
                        {review.userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {review.userName}
                        </p>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          doctorName={doctor.name}
          slots={doctor.availableSlots}
          onConfirm={async (slotId) => {
            // Simulate booking
            await new Promise((r) => setTimeout(r, 800));
            return { success: true, bookingId: `BK-${Date.now()}` };
          }}
        />
      </div>
    </div>
  );
}
