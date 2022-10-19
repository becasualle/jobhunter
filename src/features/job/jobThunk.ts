import customFetch from "../../utils/axios";
import { RootState } from "../../app/store";
import { JobFields, JobAPIResponse, clearValues } from "./jobSlice";
import { logoutUser } from "../user/userSlice";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import { AxiosError } from "axios";
import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";

export const createJobThunk: AsyncThunkPayloadCreator<
  JobAPIResponse,
  JobFields
> = async (job, thunkApi) => {
  try {
    const state = thunkApi.getState() as RootState;
    const token = state.user.user?.token;
    const response = await customFetch.post("/jobs", job, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    thunkApi.dispatch(clearValues());
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ msg: string }>;
    if (err.response?.status === 401) {
      thunkApi.dispatch(logoutUser());
      return thunkApi.rejectWithValue("Unauthorized! Logging Out...");
    }
    return thunkApi.rejectWithValue(err.response?.data.msg);
  }
};

export const deleteJobThunk: AsyncThunkPayloadCreator<
  { msg: string },
  string
> = async (jobId, thunkApi) => {
  thunkApi.dispatch(showLoading());
  try {
    const state = thunkApi.getState() as RootState;
    const token = state.user.user?.token;
    const response = await customFetch.delete(`/jobs/${jobId}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    thunkApi.dispatch(getAllJobs());
    return response.data;
  } catch (error) {
    thunkApi.dispatch(hideLoading());
    const err = error as AxiosError<{ msg: string }>;
    return thunkApi.rejectWithValue(err.response?.data.msg);
  }
};

export const editJobThunk: AsyncThunkPayloadCreator<
  { updatedJob: JobAPIResponse },
  { jobId: string; job: JobFields }
> = async ({ jobId, job }, thunkApi) => {
  try {
    const state = thunkApi.getState() as RootState;
    const token = state.user.user?.token;
    const response = await customFetch.patch(`/jobs/${jobId}`, job, {
      headers: { authorization: `Bearer ${token}` },
    });
    thunkApi.dispatch(clearValues());
    console.log({ response });
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ msg: string }>;
    return thunkApi.rejectWithValue(err.response?.data.msg);
  }
};
