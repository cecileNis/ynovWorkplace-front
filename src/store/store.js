import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/user';
import authSlice from './reducers/auth';

export const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice
  }
})
