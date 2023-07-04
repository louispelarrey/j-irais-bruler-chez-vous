import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const useGet = (url: string) => {
  const [data, setData] = useState<any | any[] | undefined>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const isMounted = useRef(false);
  const fetchData = useRef<() => void>(() => null);

  useEffect(() => {
    isMounted.current = true;

    fetchData.current = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          import.meta.env.VITE_APP_BACKEND_URL + url,
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = await response.json();
        if (isMounted.current) {
          setData(data);
        }

        if (response.status === 401) {
          navigate("/logout");
        }
      } catch (error: Error | any) {
        if (isMounted.current) {
          if (error.name !== "AbortError") {
            setError(error.message);
            if (error.status === 401) {
              navigate("/logout");
            }
          }
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchData.current();

    return () => {
      isMounted.current = false;
    };
  }, [navigate, url]);

  return { data, error, loading, refetch: fetchData.current };
}

export default useGet;