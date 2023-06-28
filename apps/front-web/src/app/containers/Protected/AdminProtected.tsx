import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import getUserRoleFromToken from '../../utils/user/getUserRoleFromToken';

interface AdminProtectedProps {
    children: JSX.Element;
}

export const AdminProtected = ({ children }: AdminProtectedProps) => {
    const { token } = useContext(UserContext);
    const role = getUserRoleFromToken(localStorage.getItem('token') ?? '');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!role?.includes('ADMIN')) {
        return <Navigate to="/" replace />;
    }

    return children;
};
