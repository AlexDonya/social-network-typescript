import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../components/api/authAPI";
import { AppDispatch } from "./store";

export interface AuthState {
  userId: number | null;
  login: string | null;
  email: string | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  userId: null,
  login: null,
  email: null,
  isAuth: true,
}

// Thunks
export const isAuthUser = createAsyncThunk<void, void, { dispatch: AppDispatch }>('auth/isAuth',
  async (_, { dispatch }) => {
    const data = await authAPI.authMe();
    // console.log(data);
    if (data.resultCode !== 0) {
      dispatch(authSlice.actions.setIsAuth());
    }
  })

export const authMe = createAsyncThunk<void, void, { dispatch: AppDispatch }>('auth/authenticate',
  async (_, { dispatch }) => {
    const data = await authAPI.authMe();
    try {
      if (data.resultCode === 0) {
        const { id, login, email } = data.data;
        dispatch(authSlice.actions.setUserData({ id, login, email }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  })

export interface AuthLoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const authLogin = createAsyncThunk<void, AuthLoginPayload, { dispatch: AppDispatch }>('auth/LogIn',
  async ({ email, password, rememberMe },
    { dispatch }) => {
    const data = await authAPI.authLogin(email, password, rememberMe);
    if (data.resultCode === 0) {
      let { userId } = data.data;
      dispatch(authSlice.actions.setLoginUserId(userId));
    }
  })

export const authLogout = createAsyncThunk<void, void, { dispatch: AppDispatch }>('auth/Logout',
  async (_, { dispatch }) => {
    const data = await authAPI.authLogout();
    if (data.resultCode === 0) {
      dispatch(authSlice.actions.userLogOut());
    }
  })


// Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state) => {
      state.isAuth = false;
    },
    setUserData: (state, action: PayloadAction<{ id: number; login: string; email: string; }>) => {
      const { id, login, email } = action.payload;
      state.userId = id;
      state.login = login;
      state.email = email;
    },
    setLoginUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
      state.isAuth = true;
    },
    userLogOut: (state) => {
      state.userId = null;
      state.login = null;
      state.email = null;
      state.isAuth = false;
    }
  }
});

export const { } = authSlice.actions;
export const selectAuthData = (state: { auth: AuthState }) => state.auth;

export default authSlice.reducer;