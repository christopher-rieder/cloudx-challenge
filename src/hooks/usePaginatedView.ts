import { useState } from 'react';
import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { CatalogListResponse, SortType } from '../api/CatalogAPI';

interface UsePaginatedViewProps {
  queryName: string;
  queryFn: (query: UseQueryOptions<unknown, unknown, unknown, QueryKey>) => Promise<CatalogListResponse>;
}

export enum FilterKey {
  brand = 'brand',
  model = 'model',
  year = 'year',
  version = 'version',
  city = 'city',
}

export type Filters = {
  [key in keyof typeof FilterKey]?: string;
};

export interface UsePaginatedViewResponse {
  query: UseQueryResult<CatalogListResponse, unknown>;
  data: CatalogListResponse | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  search: string[];
  setSearch: React.Dispatch<React.SetStateAction<string[]>>;
  sort: SortType;
  setSort: React.Dispatch<React.SetStateAction<SortType>>;
}

function usePaginatedView({ queryName, queryFn }: UsePaginatedViewProps): UsePaginatedViewResponse {
  const [filters, setFilters] = useState<Filters>({});
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string[]>([]);
  const [sort, setSort] = useState<SortType>();

  const queryKey: QueryKey = [queryName, { filters, page, search, sort }];
  const query = useQuery<CatalogListResponse, unknown>({
    queryKey,
    queryFn,
    keepPreviousData: true,
  });
  const data = query.data;

  return {
    query,
    data,
    page,
    setPage,
    filters,
    setFilters,
    search,
    setSearch,
    sort,
    setSort,
  };
}

export default usePaginatedView;
