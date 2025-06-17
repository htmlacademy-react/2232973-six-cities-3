import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SIX_CITIES } from '@/const';
import { City, Offer } from '@/types/offers';

const initialState = {
  city: SIX_CITIES[0],
  offers: [] as Offer[],
  sortType: 'Popular'
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    setSortType: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload;
    }
  },
});

export const { setCity, setOffers, setSortType } = offersSlice.actions;
