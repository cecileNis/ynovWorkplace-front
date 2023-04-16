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
    addRequest: (state, action) => {
      state.requests = [...state.requests, action.payload];
    },
    deleteRequest: (state, action) => {
      state.requests = state.requests.filter((request) => request["@id"] !== action.payload["@id"]);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRequests, addRequest, deleteRequest } = requestSlice.actions;

export default requestSlice.reducer;
