import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UseFetchProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: Record<string, any>;
}

const useFetch = ({url, method, body}: UseFetchProps) => {
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
          method,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
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
  }, [body, method, navigate, url]);

  return { data, error, loading };
}

export default useFetch;
