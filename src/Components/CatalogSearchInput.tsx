import { TextField } from '@mui/material';
import { useState } from 'react';
import { UsePaginatedViewResponse } from '../hooks/usePaginatedView';

type CatalogSearchInputProps = Pick<UsePaginatedViewResponse, 'setSearch'>;

export default function CatalogSearchInput({ setSearch }: CatalogSearchInputProps) {
  const [searchInput, setSearchInput] = useState<string>('');

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
  };
  const onKeyDown = (event: React.ChangeEvent<HTMLInputElement> & React.KeyboardEvent<HTMLElement>) => {
    const value = event.target.value;
    if (value && (event.key === 'Enter' || event.keyCode === 13)) {
      setSearch((oldSearch) => oldSearch.concat(value));
      setSearchInput('');
    }
  };

  return (
    <TextField
      size="small"
      onKeyDown={onKeyDown}
      value={searchInput}
      onChange={onChangeInput}
      variant="filled"
      label="Buscar"
    />
  );
}
