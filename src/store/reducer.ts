import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers } from './action';
import { mockOffers } from '@/mocks/offers';

const initialState = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 10
    }
  },
  offers: mockOffers.filter((offer) => offer.city.name === 'Paris'),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};
