import { IQueryParams } from '../types/queryParams';

export const parsePaginationParams = (
  query: IQueryParams,
): { page: number; perPage: number } => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page ?? 1, 1);
  const parsedPerPage = parseNumber(perPage ?? 28, 28);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};

const parseNumber = (number: number | string, defaultValue: number): number => {
  if (typeof number === 'number') {
    return number;
  } else {
    const parsedNumber = parseInt(number);

    if (Number.isNaN(parsedNumber)) {
      return defaultValue;
    }
    return parsedNumber;
  }
};
