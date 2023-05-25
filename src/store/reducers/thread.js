import { createSlice } from "@reduxjs/toolkit";

const threadSlice = createSlice({
  name: "thread",
  initialState: {
    threads: [],
    current: null,
  },
  reducers: {
    setThreads: (state, action) => {
      state.threads = action.payload;
    },
    deleteFromThreads: (state, action) => {
      state.threads = state.threads.filter((thread) => thread.id !== action.payload.id);
    },
    setCurrentThread: (state, action) => {
      state.current = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setThreads, deleteFromThreads, setCurrentThread } = threadSlice.actions;

export default threadSlice.reducer;
