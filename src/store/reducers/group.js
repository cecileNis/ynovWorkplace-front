import { createSlice } from "@reduxjs/toolkit";

const groupSlice = createSlice({
  name: "group",
  initialState: {
    groups: [],
  },
  reducers: {
    setGroups: (state, action) => {
      console.log(action.payload);
      let payload = action.payload;
      if (!Array.isArray(action.payload)) payload = [action.payload];
      state.groups = [...state.groups, ...payload];
    },
    deleteFromGroups: (state, action) => {
      state.groups = state.groups.filter((group) => group.id !== action.payload.id);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGroups, deleteFromGroups } = groupSlice.actions;

export default groupSlice.reducer;
