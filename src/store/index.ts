import { configureStore } from '@reduxjs/toolkit';
import { fetchOffers, offersReducer } from './offers-slice';
import { createAPI } from '@/services/api';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    offers: offersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })
});

store.dispatch(fetchOffers());

