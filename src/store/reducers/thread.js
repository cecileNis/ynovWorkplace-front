import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

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
    sendThreads: (state, action) => {
      Socket.emit("send Threads", action.payload);
    },
    newThreads: (state, action) => {
      const { thread, user } = action.payload;
      thread.isMember = user ? user.subscribedThreads.includes(thread["@id"]) : false;
      thread.isOwner = user ? user.ownedThreads.includes(thread["@id"]) : false;
      state.threads.push(thread);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setThreads, deleteFromThreads, setCurrentThread, sendThreads, newThreads} = threadSlice.actions;

export default threadSlice.reducer;
