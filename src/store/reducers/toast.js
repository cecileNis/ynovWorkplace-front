import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    data: null,
  },
  reducers: {
    setToast: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToast } = toastSlice.actions;

export default toastSlice.reducer;
