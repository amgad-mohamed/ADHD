export interface User {
  id: number;
  name: string;
  email: string;
  token_balance: number;
  streak_days: number;
  level: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  token_reward: number;
  category: 'daily' | 'weekly' | 'special';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserTask {
  id: number;
  user_id: number;
  task_id: number;
  status: 'pending' | 'completed';
  completion_date?: string;
  assigned_date: string;
}

export interface Reward {
  id: number;
  name: string;
  description: string;
  token_cost: number;
  category: 'discount' | 'content' | 'premium' | 'physical';
  available: boolean;
  image_url?: string;
}

export interface TokenTransaction {
  id: number;
  user_id: number;
  type: 'earn' | 'spend' | 'bonus';
  amount: number;
  description: string;
  date: string;
  related_task_id?: number;
  related_reward_id?: number;
}

export interface Redemption {
  id: number;
  user_id: number;
  reward_id: number;
  tokens_spent: number;
  date: string;
}

// Mock Data
const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    token_balance: 25,
    streak_days: 7,
    level: 3
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    token_balance: 15,
    streak_days: 3,
    level: 2
  }
];

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Take morning medication",
    description: "Take your prescribed medication at 8:00 AM",
    token_reward: 5,
    category: "daily",
    difficulty: "easy"
  },
  {
    id: 2,
    title: "Complete 30-minute exercise",
    description: "Do your daily physical activity routine",
    token_reward: 10,
    category: "daily",
    difficulty: "medium"
  },
  {
    id: 3,
    title: "Practice mindfulness",
    description: "Spend 15 minutes in meditation or deep breathing",
    token_reward: 8,
    category: "daily",
    difficulty: "easy"
  },
  {
    id: 4,
    title: "Complete weekly review",
    description: "Review your progress and plan for next week",
    token_reward: 15,
    category: "weekly",
    difficulty: "hard"
  },
  {
    id: 5,
    title: "Read for 20 minutes",
    description: "Read a book or article of your choice",
    token_reward: 7,
    category: "daily",
    difficulty: "medium"
  }
];

const mockUserTasks: UserTask[] = [
  {
    id: 1,
    user_id: 1,
    task_id: 1,
    status: "completed",
    completion_date: "2025-01-14T08:30:00Z",
    assigned_date: "2025-01-14T00:00:00Z"
  },
  {
    id: 2,
    user_id: 1,
    task_id: 2,
    status: "pending",
    assigned_date: "2025-01-14T00:00:00Z"
  },
  {
    id: 3,
    user_id: 1,
    task_id: 3,
    status: "completed",
    completion_date: "2025-01-14T12:00:00Z",
    assigned_date: "2025-01-14T00:00:00Z"
  },
  {
    id: 4,
    user_id: 1,
    task_id: 4,
    status: "pending",
    assigned_date: "2025-01-14T00:00:00Z"
  },
  {
    id: 5,
    user_id: 1,
    task_id: 5,
    status: "pending",
    assigned_date: "2025-01-14T00:00:00Z"
  }
];

const mockRewards: Reward[] = [
  {
    id: 1,
    name: "10% Therapy Session Discount",
    description: "Get 10% off your next therapy session with any of our certified therapists",
    token_cost: 20,
    category: "discount",
    available: true,
    image_url: "/api/placeholder/100/100"
  },
  {
    id: 2,
    name: "Premium Video Content",
    description: "Unlock exclusive ADHD management videos and guided sessions",
    token_cost: 15,
    category: "content",
    available: true,
    image_url: "/api/placeholder/100/100"
  },
  {
    id: 3,
    name: "Custom Focus Timer",
    description: "Get a personalized focus timer with your preferred settings",
    token_cost: 25,
    category: "premium",
    available: true,
    image_url: "/api/placeholder/100/100"
  },
  {
    id: 4,
    name: "Weekly Progress Report",
    description: "Detailed weekly progress analysis and recommendations",
    token_cost: 12,
    category: "premium",
    available: true,
    image_url: "/api/placeholder/100/100"
  },
  {
    id: 5,
    name: "ADHD Workbook",
    description: "Physical workbook with exercises and strategies",
    token_cost: 50,
    category: "physical",
    available: true,
    image_url: "/api/placeholder/100/100"
  }
];

const mockTransactions: TokenTransaction[] = [
  {
    id: 1,
    user_id: 1,
    type: "earn",
    amount: 5,
    description: "Completed Task: Take morning medication",
    date: "2025-01-14T08:30:00Z",
    related_task_id: 1
  },
  {
    id: 2,
    user_id: 1,
    type: "earn",
    amount: 8,
    description: "Completed Task: Practice mindfulness",
    date: "2025-01-14T12:00:00Z",
    related_task_id: 3
  },
  {
    id: 3,
    user_id: 1,
    type: "bonus",
    amount: 3,
    description: "Daily streak bonus (7 days)",
    date: "2025-01-14T00:00:00Z"
  },
  {
    id: 4,
    user_id: 1,
    type: "spend",
    amount: 15,
    description: "Redeemed: Premium Video Content",
    date: "2025-01-13T16:20:00Z",
    related_reward_id: 2
  }
];

const mockRedemptions: Redemption[] = [
  {
    id: 1,
    user_id: 1,
    reward_id: 2,
    tokens_spent: 15,
    date: "2025-01-13T16:20:00Z"
  }
];

// API Functions
export const rewardsAPI = {
  // Get current user (simulating authenticated user)
  async getCurrentUser(): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUsers[0]; // Return first user as current user
  },

  // Get user's tasks
  async getUserTasks(): Promise<{ tasks: (Task & { status: string; completion_date?: string })[] }> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const userTasks = mockUserTasks.filter(ut => ut.user_id === 1);
    const tasksWithStatus = userTasks.map(ut => {
      const task = mockTasks.find(t => t.id === ut.task_id)!;
      return {
        ...task,
        status: ut.status,
        completion_date: ut.completion_date
      };
    });
    
    return { tasks: tasksWithStatus };
  },

  // Complete a task
  async completeTask(taskId: number): Promise<{ 
    status: 'success' | 'error'; 
    message: string; 
    tokens_earned?: number; 
    new_balance?: number;
    streak_bonus?: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userTask = mockUserTasks.find(ut => ut.user_id === 1 && ut.task_id === taskId);
    if (!userTask) {
      return { status: 'error', message: 'Task not found' };
    }
    
    if (userTask.status === 'completed') {
      return { status: 'error', message: 'Task already completed' };
    }
    
    const task = mockTasks.find(t => t.id === taskId)!;
    const user = mockUsers[0];
    
    // Update task status
    userTask.status = 'completed';
    userTask.completion_date = new Date().toISOString();
    
    // Add tokens
    user.token_balance += task.token_reward;
    
    // Check for daily streak bonus
    const todayTasks = mockUserTasks.filter(ut => 
      ut.user_id === 1 && 
      ut.assigned_date.startsWith(new Date().toISOString().split('T')[0])
    );
    const completedToday = todayTasks.filter(ut => ut.status === 'completed').length;
    const totalToday = todayTasks.length;
    
    let streakBonus = 0;
    if (completedToday === totalToday && totalToday > 0) {
      streakBonus = 3;
      user.token_balance += streakBonus;
      user.streak_days += 1;
    }
    
    // Add transaction record
    const newTransaction: TokenTransaction = {
      id: mockTransactions.length + 1,
      user_id: 1,
      type: 'earn',
      amount: task.token_reward,
      description: `Completed Task: ${task.title}`,
      date: new Date().toISOString(),
      related_task_id: taskId
    };
    mockTransactions.push(newTransaction);
    
    if (streakBonus > 0) {
      const bonusTransaction: TokenTransaction = {
        id: mockTransactions.length + 1,
        user_id: 1,
        type: 'bonus',
        amount: streakBonus,
        description: `Daily streak bonus (${user.streak_days} days)`,
        date: new Date().toISOString()
      };
      mockTransactions.push(bonusTransaction);
    }
    
    return {
      status: 'success',
      message: 'Task completed successfully!',
      tokens_earned: task.token_reward,
      new_balance: user.token_balance,
      streak_bonus: streakBonus
    };
  },

  // Get rewards
  async getRewards(): Promise<{ rewards: Reward[]; user_balance: number }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { 
      rewards: mockRewards.filter(r => r.available), 
      user_balance: mockUsers[0].token_balance 
    };
  },

  // Redeem reward
  async redeemReward(rewardId: number): Promise<{
    status: 'success' | 'error';
    message: string;
    tokens_spent?: number;
    new_balance?: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const reward = mockRewards.find(r => r.id === rewardId);
    if (!reward) {
      return { status: 'error', message: 'Reward not found' };
    }
    
    if (!reward.available) {
      return { status: 'error', message: 'Reward is not available' };
    }
    
    const user = mockUsers[0];
    if (user.token_balance < reward.token_cost) {
      return { status: 'error', message: 'Insufficient token balance' };
    }
    
    // Deduct tokens
    user.token_balance -= reward.token_cost;
    
    // Add redemption record
    const newRedemption: Redemption = {
      id: mockRedemptions.length + 1,
      user_id: 1,
      reward_id: rewardId,
      tokens_spent: reward.token_cost,
      date: new Date().toISOString()
    };
    mockRedemptions.push(newRedemption);
    
    // Add transaction record
    const newTransaction: TokenTransaction = {
      id: mockTransactions.length + 1,
      user_id: 1,
      type: 'spend',
      amount: reward.token_cost,
      description: `Redeemed: ${reward.name}`,
      date: new Date().toISOString(),
      related_reward_id: rewardId
    };
    mockTransactions.push(newTransaction);
    
    return {
      status: 'success',
      message: 'Reward redeemed successfully!',
      tokens_spent: reward.token_cost,
      new_balance: user.token_balance
    };
  },

  // Get wallet/transaction history
  async getWalletHistory(): Promise<{
    current_balance: number;
    transactions: TokenTransaction[];
    user: User;
  }> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const userTransactions = mockTransactions
      .filter(t => t.user_id === 1)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return {
      current_balance: mockUsers[0].token_balance,
      transactions: userTransactions,
      user: mockUsers[0]
    };
  }
};
