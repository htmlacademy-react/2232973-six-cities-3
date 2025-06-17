import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiRoute, SIX_CITIES } from '@/const';
import { City, Offer } from '@/types/offers';
import { AxiosInstance } from 'axios';

type OffersState = {
  city: City;
  offers: Offer[];
  specificOffer: Offer | null;
  sortType: string;
  isLoading: boolean;
  error: string | null;
};

const initialState: OffersState = {
  city: SIX_CITIES[0],
  offers: [] as Offer[],
  specificOffer: null,
  sortType: 'Popular',
  isLoading: false,
  error: null,
};

const fetchOfferById = createAsyncThunk<Offer, string, { extra: AxiosInstance }>(
  'offers/fetchById',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer>(`${ApiRoute.Offers}/${offerId}`);
    return data;
  }
);

const fetchOffers = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance }>(
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
    },
    clearSpecificOffer: (state) => {
      state.specificOffer = null;
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
      })
      .addCase(fetchOfferById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.specificOffer = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOfferById.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to load offer details';
        state.isLoading = false;
      });
  }
});

const offersReducer = offersSlice.reducer;
const { setCity, setSortType, clearSpecificOffer } = offersSlice.actions;

export {
  offersReducer,
  setCity,
  setSortType,
  fetchOffers,
  fetchOfferById,
  clearSpecificOffer
};

