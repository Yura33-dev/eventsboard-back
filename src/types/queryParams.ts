import { sortOrderEnum } from './sortOrder';

export interface IQueryParams {
  sortBy?: string;
  sortOrder?: sortOrderEnum;
  page?: string;
  perPage?: string;
}
