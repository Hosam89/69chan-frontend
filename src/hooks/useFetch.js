import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export const useFetch = (url, method = "GET", dispatchOps) => {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);
  const { dispatch } = useAuthContext();

  const postData = (postData) => {
    const formData = new FormData();
    for (const key in postData) {
      formData.append(key, postData[key]);
    }
    setOptions({
      method: "POST",
      body: formData,
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
      setIsPending(true);

      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data = await res.json();
        if (dispatchOps === "LOGIN") {
          dispatch({ type: "LOGIN", payload: data });
        }
        setIsPending(false);
        setData(data);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          setIsPending(false);
          setError("Could not fetch the data");
        }
      }
    };

    // invoke the function
    if (method === "GET") {
      fetchData();
    }
    if (method === "POST" && options) {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, method, options, dispatchOps]);

  return { data, isPending, error, postData };
};
