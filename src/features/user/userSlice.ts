import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "./localStorage";

export interface User {
  name?: string;
  email: string;
  password: string;
}

export interface ApiUser extends Omit<User, "password"> {
  lastName: string;
  location: string;
  token: string;
}

export interface UpdatedUser extends Omit<ApiUser, "token"> {}

interface ApiUserData {
  user: ApiUser;
}

export interface userState {
  isLoading: boolean;
  isSidebarOpen: boolean;
  user: null | ApiUser;
}

const initialState: userState = {
  isLoading: false,
  isSidebarOpen: true,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: User, thunkApi) => {
    try {
      const response = await customFetch.post("/auth/register", user);
      return response.data as ApiUserData;
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
      return response.data as ApiUserData;
    } catch (error) {
      const err = error as AxiosError<{ msg: string }>;
      const {
        data: { msg },
      } = err.response!;
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user: UpdatedUser, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const token = state.user.user?.token;
      const response = await customFetch.patch("auth/updateUser", user, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data as ApiUserData;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<{ msg: string }>;
      return thunkApi.rejectWithValue(err.response?.data.msg);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
      state.isSidebarOpen = false;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload: { user } }) => {
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
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
        console.log({ user });
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome back  ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload: { user } }) => {
        state.isLoading = false;
        state.user = user;

        addUserToLocalStorage(user);
        toast.success("User Updated");
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;

export default userSlice.reducer;
