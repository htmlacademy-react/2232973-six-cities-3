import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiRoute, SIX_CITIES } from '@/const';
import { City, Offer } from '@/types/offers';
import { AxiosInstance } from 'axios';

type OffersState = {
  city: City;
  offers: Offer[];
  sortType: string;
  isLoading: boolean;
  error: string | null;
};

const initialState: OffersState = {
  city: SIX_CITIES[0],
  offers: [] as Offer[],
  sortType: 'Popular',
  isLoading: false,
  error: null,
};

const fetchOffers = createAsyncThunk<Offer[],undefined, { extra: AxiosInstance }>(
  'offers/fetchOffers',
  async(_, { extra: api}) => {
    const {data} = await api.get<Offer[]>(ApiRoute.Offers);
    return data;
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load offers';
      });
  }
});

const offersReducer = offersSlice.reducer;
const { setCity, setSortType } = offersSlice.actions;

export {
  offersReducer,
  setCity,
  setSortType,
  fetchOffers,
};

// export const offersSlice = createSlice({
//   name: 'offers',
//   initialState,
//   reducers: {
//     setCity: (state, action: PayloadAction<City>) => {
//       state.city = action.payload;
//     },
//     setOffers: (state, action: PayloadAction<Offer[]>) => {
//       state.offers = action.payload;
//     },
//     setSortType: (state, action: PayloadAction<string>) => {
//       state.sortType = action.payload;
//     }
//   },
// });

// export const { setCity, setOffers, setSortType } = offersSlice.actions;
