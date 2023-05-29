import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

const groupSlice = createSlice({
  name: "group",
  initialState: {
    groups: [],
    current: { members: [] },
  },
  reducers: {
    setGroups: (state, action) => {
      let payload = action.payload;
      if (!Array.isArray(action.payload)) payload = [action.payload];
      state.groups = [...state.groups, ...payload];
    },
    deleteFromGroups: (state, action) => {
      state.groups = state.groups.filter((group) => group["@id"] !== action.payload["@id"]);
    },
    setCurrentGroup: (state, action) => {
      state.current = action.payload;
    },
    addMember: (state, action) => {
      state.current.members = [...state.current.members, action.payload];
    },
    sendGroup: (state, action) => {
      Socket.emit("send group", action.payload);
    },
    newGroup: (state, action) => {
      const { group, user } = action.payload;
      group.isMember = user ? user.subscribedGroups.includes(group["@id"]) : false;
      group.isOwner = user ? user.ownedGroups.includes(group["@id"]) : false;
      state.groups.push(group);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGroups, deleteFromGroups, setCurrentGroup, addMember, sendGroup, newGroup } = groupSlice.actions;

export default groupSlice.reducer;