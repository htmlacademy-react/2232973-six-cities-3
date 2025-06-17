import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '@/services/api';
import { offersReducer } from './offers-slice';
import { userReducer } from './user-slice';
import { commentsReducer } from './comments-slice';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    offers: offersReducer,
    user: userReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })
});
