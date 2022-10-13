import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

interface JobState {
  isLoading: boolean;
  isEditing: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"];
  jobType: "full-time" | "part-time" | "remote" | "internship";
  statusOptions: ["interview", "declined", "pending"];
  status: "interview" | "declined" | "pending";
  editJobId: string;
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

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default jobSlice.reducer;
