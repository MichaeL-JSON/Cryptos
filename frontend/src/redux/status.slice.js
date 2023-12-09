import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "statusSlice",
  initialState: {
    status: 'panding'
  },
  reducers: {
    updateStatus: (state, action) => {
      state.status = action.payload;
    }
  }
});

export const { updateStatus } = statusSlice.actions;
export const statusReducer = statusSlice.reducer;