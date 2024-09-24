import { sortOrderEnum } from '../types/sortOrder.js';
export const parseSortParams = (query) => {
    const { sortOrder, sortBy } = query;
    const parsedSortOrder = parseSortOrder(sortOrder ?? sortOrderEnum.ASC);
    const parsedSortBy = parseSortBy(sortBy ?? 'date');
    return {
        sortBy: parsedSortBy,
        sortOrder: parsedSortOrder,
    };
};
const parseSortOrder = (sortOrder) => {
    const isKnownSortOrder = [sortOrderEnum.ASC, sortOrderEnum.DESC].includes(sortOrder);
    if (isKnownSortOrder)
        return sortOrder;
    return sortOrderEnum.ASC;
};
const parseSortBy = (sortBy) => {
    const keyOfEvents = ['date', 'name', 'promoter'];
    if (keyOfEvents.includes(sortBy))
        return sortBy;
    return 'date';
};
