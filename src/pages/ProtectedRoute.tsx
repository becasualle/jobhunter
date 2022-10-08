import React from "react";
import { useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAppSelector((store) => store.user);
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
