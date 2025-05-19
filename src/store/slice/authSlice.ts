import { IAuth } from "@/interfaces/auth.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAuth = {
  user: {
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
    role: "",
    referral_code: "",
    profile_picture: "",
  },
  isLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin: (state: IAuth, action: PayloadAction<IAuth>) => {
      state.user.id = action.payload.user.id;
      state.user.email = action.payload.user.email;
      state.user.first_name = action.payload.user.first_name;
      state.user.last_name = action.payload.user.last_name;
      state.user.role = action.payload.user.role;
      state.user.referral_code = action.payload.user.referral_code;
      state.user.profile_picture = action.payload.user.profile_picture;
      state.isLogin = true;
    },
    onLogout: (state: IAuth) => {
      state.user.id = 0;
      state.user.email = "";
      state.user.first_name = "";
      state.user.last_name = "";
      state.user.role = "";
      state.user.referral_code = "";
      state.user.profile_picture = "";
      state.isLogin = false;
    },
  },
});

export const { onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
