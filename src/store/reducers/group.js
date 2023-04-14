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
  },
});

// Action creators are generated for each case reducer function
export const { setGroups } = groupSlice.actions;

export default groupSlice.reducer;
