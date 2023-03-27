import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

interface ProtectedProps {
  children: JSX.Element;
}

export const Protected = ({ children }: ProtectedProps) => {
  const { token } = useContext(UserContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
