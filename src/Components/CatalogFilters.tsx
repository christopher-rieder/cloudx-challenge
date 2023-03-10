import { FilterKey, Filters } from '../hooks/usePaginatedView';
import { Box, Typography, Stack } from '@mui/material';
import useStateToggle from '../hooks/useStateToggle';
import { CatalogListResponse } from '../api/CatalogAPI';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type CatalogFiltersProps = {
  data: CatalogListResponse;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
} & {
  onChange?: (event: React.KeyboardEvent | React.MouseEvent) => void;
};

interface FilterGroupv2Props {
  title: string;
  name: FilterKey;
  data?: [string, number][];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onChange?: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

function FilterGroupv2({ title, name, data, filters, setFilters, onChange }: FilterGroupv2Props) {
  const filter = filters[name];
  const onChangeFilter = (newVal: string) => (event: React.KeyboardEvent | React.MouseEvent) => {
    setFilters((oldFilters) => ({ ...oldFilters, [name]: filter === newVal ? undefined : newVal }));
    onChange?.(event);
  };
  const [filterOpen, filterToggle] = useStateToggle(Boolean(filter));

  return (
    <Box borderBottom="1px solid #E3E5ED">
      <Stack direction="row" justifyContent="space-between" onClick={filterToggle} pt={2.5} pb={2.5}>
        <Typography fontWeight={700} variant="body2">
          {title}
        </Typography>
        {filterOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </Stack>
      {filterOpen && (
        <Stack gap={2.5} direction="column" pb={2.5}>
          {data?.map(([key, value]) => (
            <Typography variant="subtitle1" key={key} onClick={onChangeFilter(key)}>
              {`${key} (${value})`}
            </Typography>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default function CatalogFilters({ data, filters, setFilters, onChange }: CatalogFiltersProps): JSX.Element {
  return (
    <>
      <FilterGroupv2
        title="Marca"
        name={FilterKey.brand}
        data={data?.brands}
        filters={filters}
        setFilters={setFilters}
        onChange={onChange}
      />
      <FilterGroupv2
        title="Modelo"
        name={FilterKey.model}
        data={data?.models}
        filters={filters}
        setFilters={setFilters}
        onChange={onChange}
      />
      <FilterGroupv2
        title="Año"
        name={FilterKey.year}
        data={data?.years}
        filters={filters}
        setFilters={setFilters}
        onChange={onChange}
      />
      <FilterGroupv2
        title="Version"
        name={FilterKey.version}
        data={data?.versions}
        filters={filters}
        setFilters={setFilters}
        onChange={onChange}
      />
      <FilterGroupv2
        title="Cidade"
        name={FilterKey.city}
        data={data?.cities}
        filters={filters}
        setFilters={setFilters}
        onChange={onChange}
      />
    </>
  );
}
