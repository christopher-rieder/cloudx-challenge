import { Stack } from '@mui/material';
import { Chip, Button } from '@mui/material';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { UsePaginatedViewResponse } from '../hooks/usePaginatedView';

type CatalogHeaderProps = Pick<UsePaginatedViewResponse, 'filters' | 'setFilters' | 'search' | 'setSearch'>;

export default function CatalogHeader({ filters, setFilters, search, setSearch }: CatalogHeaderProps) {
  const onDelete = (filterName: string, filterValue: string) => (_event: React.KeyboardEvent | React.MouseEvent) => {
    setFilters((oldFilters) => ({ ...oldFilters, [filterName]: null }));
  };
  const onDeleteSearch = (index: number) => (_event: React.KeyboardEvent | React.MouseEvent) => {
    setSearch((oldSearch) => oldSearch.filter((_, i) => i !== index));
  };

  const filtersArray = Object.entries(filters).filter(([k, v]) => k && v);

  const showClearFilters = Boolean(filtersArray.length || search.length);

  const clearFilters = () => {
    setFilters({});
    setSearch([]);
  };
  return (
    <>
      <Stack direction="row" pt={2.5} pb={2.5} justifyContent="space-between">
        <Stack direction="row" gap={2} flexWrap="wrap">
          {filtersArray.map(([filterName, filterValue]) => (
            <Chip
              key={filterName}
              size="medium"
              variant="outlined"
              color="primary"
              label={filterValue}
              onDelete={onDelete(filterName, filterValue)}
              deleteIcon={<ClearIcon />}
            />
          ))}
          {search.map((searchValue, index) => (
            <Chip
              key={index + searchValue}
              size="medium"
              variant="outlined"
              color="primary"
              label={searchValue}
              onDelete={onDeleteSearch(index)}
              deleteIcon={<ClearIcon />}
            />
          ))}
        </Stack>
        {showClearFilters && (
          <Button
            sx={{ textTransform: 'initial', minWidth: 'max-content' }}
            variant="text"
            startIcon={<DeleteOutlineIcon />}
            onClick={clearFilters}
          >
            Limpiar Filtros
          </Button>
        )}
      </Stack>
    </>
  );
}
