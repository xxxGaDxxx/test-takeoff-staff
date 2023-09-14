import { useEffect, useState } from 'react';
import { Input } from '@/components/ui-toolkit/Input/Input.tsx';
import useDebounce from '@/common/hooks/useDebounce.tsx';

type SearchProps = {
  onSearchValue: (value: string) => void;
};
const Search = ({ onSearchValue }: SearchProps) => {
  const [value, setValue] = useState('');

  const debounceText = useDebounce({ value });

  useEffect(() => {
    onSearchValue(debounceText);
  }, [debounceText]);

  return <Input type="search" label="Search contact" onValueChange={setValue} value={value} />;
};

export default Search;
