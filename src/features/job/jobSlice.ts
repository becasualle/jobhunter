import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

export interface JobFields {
  position: string;
  company: string;
  jobLocation: string;
  jobType: "full-time" | "part-time" | "remote" | "internship";
  status: "interview" | "declined" | "pending";
}

export interface JobState extends JobFields {
  isLoading: boolean;
  isEditing: boolean;
  editJobId: string;
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"];
  statusOptions: ["interview", "declined", "pending"];
}

export type FieldName = keyof JobFields;

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

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (
      state,
      action: PayloadAction<{ name: FieldName; value: string }>
    ) => {
      const { name, value } = action.payload;
      // @ts-ignore
      state[name] = value;
    },
  },
  extraReducers(builder) {},
});

export const { handleChange } = jobSlice.actions;

export default jobSlice.reducer;
