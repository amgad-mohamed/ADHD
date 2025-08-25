# ADHD Focus App

A comprehensive web application designed to help individuals with ADHD organize their day, reduce distractions, and improve task commitment through smart task management, adaptive focus planning, and progress tracking.

## Features

### 🔐 Authentication System
- **User Registration**: Sign up with name, email, password, and role selection (user/doctor/parent)
- **User Login**: Secure authentication with email and password
- **Role-based Access**: Different interfaces for users, doctors, and parents
- **Profile Management**: Edit personal information, change password, upload avatar

### ⚡ Quick Actions (Floating Button)
- **Start Focus Session**: Begin a 25-minute focused work session
- **Add Quick Task**: Create a new task in under 30 seconds
- **Take a Break**: 5-minute break with guided breathing
- **Mood Check-in**: Quick emotional state assessment
- **Rescue Mode**: Emergency focus recovery protocol with step-by-step guidance

### 👨‍⚕️ Doctors Directory
- **Doctor Search**: Find ADHD specialists and healthcare professionals
- **Filtering**: Search by specialty, rating, and availability
- **Doctor Profiles**: View detailed information, reviews, and available slots
- **Appointment Booking**: Schedule consultations with available time slots

### 📊 Dashboard & Analytics
- **Focus Timer**: Customizable Pomodoro timer with smart breaks
- **Task Management**: Create, organize, and track daily tasks
- **Progress Charts**: Visual progress reports and insights
- **Smart Suggestions**: AI-powered recommendations based on user patterns

### 🎯 Smart Features
- **Adaptive Focus Planning**: AI-powered session planning based on peak focus hours
- **Task Breakdown**: Break down complex tasks into manageable subtasks
- **Progress Tracking**: Visual progress reports and achievement celebrations
- **Privacy First**: All data processed locally with user privacy in mind

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd adhd-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
adhd-app/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── dashboard/          # Main dashboard page
│   │   ├── login/             # Authentication pages
│   │   ├── register/
│   │   ├── doctors/           # Doctors directory
│   │   ├── profile/           # User profile management
│   │   └── onboarding/        # User onboarding flow
│   ├── components/            # Reusable React components
│   │   ├── FocusTimer.tsx     # Pomodoro timer component
│   │   ├── QuickActions.tsx   # Quick actions sidebar
│   │   ├── FloatingQuickActions.tsx # Floating action button
│   │   ├── TaskList.tsx       # Task management
│   │   ├── ProgressChart.tsx  # Analytics and charts
│   │   └── ProtectedRoute.tsx # Authentication wrapper
│   ├── contexts/              # React Context providers
│   │   └── AuthContext.tsx    # Authentication state management
│   └── lib/                   # Utility functions and API
│       ├── auth.ts           # Authentication API utilities
│       └── doctors.ts        # Doctors API utilities
├── public/                    # Static assets
└── package.json
```

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user (with token)

### Doctors
- `GET /doctors` - List all doctors with filters
- `GET /doctors/:id` - Get doctor details
- `POST /doctors/:id/book` - Book appointment

### Profile
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## Features in Detail

### Quick Actions Floating Button
The floating quick actions button provides instant access to common tasks:
- **Location**: Bottom-right corner of the screen
- **Animation**: Smooth expand/collapse with Framer Motion
- **Actions**: Focus session, quick task, break, mood check, rescue mode
- **Smart Suggestions**: Context-aware recommendations

### Rescue Mode
Emergency focus recovery protocol with three steps:
1. **Clear Your Space** (2 minutes) - Organize immediate workspace
2. **Guided Breathing** (1 minute) - Reset with focused breathing
3. **Tiny Starter Task** (1 minute) - Build momentum with small wins

### Doctor Booking System
- **Search & Filter**: Find doctors by specialty and rating
- **Profile View**: Detailed information and reviews
- **Slot Booking**: Available time slots with duration
- **Confirmation**: Booking confirmation and reminders

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@adhdfocus.com or create an issue in the repository.

## Roadmap

- [ ] Backend API implementation
- [ ] Real-time notifications
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Integration with calendar apps
- [ ] Voice commands and accessibility features
- [ ] Community features and support groups
# ADHD
