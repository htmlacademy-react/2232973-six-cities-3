import { configureStore } from '@reduxjs/toolkit';
import { fetchOffers, offersReducer } from './offers-slice';
import { createAPI } from '@/services/api';
import { checkUserStatus, userReducer } from './user-slice';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    offers: offersReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })
});

store.dispatch(fetchOffers());
store.dispatch(checkUserStatus());

