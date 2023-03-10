import { Stack, Typography } from '@mui/material';
import { Box, Button, Drawer } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import GridViewIcon from '@mui/icons-material/GridView';
import { SxProps } from '@mui/system';

import { Car, GetCatalogList } from '../api/CatalogAPI';
import CatalogCard from '../Components/CatalogCard';
import CatalogFilters from '../Components/CatalogFilters';
import usePaginatedView from '../hooks/usePaginatedView';
import CatalogHeader from '../Components/CatalogHeader';
import { fNumber } from '../utils/formatNumber';
import CatalogSortButton from '../Components/CatalogSortButton';
import CatalogSearchInput from '../Components/CatalogSearchInput';

interface CatalogProps {
  favorites?: boolean;
}

export default function CatalogMobile({ favorites }: CatalogProps): JSX.Element {
  const { data, query, page, setPage, filters, setFilters, search, setSearch, sort, setSort } = usePaginatedView({
    queryName: 'catalog-view',
    queryFn: () => GetCatalogList({ page, filters, search, favorites, sort }),
  });

  const shouldRender = query.isSuccess && data;

  const [filterDrawer, setFilterDrawer] = useState(false);
  const toggleFilterDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setFilterDrawer(open);
  };

  const [searchDrawer, setSearchDrawer] = useState(false);
  const toggleSearchDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setSearchDrawer(open);
  };

  const [horizontalCard, setHorizontalCard] = useState(true);

  const cardContainerPropsMobile: SxProps = horizontalCard
    ? {
        display: 'flex',
        flexDirection: 'column',
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        columnGap: 3,
        rowGap: 1,
      };

  return (
    <Box>
      {shouldRender ? (
        <Stack direction="row" spacing={2} justifyContent="center" minWidth={600}>
          <Drawer anchor="top" open={filterDrawer} onClose={toggleFilterDrawer(false)}>
            <Box p={2} display="flex" justifyContent="center">
              <Box minWidth={400} maxWidth={800}>
                <CatalogFilters
                  data={data}
                  filters={filters}
                  setFilters={setFilters}
                  onChange={toggleFilterDrawer(false)}
                />
              </Box>
            </Box>
          </Drawer>
          <Drawer anchor="top" open={searchDrawer} onClose={toggleSearchDrawer(false)}>
            <Box p={2} display="flex" justifyContent="center">
              <Box minWidth={400} maxWidth={800}>
                <CatalogSearchInput setSearch={setSearch} />
              </Box>
            </Box>
          </Drawer>
          <Box>
            <Stack my={2} direction="row" justifyContent="space-between" alignItems="center">
              <Button onClick={toggleSearchDrawer(true)} startIcon={<SearchIcon />}>
                Buscar
              </Button>
              <Button onClick={toggleFilterDrawer(true)} startIcon={<FilterListIcon />}>
                Filtrar
              </Button>
            </Stack>
            <CatalogHeader filters={filters} setFilters={setFilters} search={search} setSearch={setSearch} />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1">{`${fNumber(data.total)} carros encontrados`}</Typography>
              <Stack gap={1} direction="row">
                <CatalogSortButton sort={sort} setSort={setSort} />
                <Button startIcon={<GridViewIcon onClick={() => setHorizontalCard((b) => !b)} />} />
              </Stack>
            </Stack>

            <Box sx={cardContainerPropsMobile}>
              {data.items.map((car: Car) => (
                <CatalogCard key={car.id} car={car} horizontal={horizontalCard} />
              ))}
            </Box>

            {/* <Pagination total={data.total} page={page} setPage={setPage} /> */}
          </Box>
        </Stack>
      ) : null}
    </Box>
  );
}
