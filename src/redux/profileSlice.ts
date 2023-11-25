import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profileAPI } from "../components/api/profileAPI.ts";
import { AppDispatch } from "./store.ts";
import { UserProfileType } from "../types/types.ts";

interface Post {
  id: number;
  message: string;
  likes: number;
}

export interface ProfileState {
  posts: Post[];
  newPostText: string;
  profile: UserProfileType | null;
  status: string;
}

const initialState: ProfileState = {
  posts: [
    { id: 1, message: "Hello! What's up??", likes: 12, },
    { id: 2, message: 'Yo!', likes: 15, },
    { id: 3, message: 'Good day!', likes: 10, },
    { id: 4, message: "Basketball, it's wonderful game!", likes: 25, },
    { id: 5, message: "Every day, it's your chance!", likes: 38, },
  ],
  newPostText: 'New post text...',
  profile: null,
  status: '',
};

// Thunks
export const getUserProfile = createAsyncThunk<void, number, { dispatch: AppDispatch }>('profilePage/getUserProfile',
  async (userId, { dispatch }) => {
    const data = await profileAPI.getUserProfile(userId);
    dispatch(setUserProfile(data));
  })

export const getUserStatus = createAsyncThunk<void, number, { dispatch: AppDispatch }>('profilePage/getUserStatus',
  async (userId, { dispatch }) => {
    const data = await profileAPI.getUserStatus(userId);
    dispatch(setUserStatus(data));
  })

export const updateUserStatus = createAsyncThunk<void, string, { dispatch: any }>('profilePage/updateUserStatus',
  async (status: string, { dispatch }) => {
    await profileAPI.updateUserStatus(status);
    dispatch(setUserStatus(status));
  })

// Slice
export const profileSlice = createSlice({
  name: 'profilePage',
  initialState,
  reducers: {
    addPost: (state) => {
      const newPost: Post = {
        id: state.posts.length + 1,
        message: state.newPostText,
        likes: 0
      }
      state.posts.push(newPost);
      state.newPostText = '';
    },
    updateNewPostText: (state, action: PayloadAction<string>) => {
      state.newPostText = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<UserProfileType | null>) => {
      state.profile = action.payload;
    },
    setUserStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    }
  }
})

export const { addPost, updateNewPostText, setUserProfile, setUserStatus } = profileSlice.actions;
export const selectPosts = (state: { profilePage: ProfileState }) => state.profilePage.posts;
export const selectNewPostText = (state: { profilePage: ProfileState }) => state.profilePage.newPostText;
export const selectUserProfile = (state: { profilePage: ProfileState }) => state.profilePage.profile;
export const selectUserStatus = (state: { profilePage: ProfileState }) => state.profilePage.status;

export default profileSlice.reducer;