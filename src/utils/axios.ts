import axios, { AxiosError } from "axios";
import { getUserFromLocalStorage } from "./localStorage";
import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";

const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});

customFetch.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage();
    if (user) {
      config.headers!.authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customFetch;
