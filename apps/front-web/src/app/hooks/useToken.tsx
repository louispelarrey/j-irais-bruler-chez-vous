import { useCallback, useState } from 'react';

export default function useToken() {
  const [tokenState, setTokenState] = useState(localStorage.getItem('token') || '');

  const saveToken = useCallback((token: string) => {
    localStorage.setItem('token', token);
    setTokenState(token);
  }, []);

  const removeToken = useCallback(() => {
    localStorage.removeItem('token');
    setTokenState('');
  }, []);

  return {
    setToken: saveToken,
    token: tokenState,
    logout: removeToken,
  }
}
