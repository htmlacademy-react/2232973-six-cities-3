import { City, Offer } from '@/types/offers';
import { createAction } from '@reduxjs/toolkit';

export const setCity = createAction<City>('SET_CITY');
export const setOffers = createAction<Offer[]>('SET_OFFERS');
