import { ThunkAction, configureStore } from "@reduxjs/toolkit";
import profileReducer, { ProfileState } from "./profileSlice.ts";
import usersReducer, { UsersState } from "./usersSlice.js";
import dialogsReducer, { DialogsState } from "./dialogsSlice.js";
import authReducer, { AuthState } from "./authSlice.js";

export interface RootState {
	profilePage: ProfileState;
	usersPage: UsersState;
	dialogsPage: DialogsState;
	auth: AuthState;
}

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	any
>;

const store = configureStore({
	reducer: {
		profilePage: profileReducer,
		usersPage: usersReducer,
		dialogsPage: dialogsReducer,
		auth: authReducer,
	},
	devTools: true,
})

if (typeof window !== 'undefined') {
	(window as any).store = store;
}

export default store;

// import { configureStore, ThunkAction } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";
// import profileReducer, { ProfileState } from "./profileSlice";
// import usersReducer, { UsersState } from "./usersSlice";
// import dialogsReducer, { DialogsState } from "./dialogsSlice";
// import authReducer, { AuthState } from "./authSlice";

// export interface RootState {
// 	profilePage: ProfileState;
// 	usersPage: UsersState;
// 	dialogsPage: DialogsState;
// 	auth: AuthState;
// }

// export type AppDispatch = typeof store.dispatch;

// const store = configureStore({
// 	reducer: {
// 		profilePage: profileReducer,
// 		usersPage: usersReducer,
// 		dialogsPage: dialogsReducer,
// 		auth: authReducer,
// 	},
// 	devTools: true,
// });

// export default store;

// export type AppThunk = ThunkAction<void, RootState, unknown, any>;

// if (typeof window !== 'undefined') {
// 	(window as any).store = store;
// }