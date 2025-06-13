import { createSelector } from '@reduxjs/toolkit';
import { State } from '@/types/state';

export const selectOffers = (state: State) => state.offers;
export const selectSortType = (state: State) => state.sortType;

export const selectSortedOffers = createSelector(
  [selectOffers, selectSortType],
  (offers, sortType) => {
    switch (sortType) {
      case 'Price: low to high':
        return [...offers].sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return [...offers].sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return [...offers].sort((a, b) => b.rating - a.rating);
      default:
        return offers;
    }
  }
);
