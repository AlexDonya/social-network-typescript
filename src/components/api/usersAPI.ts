import instance from "./instanceAPI.ts"

export interface UsersResponse {
  items: User[];
  totalCount: number;
  error?: string;
}

export interface User {
  id: number;
  name: string;
  photos: {
    small: string | null;
    large: string | null;
  };
  status: string | null;
  followed: boolean;
}

export interface FollowData {
  resultCode: number;
  messages: string[];
}

export const usersAPI = {
  async getUsers(currentPage: number, pageSize: number): Promise<UsersResponse> {
    try {
      const response = await instance.get<UsersResponse>(`users?page=${currentPage}&count=${pageSize}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  },
  async unfollow(id: number): Promise<FollowData> {
    try {
      const response = await instance.delete<FollowData>(`follow/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to unfollow user');
    }
  },
  async follow(id: number): Promise<FollowData> {
    try {
      const response = await instance.post<FollowData>(`follow/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to follow user');
    }
  }
}