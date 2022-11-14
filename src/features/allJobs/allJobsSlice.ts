import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { JobType, StatusType } from "../job/jobSlice";
import customFetch from "../../utils/axios";

export interface APIJob {
  _id: string;
  company: string;
  position: string;
  status: StatusType;
  jobType: JobType;
  jobLocation: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiJobsData {
  totalJobs: number;
  numOfPages: number;
  jobs: APIJob[];
}

export type Stats = {
  pending: number;
  interview: number;
  declined: number;
};

export type MonthlyApplication = {
  date: string;
  count: number;
};

export interface ApiStatsInfo {
  defaultStats: Stats;
  monthlyApplications: MonthlyApplication[] | [];
}

export interface JobsInitialState extends JobsFiltersState {
  isLoading: boolean;
  jobs: APIJob[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: Stats;
  monthlyApplications: MonthlyApplication[] | [];
}

// TODO: refactor slices using typeof instead of interfaces;

// export interface JobsFiltersState {
//   search: string;
//   searchStatus: string;
//   searchType: string;
//   sort: string;
//   sortOptions: string[];
// }

const initialFilterState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

export type JobsFiltersState = typeof initialFilterState;

const initialState: JobsInitialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: { declined: 0, interview: 0, pending: 0 },
  monthlyApplications: [],
  ...initialFilterState,
};

export type FieldName = keyof JobsFiltersState;

export const getAllJobs = createAsyncThunk(
  "allJobs/getJobs",
  async (_, thunkApi) => {
    let url = "/jobs";

    try {
      const response = await customFetch.get(url);
      return response.data as ApiJobsData;
    } catch (error) {
      const err = error as AxiosError<{ msg: string }>;
      return thunkApi.rejectWithValue(err.response?.data.msg);
    }
  }
);

export const showStats = createAsyncThunk(
  "allJobs/showStats",
  async (_, thunkApi) => {
    try {
      const resp = await customFetch("/jobs/stats");
      return resp.data as ApiStatsInfo;
    } catch (error) {
      const err = error as AxiosError<{ msg: string }>;
      return thunkApi.rejectWithValue(err.response?.data.msg);
    }
  }
);
const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    handleChange: (
      state,
      action: PayloadAction<{ name: FieldName; value: string }>
    ) => {
      const {
        payload: { name, value },
      } = action;
      return { ...state, [name]: value };
    },
    changePage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    clearFilters: (state) => ({ ...state, ...initialFilterState }),
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
        state.numOfPages = payload.numOfPages;
        state.totalJobs = payload.totalJobs;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload as string);
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
} = allJobsSlice.actions;

export default allJobsSlice.reducer;
