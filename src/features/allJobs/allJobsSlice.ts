import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import customFetch from "../../utils/axios";

export interface JobsFiltersState {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: string[];
}
export interface JobsInitialState extends JobsFiltersState {
  isLoading: boolean;
  jobs: Job[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: {};
  monthlyApplications: [];
}

export interface Job {
  _id: string;
  company: string;
  position: string;
  status: string;
  jobType: string;
  jobLocation: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiJobsData {
  totalJobs: number;
  numOfPages: number;
  jobs: Job[];
}

const initialFilterState: JobsFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState: JobsInitialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFilterState,
};

export const getAllJobs = createAsyncThunk(
  "allJobs/getJobs",
  async (_, thunkApi) => {
    let url = "/jobs";

    try {
      const state = thunkApi.getState() as RootState;
      const token = state.user.user?.token;
      const response = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data as ApiJobsData;
    } catch (error) {
      const err = error as AxiosError<{ msg: string }>;
      return thunkApi.rejectWithValue(err.response?.data.msg);
    }
  }
);
const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
  },
});

export default allJobsSlice.reducer;
