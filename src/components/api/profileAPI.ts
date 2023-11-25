import { UserProfileType } from "../../types/types.ts";
import instance from "./instanceAPI.ts";

// export interface ProfileData extends UserProfileType {
//   id: number;
//   name: string;
// }

// export interface StatusData {
//   status: string;
// }

export const profileAPI = {
  async getUserProfile(id: number): Promise<UserProfileType> {
    try {
      const response = await instance.get<UserProfileType>(`profile/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to get user profile');
    }
  },
  async getUserStatus(id: number): Promise<string> {
    try {
      const response = await instance.get<string>(`profile/status/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to get user status');
    }
  },
  async updateUserStatus(status: string): Promise<any | undefined> {
    try {
      await instance.put<string, undefined>(`profile/status`, { status });
    } catch (error) {
      throw new Error('Failed to update user status');
    }
  }
};