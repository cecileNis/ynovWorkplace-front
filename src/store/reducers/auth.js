import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedUser: null,
  },
  reducers: {
    setLoggedUser: (state, action) => {
      state.loggedUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoggedUser } = authSlice.actions;

export default authSlice.reducer;
