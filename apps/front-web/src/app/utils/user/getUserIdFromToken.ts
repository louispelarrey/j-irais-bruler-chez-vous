import jwt_decode from 'jwt-decode';


const getUserIdFromToken = (token: string): string | null => {
  try {
    const decoded: any = jwt_decode(token);
    return decoded.sub;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export default getUserIdFromToken;
