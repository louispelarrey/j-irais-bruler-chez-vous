import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: JSX.Element;
}

export const Protected = ({ children }: ProtectedProps) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
