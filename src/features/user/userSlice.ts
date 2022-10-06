import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

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
    try {
      const response = await customFetch.post("/auth/register", user);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ msg: string }>;

      const {
        data: { msg },
      } = err.response!;

      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: User, thunkApi) => {
    try {
      const response = await customFetch.post("/auth/login", user);
      console.log(response);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ msg: string }>;
      const {
        data: { msg },
      } = err.response!;
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload: { user } }) => {
        state.isLoading = false;
        state.user = user;
        toast.success(`Hello There ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload: { user } }) => {
        state.isLoading = false;
        state.user = user;
        toast.success(`Welcome back  ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
  },
});

export default userSlice.reducer;
