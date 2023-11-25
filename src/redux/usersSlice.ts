import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, usersAPI } from "../components/api/usersAPI";
import { AppDispatch } from "./store";

export interface UsersState {
  users: User[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
}

const initialState: UsersState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
};

interface AsyncThunkConfig {
  dispatch: AppDispatch;
  state: { usersPage: UsersState };
  extra: any;
}

export const getUsers = createAsyncThunk<void, { currentPage: number, pageSize: number }, AsyncThunkConfig>('usersPage/getUsers',
  async ({ currentPage, pageSize }, { dispatch }) => {
    dispatch(usersSlice.actions.toggleIsFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(usersSlice.actions.toggleIsFetching(false));
    dispatch(usersSlice.actions.setUsers(data.items));
    dispatch(usersSlice.actions.setTotalUsersCount(data.totalCount));
  })

export const unfollowUser = createAsyncThunk<void, number, AsyncThunkConfig>('usersPage/unfollowUser',
  async (id, { dispatch }) => {
    dispatch(usersSlice.actions.toogleIsFollowingProgress({ fetching: true, id: id }));
    const data = await usersAPI.unfollow(id);
    if (data.resultCode === 0) {
      dispatch(usersSlice.actions.unfollow(id));
    }
    dispatch(usersSlice.actions.toogleIsFollowingProgress({ fetching: false, id: id }));
  })

export const followUser = createAsyncThunk<void, number, AsyncThunkConfig>('usersPage/followUser',
  async (id, { dispatch }) => {
    dispatch(usersSlice.actions.toogleIsFollowingProgress({ fetching: true, id: id }));
    const data = await usersAPI.follow(id);
    if (data.resultCode === 0) {
      dispatch(usersSlice.actions.follow(id));
    }
    dispatch(usersSlice.actions.toogleIsFollowingProgress({ fetching: false, id: id }));
  })

export const usersSlice = createSlice({
  name: 'usersPage',
  initialState,
  reducers: {
    follow: (state, action: PayloadAction<number>) => {
      state.users = state.users.map(u => u.id === action.payload ? { ...u, followed: true } : u);
    },
    unfollow: (state, action: PayloadAction<number>) => {
      state.users = state.users.map(u => u.id === action.payload ? { ...u, followed: false } : u);
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalUsersCount: (state, action: PayloadAction<number>) => {
      state.totalUsersCount = action.payload;
    },
    toggleIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    toogleIsFollowingProgress: (state, action: PayloadAction<{ fetching: boolean; id: number }>) => {
      const { fetching, id } = action.payload;
      state.followingInProgress = fetching
        ? [...state.followingInProgress, id]
        : state.followingInProgress.filter(userId => userId !== id);
    }
  }
});

export const { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching,
  toogleIsFollowingProgress } = usersSlice.actions;
export const selectUsers = (state: { usersPage: UsersState }) => state.usersPage.users;
export const selectPageSize = (state: { usersPage: UsersState }) => state.usersPage.pageSize;
export const selectTotalUsersCount = (state: { usersPage: UsersState }) => state.usersPage.totalUsersCount;
export const selectCurrentPage = (state: { usersPage: UsersState }) => state.usersPage.currentPage;
export const selectIsFetching = (state: { usersPage: UsersState }) => state.usersPage.isFetching;
export const selectFollowingInProgress = (state: { usersPage: UsersState }) => state.usersPage.followingInProgress;

export default usersSlice.reducer;