import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  email: string;
  firstname: string;
  lastname: string;
  role: string;
}

export interface IAuth {
  user: IUser;
  isLogin: boolean;
}

const initialState: IAuth = {
  user: {
    email: "",
    firstname: "",
    lastname: "",
    role: "",
  },
  isLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin: (state: IAuth, action: PayloadAction<IAuth>) => {
      state.user.email = action.payload.user.email;
      state.user.firstname = action.payload.user.firstname;
      state.user.lastname = action.payload.user.lastname;
      state.user.role = action.payload.user.role;
      state.isLogin = true;
    },
    onLogout: (state: IAuth) => {
      state.user.email = "";
      state.user.firstname = "";
      state.user.lastname = "";
      state.user.role = "";
      state.isLogin = false;
    },
  },
});

export const { onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
