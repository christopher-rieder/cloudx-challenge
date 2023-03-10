import { Button } from '@mui/material';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { UsePaginatedViewResponse } from '../hooks/usePaginatedView';

type CatalogSortButtonProps = Pick<UsePaginatedViewResponse, 'sort' | 'setSort'>;

export default function CatalogSortButton({ sort, setSort }: CatalogSortButtonProps) {
  const onClickSort = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (sort === 'price') {
      setSort('-price');
    } else if (sort === '-price') {
      setSort(undefined);
    } else {
      setSort('price');
    }
  };

  const SortIcon =
    sort === 'price' ? <ArrowUpwardIcon /> : sort === '-price' ? <ArrowDownwardIcon /> : <ImportExportIcon />;

  return (
    <Button onClick={onClickSort} sx={{ textTransform: 'initial' }} variant="text" startIcon={SortIcon}>
      Precios
    </Button>
  );
}
