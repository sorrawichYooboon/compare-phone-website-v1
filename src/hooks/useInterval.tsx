import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: any) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return undefined;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval?.(id);
  }, [delay]);
};

export default useInterval;
