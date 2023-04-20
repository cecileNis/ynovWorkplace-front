import { createSlice } from "@reduxjs/toolkit";

const threadSlice = createSlice({
  name: "thread",
  initialState: {
    threads: [],
  },
  reducers: {
    setThreads: (state, action) => {
      console.log(action.payload);
      state.threads = action.payload;
    },
    deleteFromThreads: (state, action) => {
      state.threads = state.threads.filter((thread) => thread.id !== action.payload.id);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setThreads, deleteFromThreads } = threadSlice.actions;

export default threadSlice.reducer;
