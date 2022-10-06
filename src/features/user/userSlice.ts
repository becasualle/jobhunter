import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface userState {
  isLoading: boolean;
  user: null;
}

const initialState: userState = {
  isLoading: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
