import { User, UserCreate, UserUpdate, UserStats, Role, Permission } from '@/types/user';

const API_BASE = '/api';

class UserService {
  async getUsers(skip = 0, limit = 100): Promise<User[]> {
    try {
      const response = await fetch(`${API_BASE}/users/?skip=${skip}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const response = await fetch(`${API_BASE}/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async createUser(userData: UserCreate): Promise<User> {
    try {
      const response = await fetch(`${API_BASE}/users/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(id: number, userData: UserUpdate): Promise<User> {
    try {
      const response = await fetch(`${API_BASE}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async getUserStats(): Promise<UserStats> {
    // Mock implementation for now - replace with actual API call when available
    const users = await this.getUsers(0, 1000);
    const activeUsers = users.filter(u => u.isActive);
    const adminUsers = users.filter(u => u.role === 'admin');
    
    return {
      totalUsers: users.length,
      activeUsers: activeUsers.length,
      adminUsers: adminUsers.length,
      totalDepartments: 5, // Mock value
      newUsersThisMonth: 12, // Mock value
      lastMonthGrowth: 15.2, // Mock value
    };
  }

  async getRoles(): Promise<Role[]> {
    // Mock implementation - replace with actual API call when available
    return [
      {
        id: '1',
        name: 'Admin',
        description: 'Full system access with all permissions',
        permissions: ['read', 'write', 'delete', 'manage_users', 'system_config'],
        userCount: 2,
        isSystem: true,
      },
      {
        id: '2',
        name: 'Moderator',
        description: 'Can moderate content and manage basic settings',
        permissions: ['read', 'write', 'moderate_content'],
        userCount: 3,
        isSystem: true,
      },
      {
        id: '3',
        name: 'User',
        description: 'Standard user with basic access permissions',
        permissions: ['read', 'write'],
        userCount: 15,
        isSystem: true,
      },
      {
        id: '4',
        name: 'Viewer',
        description: 'Read-only access to system resources',
        permissions: ['read'],
        userCount: 5,
        isSystem: true,
      },
    ];
  }

  async getPermissions(): Promise<Permission[]> {
    // Mock implementation - replace with actual API call when available
    return [
      {
        id: '1',
        name: 'Read',
        description: 'View content and data',
        category: 'Content',
        resource: '*',
        action: 'read',
      },
      {
        id: '2',
        name: 'Write',
        description: 'Create and edit content',
        category: 'Content',
        resource: '*',
        action: 'write',
      },
      {
        id: '3',
        name: 'Delete',
        description: 'Remove content and data',
        category: 'Content',
        resource: '*',
        action: 'delete',
      },
      {
        id: '4',
        name: 'Manage Users',
        description: 'Create, edit, and delete user accounts',
        category: 'User Management',
        resource: 'users',
        action: 'manage',
      },
      {
        id: '5',
        name: 'System Config',
        description: 'Modify system configuration',
        category: 'Administration',
        resource: 'system',
        action: 'configure',
      },
    ];
  }
}

export const userService = new UserService();
