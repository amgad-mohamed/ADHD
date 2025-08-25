export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio?: string;
  rating: number;
  availableSlots: TimeSlot[];
  reviews?: Review[];
  avatar?: string;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  duration: number; // in minutes
  isAvailable: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BookingRequest {
  slotId: string;
  userId: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId: string;
}

// API base URL - you'll need to update this to your actual backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const doctorsAPI = {
  async getDoctors(filters?: {
    specialty?: string;
    rating?: number;
  }): Promise<Doctor[]> {
    const params = new URLSearchParams();
    if (filters?.specialty) params.append('specialty', filters.specialty);
    if (filters?.rating) params.append('rating', filters.rating.toString());

    const response = await fetch(`${API_BASE_URL}/doctors?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }

    return response.json();
  },

  async getDoctor(id: string): Promise<Doctor> {
    const response = await fetch(`${API_BASE_URL}/doctors/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch doctor details');
    }

    return response.json();
  },

  async bookAppointment(doctorId: string, booking: BookingRequest): Promise<BookingResponse> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(booking),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to book appointment');
    }

    return response.json();
  },
};

// Mock data for development (remove when backend is ready)
export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'ADHD Specialist',
    bio: 'Dr. Johnson is a board-certified psychiatrist with over 15 years of experience specializing in ADHD diagnosis and treatment. She uses evidence-based approaches including medication management and behavioral therapy.',
    rating: 4.8,
    avatar: '/api/placeholder/150/150',
    availableSlots: [
      {
        id: 'slot1',
        date: '2024-01-15',
        time: '09:00',
        duration: 60,
        isAvailable: true,
      },
      {
        id: 'slot2',
        date: '2024-01-15',
        time: '14:00',
        duration: 60,
        isAvailable: true,
      },
      {
        id: 'slot3',
        date: '2024-01-16',
        time: '10:00',
        duration: 60,
        isAvailable: false,
      },
    ],
    reviews: [
      {
        id: 'review1',
        userId: 'user1',
        userName: 'John D.',
        rating: 5,
        comment: 'Dr. Johnson is amazing! She really understands ADHD and helped me develop effective strategies.',
        date: '2024-01-10',
      },
      {
        id: 'review2',
        userId: 'user2',
        userName: 'Maria S.',
        rating: 4,
        comment: 'Very knowledgeable and patient. Highly recommend for ADHD treatment.',
        date: '2024-01-08',
      },
    ],
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Child & Adolescent Psychiatry',
    bio: 'Dr. Chen specializes in working with children and adolescents with ADHD. He has extensive experience in family therapy and school collaboration.',
    rating: 4.6,
    avatar: '/api/placeholder/150/150',
    availableSlots: [
      {
        id: 'slot4',
        date: '2024-01-15',
        time: '11:00',
        duration: 45,
        isAvailable: true,
      },
      {
        id: 'slot5',
        date: '2024-01-16',
        time: '15:00',
        duration: 45,
        isAvailable: true,
      },
    ],
    reviews: [
      {
        id: 'review3',
        userId: 'user3',
        userName: 'Lisa M.',
        rating: 5,
        comment: 'Dr. Chen was wonderful with my 12-year-old son. He made the whole process comfortable.',
        date: '2024-01-12',
      },
    ],
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Clinical Psychologist',
    bio: 'Dr. Rodriguez focuses on cognitive behavioral therapy for ADHD. She helps patients develop practical coping strategies and improve executive function skills.',
    rating: 4.9,
    avatar: '/api/placeholder/150/150',
    availableSlots: [
      {
        id: 'slot6',
        date: '2024-01-15',
        time: '13:00',
        duration: 60,
        isAvailable: true,
      },
      {
        id: 'slot7',
        date: '2024-01-17',
        time: '09:00',
        duration: 60,
        isAvailable: true,
      },
    ],
    reviews: [
      {
        id: 'review4',
        userId: 'user4',
        userName: 'David K.',
        rating: 5,
        comment: 'Dr. Rodriguez helped me understand my ADHD better than anyone else. Her CBT approach is life-changing.',
        date: '2024-01-11',
      },
    ],
  },
];

