import jwt_decode from 'jwt-decode';

const getUserRoleFromToken = (token: string): string | null => {
    try {
        const decoded: any = jwt_decode(token);
        return decoded.roles;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export default getUserRoleFromToken;