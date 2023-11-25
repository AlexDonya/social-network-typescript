export interface UserProfileType {
  fullName: string;
  userId: number;
  photos: {
    small: string | null;
    large: string | null;
  };
}