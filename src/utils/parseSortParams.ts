import { IQueryParams } from '../types/queryParams.js';
import { sortOrderEnum } from '../types/sortOrder.js';

export const parseSortParams = (query: IQueryParams) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder ?? sortOrderEnum.ASC);
  const parsedSortBy = parseSortBy(sortBy ?? 'date');

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};

const parseSortOrder = (sortOrder: sortOrderEnum): sortOrderEnum => {
  const isKnownSortOrder = [sortOrderEnum.ASC, sortOrderEnum.DESC].includes(
    sortOrder,
  );

  if (isKnownSortOrder) return sortOrder;
  return sortOrderEnum.ASC;
};

const parseSortBy = (sortBy: string): string => {
  const keyOfEvents = ['date', 'name', 'promoter'];

  if (keyOfEvents.includes(sortBy)) return sortBy;
  return 'date';
};
