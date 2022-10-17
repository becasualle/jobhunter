import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/user/userSlice";
import jobReducer from "../features/job/jobSlice";
import allJobsReducer from "../features/allJobs/allJobsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    job: jobReducer,
    allJobs: allJobsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
