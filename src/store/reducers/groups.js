import { createSlice } from "@reduxjs/toolkit";

const groupsSlice = createSlice({
  name: "group",
  initialState: {
    groups: [],
  },
  reducers: {
    setGroups: (state, action) => {
      console.log(action.payload);
      state.groups = [...state.groups, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGroups } = groupsSlice.actions;

export default groupsSlice.reducer;
