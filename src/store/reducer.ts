import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers, setSortType } from './action';
import { SIX_CITIES } from '@/const';
import { Offer } from '@/types/offers';

const initialState = {
  city: SIX_CITIES[0],
  offers: [] as Offer[],
  sortType: 'Popular'
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload;
    });
});

export {reducer};
