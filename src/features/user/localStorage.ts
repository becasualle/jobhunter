import { ApiUser } from "./userSlice";

export const addUserToLocalStorage = (user: ApiUser) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? (JSON.parse(result) as ApiUser) : null;
  return user;
};
