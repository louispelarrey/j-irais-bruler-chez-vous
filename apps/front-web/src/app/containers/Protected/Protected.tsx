import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: JSX.Element;
  accessToken: string | null;
}

const Protected = ({ children, accessToken }: ProtectedProps) => {

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Protected;
