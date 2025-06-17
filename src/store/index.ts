import { configureStore } from '@reduxjs/toolkit';
import { offersSlice, setOffers } from './reducer';
import { mockOffers } from '@/mocks/offers';
import { createAPI } from '@/services/api';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    offers: offersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })
});

store.dispatch(setOffers(mockOffers));

