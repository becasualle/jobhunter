import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface User {
  name?: string;
  email: string;
  password: string;
}

export interface userState {
  isLoading: boolean;
  user: null | User;
}

const initialState: userState = {
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: User, thunkApi) => {
    console.log(`Register User: ${JSON.stringify(user)}`);
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: User, thunkApi) => {
    console.log(`Login User: ${JSON.stringify(user)}`);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
