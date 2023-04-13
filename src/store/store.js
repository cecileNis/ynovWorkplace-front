import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import authSlice from "./reducers/auth";
import groupsSlice from "./reducers/groups";
import toastSlice from "./reducers/toast";

export const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    groups: groupsSlice,
    toast: toastSlice,
  },
});
