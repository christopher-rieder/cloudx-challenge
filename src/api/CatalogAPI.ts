import axios from 'axios';
import { queryClient } from '../main';
import { API_URL } from './config';
import mockData from '../mock.js';
import { Filters } from '../hooks/usePaginatedView';
import _ from 'lodash';

const endpoints = {
  catalogs: (search = '') => `${API_URL}${search}`,
};

export type Car = {
  id: string;
  city: string;
  state: string;
  year: string;
  brand: string;
  model: string;
  version: string;
  price: number;
  mileage: number;
  image: string;
  certificate: boolean;
  promoted: boolean;
  booking: boolean;
  financing: boolean;
};

export enum DataKey {
  brands = 'brands',
  models = 'models',
  years = 'years',
  versions = 'versions',
  cities = 'cities',
}

export type DataShape = {
  [key in keyof typeof DataKey]?: [string, number][];
};

export type CatalogListResponse = {
  items: Car[];
  total: number;
} & DataShape;

export type SortType = 'price' | '-price' | '' | undefined;

export function range(year: string): string[] {
  let [start, end] = year.split('/').map(Number);
  // fix for error in the API or data.
  // if the range is 2018/2017, assume that the real range is 2017/2018
  if (start > end) {
    const temp = start;
    start = end;
    end = temp;
  }
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(String(i));
  }
  return result;
}

interface CatalogQuery {
  page: number;
  filters: Filters;
  search?: string[];
  favorites?: boolean;
  sort: SortType;
}

// since in this challenge the mocked api is always the same
// and it does not pagination nor any kind of filtering and sorting
// on the server side, we can fetch the info just once and use it
// from the react-query cache.
// With a real API this will be done on the server
// so this catalogList call won't be used, and the server
// will manage the pagination, filtering and sorting
async function GetCatalogList(query: CatalogQuery): Promise<CatalogListResponse> {
  const catalogList = await queryClient.fetchQuery<CatalogListResponse>({
    queryKey: ['catalog'],
    queryFn: () => axios.get(endpoints.catalogs()).then((data) => data.data),
    staleTime: Infinity,
  });
  // const catalogList = mockData;

  const page = query.page || 1;
  const perPage = 12;

  const queryFilters = query.filters;
  const querySearch = query.search;

  if (query.favorites) {
    // SQL JOIN-LIKE BETWEEN SESSION STORATE IDs AND API RESULT IDs
    const favorites =
      sessionStorage
        .getItem('karvi-favorites')
        ?.split(',')
        .map((id) => ({ id })) || [];

    catalogList.items = _.intersectionBy(catalogList.items, favorites, 'id');
  }
  let items = catalogList.items;

  // apply filters
  if (queryFilters?.brand) {
    items = items.filter((car: Car) => car.brand === queryFilters.brand);
  }

  if (queryFilters?.model) {
    items = items.filter((car: Car) => car.model === queryFilters.model);
  }

  if (queryFilters?.year) {
    const filterYears = (car: Car) => {
      const yearRange = range(car.year);
      return yearRange.includes(queryFilters.year || '');
    };
    items = items.filter(filterYears);
  }

  if (queryFilters?.version) {
    items = items.filter((car: Car) => car.version === queryFilters.version);
  }

  if (queryFilters?.city) {
    items = items.filter((car: Car) => car.city.toUpperCase() === queryFilters.city?.toUpperCase());
  }

  if (querySearch?.length) {
    const filterSearch = (car: Car) => {
      return Object.values(car).some((value) =>
        querySearch?.some((search) => String(value).toLowerCase().includes(search.toLowerCase()))
      );
    };
    items = items.filter(filterSearch);
  }

  const uniqBrands = _.countBy(items, 'brand');
  const brands = Object.entries(uniqBrands);

  const uniqModels = _.countBy(items, 'model');
  const models = Object.entries(uniqModels);

  const uniqYears = _.countBy(items.map((car) => range(car.year)).flat());
  const years = Object.entries(uniqYears);

  const uniqVersions = _.countBy(items, 'version');
  const versions = Object.entries(uniqVersions);

  const uniqCities = _.countBy(items, 'city');
  const cities = Object.entries(uniqCities);

  if (query.sort) {
    if (query.sort === 'price') {
      items = items.sort((a, b) => b.price - a.price);
    }
    if (query.sort === '-price') {
      items = items.sort((a, b) => a.price - b.price);
    }
  }

  const total = items.length;

  const from = (page - 1) * perPage;
  const to = Math.min(from + perPage, total);
  items = items.slice(from, to);

  return { items, total, brands, models, years, versions, cities };
}

export { GetCatalogList };
