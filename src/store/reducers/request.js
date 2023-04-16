import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: {
    requests: [],
  },
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRequests } = requestSlice.actions;

export default requestSlice.reducer;
