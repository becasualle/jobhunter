import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from "../user/localStorage";
import { logoutUser } from "../user/userSlice";

export interface JobFields {
  position: string;
  company: string;
  jobLocation: string;
  jobType: "full-time" | "part-time" | "remote" | "internship";
  status: "interview" | "declined" | "pending";
}

export interface JobAPIResponse extends JobFields {
  createdBy: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type FieldName = keyof JobFields;

export interface JobState extends JobFields {
  isLoading: boolean;
  isEditing: boolean;
  editJobId: string;
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"];
  statusOptions: ["interview", "declined", "pending"];
}

const initialState: JobState = {
  isLoading: false,
  isEditing: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  editJobId: "",
};

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job: JobFields, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const token = state.user.user?.token;
      const response = await customFetch.post("/jobs", job, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      thunkApi.dispatch(clearValues());
      return response.data as JobAPIResponse;
    } catch (error) {
      const err = error as AxiosError<{ msg: string }>;
      if (err.response?.status === 401) {
        thunkApi.dispatch(logoutUser());
        return thunkApi.rejectWithValue("Unauthorized! Logging Out...");
      }
      return thunkApi.rejectWithValue(err.response?.data.msg);
    }
  }
);

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (
      state,
      action: PayloadAction<{ name: FieldName; value: string }>
    ) => {
      const { name, value } = action.payload;
      state = { ...state, [name]: value };
      return state;
    },
    clearValues: () => ({
      ...initialState,
      jobLocation: getUserFromLocalStorage()?.location || "",
    }),
  },
  extraReducers(builder) {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Job Created");
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
  },
});

export const { handleChange, clearValues } = jobSlice.actions;

export default jobSlice.reducer;
