import { useState, useEffect } from "react";

export const useFetch = (
  endpoint: string | null,
  method?: string,
  body?: object | null
) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/${endpoint}`,
          {
            method: method || "GET",
            body: body ? JSON.stringify(body) : null,
          }
        );

        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        setLoading(false);
        setData(data);
      } catch (error) {
        setError(`${error}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, method, body]);

  return { data, loading, error };
};
