import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      const res = await fetch(url);
      let json = await res.json();

      setData(json);
      setIsPending(false);
    };
    fetchData();
  }, [url]);

  return { data, isPending };
};

export { useFetch };
