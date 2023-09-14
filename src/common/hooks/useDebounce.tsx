import { useEffect, useState } from 'react';

const DEFAULT_DELAY = 500;

type UseDebounceProps = {
  value: string;
  delay?: number;
};

const useDebounce = ({ value, delay = DEFAULT_DELAY }: UseDebounceProps) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
