import { createReducer } from '@reduxjs/toolkit';
import { setCity } from './action';
import { mockOffers } from '@/mocks/offers';

const initialState = {
  city: 'Amsterdam',
  offers: mockOffers.filter((offer) => offer.city.name === 'Amsterdam'),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
      state.offers = mockOffers.filter((offer) => offer.city.name === action.payload);
    });
});

export {reducer};
