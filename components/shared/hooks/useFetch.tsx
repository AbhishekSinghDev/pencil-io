"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios(url);
        setData(data.response);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (url) fetchData();
  }, [url]);

  return { data, isLoading, isError };
};

export default useFetch;
