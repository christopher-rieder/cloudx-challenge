import { Stack, Typography } from '@mui/material';
import { Box, Button } from '@mui/material';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { Car, GetCatalogList } from '../api/CatalogAPI';
import CatalogCard from '../Components/CatalogCard';
import CatalogFilters from '../Components/CatalogFilters';
import Pagination from '../Components/Pagination';
import usePaginatedView from '../hooks/usePaginatedView';
import CatalogHeader from '../Components/CatalogHeader';
import { fNumber } from '../utils/formatNumber';
import CatalogSortButton from '../Components/CatalogSortButton';
import CatalogSearchInput from '../Components/CatalogSearchInput';

interface CatalogProps {
  favorites?: boolean;
}

export default function Catalog({ favorites }: CatalogProps): JSX.Element {
  const { data, query, page, setPage, filters, setFilters, search, setSearch, sort, setSort } = usePaginatedView({
    queryName: 'catalog-view',
    queryFn: () => GetCatalogList({ page, filters, search, favorites, sort }),
  });

  const shouldRender = query.isSuccess && data;
  return (
    <Box pt={7.5}>
      {shouldRender ? (
        <Stack direction="row" spacing={2} justifyContent="center">
          <Box flex="0 0 300px">
            <CatalogFilters data={data} filters={filters} setFilters={setFilters} />
          </Box>
          <Box flex="0 1 905px">
            <CatalogSearchInput setSearch={setSearch} />
            <CatalogHeader filters={filters} setFilters={setFilters} search={search} setSearch={setSearch} />
            <Stack mb={2} direction="row" justifyContent="space-between" alignItems="center" width={905}>
              <Typography variant="subtitle1">{`${fNumber(data.total)} carros encontrados`}</Typography>
              <Stack gap={2} direction="row">
                {favorites ? (
                  <Link to="/catalogo" reloadDocument style={{ textDecoration: 'none' }}>
                    <Button disableTouchRipple sx={{ textTransform: 'initial' }} variant="text">
                      Salir de Favoritos
                    </Button>
                  </Link>
                ) : (
                  <Link to="/catalogo/favoritos" reloadDocument style={{ textDecoration: 'none' }}>
                    <Button
                      disableTouchRipple
                      sx={{ textTransform: 'initial' }}
                      variant="text"
                      startIcon={<FavoriteIcon />}
                    >
                      Ver Favoritos
                    </Button>
                  </Link>
                )}
                <CatalogSortButton sort={sort} setSort={setSort} />
                <Button sx={{ textTransform: 'initial' }} variant="text" startIcon={<ImportExportIcon />}>
                  Mais relevantes
                </Button>
              </Stack>
            </Stack>
            <Stack direction="row" columnGap={2} rowGap={2.5} flexWrap="wrap" width={905}>
              {data.items.map((car: Car) => (
                <CatalogCard key={car.id} car={car} />
              ))}
            </Stack>

            <Pagination total={data.total} page={page} setPage={setPage} />
          </Box>
        </Stack>
      ) : null}
    </Box>
  );
}
