export interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  cognitoSub?: string;
}

export enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator", 
  USER = "user",
  VIEWER = "viewer"
}

export interface UserCreate {
  username: string;
  email: string;
  fullName?: string;
  role: UserRole;
}

export interface UserUpdate {
  username?: string;
  email?: string;
  fullName?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  resource: string;
  action: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  totalDepartments: number;
  newUsersThisMonth: number;
  lastMonthGrowth: number;
}
