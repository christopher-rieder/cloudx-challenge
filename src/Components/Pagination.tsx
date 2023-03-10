import * as React from 'react';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import { Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
});

interface PaginationProps {
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({ total, page, setPage }: PaginationProps): JSX.Element {
  const onChange = (_event: React.ChangeEvent<unknown>, newPage: number): void => {
    setPage(newPage);
  };

  const { items } = usePagination({
    count: Math.ceil(total / 12),
    defaultPage: 1,
    page: Number(page),
    onChange,
  });

  return (
    <Box component="nav" py={6}>
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;
          let style = {};

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…';
          } else if (type === 'previous') {
            style = { marginRight: 'auto' };
            children = (
              <Button sx={{ textTransform: 'initial' }} variant="text" {...item} startIcon={<ArrowBackIcon />}>
                Anterior
              </Button>
            );
          } else if (type === 'next') {
            style = { marginLeft: 'auto' };
            children = (
              <Button sx={{ textTransform: 'initial' }} variant="text" {...item} endIcon={<ArrowForwardIcon />}>
                Proximo
              </Button>
            );
          } else if (type === 'page') {
            // fontWeight: selected ? 'bold' : undefined,
            style = {
              boxShadow: selected ? '0px -2px #566DED' : undefined,
            };
            children = (
              <Button
                sx={{ outline: 'none', textTransform: 'initial', fontWeight: selected ? 'bold' : undefined }}
                variant="text"
                {...item}
              >
                {page}
              </Button>
            );
          } else {
            children = (
              <button type="button" {...item}>
                {type}
              </button>
            );
          }

          return (
            <li style={style} key={index}>
              {children}
            </li>
          );
        })}
      </List>
    </Box>
  );
}
