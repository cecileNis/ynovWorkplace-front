import { createSlice } from "@reduxjs/toolkit";

const groupSlice = createSlice({
  name: "group",
  initialState: {
    groups: [],
  },
  reducers: {
    setGroups: (state, action) => {
      console.log(action.payload);
      state.groups = [...state.groups, ...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGroups } = groupSlice.actions;

export default groupSlice.reducer;
