import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = (url: string) => {
  const [data, setData] = useState<any | any[] | undefined>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          signal,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error: Error | any) {
        if (error.name !== "AbortError") {
          setError(error.message);
          setLoading(false);
          if (error.status === 401) {
            navigate("/logout");
          }
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [navigate, url]);

  return { data, error, loading };
}

export default useFetch;
