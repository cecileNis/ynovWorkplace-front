import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loggedUsers: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLoggedUsers: (state, action) => {
      state.loggedUsers = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsers, setLoggedUsers } = userSlice.actions;

export default userSlice.reducer;
