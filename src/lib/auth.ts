export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'doctor' | 'parent';
  profile?: {
    avatar?: string | null;
    preferences?: {
      theme: string;
      notifications: boolean;
    };
  };
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'doctor' | 'parent';
}

// API base URL - you'll need to update this to your actual backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Mock data for testing
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    profile: {
      avatar: null,
      preferences: {
        theme: 'light',
        notifications: true,
      },
    },
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    email: 'sarah@example.com',
    role: 'doctor',
    profile: {
      avatar: null,
      preferences: {
        theme: 'light',
        notifications: true,
      },
    },
  },
  {
    id: '3',
    name: 'Maria Smith',
    email: 'maria@example.com',
    role: 'parent',
    profile: {
      avatar: null,
      preferences: {
        theme: 'dark',
        notifications: false,
      },
    },
  },
];

// Mock tokens for testing
const mockTokens: Record<string, string> = {
  'john@example.com': 'mock_token_john_123',
  'sarah@example.com': 'mock_token_sarah_456',
  'maria@example.com': 'mock_token_maria_789',
};

export const authAPI = {
  async register(data: RegisterData): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email === data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      name: data.name,
      email: data.email,
      role: data.role,
      profile: {
        avatar: null,
        preferences: {
          theme: 'light',
          notifications: true,
        },
      },
    };

    // Add to mock users
    mockUsers.push(newUser);
    mockTokens[data.email] = `mock_token_${data.email}_${Date.now()}`;

    return {
      token: mockTokens[data.email],
      user: newUser,
    };
  },

  async login(data: LoginData): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user by email
    const user = mockUsers.find(u => u.email === data.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // For demo purposes, accept any password for existing users
    // In a real app, you would verify the password hash
    if (!mockTokens[data.email]) {
      mockTokens[data.email] = `mock_token_${data.email}_${Date.now()}`;
    }

    return {
      token: mockTokens[data.email],
      user,
    };
  },

  async getCurrentUser(token: string): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find user by token
    const email = Object.keys(mockTokens).find(key => mockTokens[key] === token);
    if (!email) {
      throw new Error('Invalid token');
    }

    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  },
};

// Local storage utilities
export const authStorage = {
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  },

  setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('auth_token', token);
  },

  removeToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('auth_token');
  },

  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('auth_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  setUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('auth_user', JSON.stringify(user));
  },

  removeUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('auth_user');
  },

  clear(): void {
    this.removeToken();
    this.removeUser();
  },
};
