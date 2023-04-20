import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import authSlice from "./reducers/auth";
import groupSlice from "./reducers/group";
import toastSlice from "./reducers/toast";
import loadingSlice from "./reducers/loading";
import requestSlice from "./reducers/request";
import threadSlice from "./reducers/thread";
import messageSlice from "./reducers/message";

export const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    group: groupSlice,
    toast: toastSlice,
    loading: loadingSlice,
    request: requestSlice,
    thread: threadSlice,
    message: messageSlice,
  },
});
