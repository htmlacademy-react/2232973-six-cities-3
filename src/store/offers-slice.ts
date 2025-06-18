import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiRoute, SIX_CITIES } from '@/const';
import { City, Offer } from '@/types/offers';
import { AxiosInstance } from 'axios';

type OffersState = {
  city: City;
  offers: Offer[];
  specificOffer: Offer | null;
  sortType: string;
  favourites: Offer[];
  isLoading: boolean;
  error: string | null;
  nearbyCards: Offer[];
  isNearbyLoading: boolean;
};

const initialState: OffersState = {
  city: SIX_CITIES[0],
  offers: [] as Offer[],
  specificOffer: null,
  sortType: 'Popular',
  favourites: [] as Offer[],
  isLoading: false,
  error: null,
  nearbyCards: [] as Offer[],
  isNearbyLoading: false
};

const fetchOffers = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance }>(
  'offers/fetchOffers',
  async(_, { extra: api}) => {
    const {data} = await api.get<Offer[]>(ApiRoute.Offers);
    return data;
  }
);

const fetchOfferById = createAsyncThunk<Offer, string, { extra: AxiosInstance }>(
  'offers/fetchById',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer>(`${ApiRoute.Offers}/${offerId}`);
    return data;
  }
);

const fetchNearbyOffers = createAsyncThunk<Offer[], string, { extra: AxiosInstance }>(
  'offers/fetchNearby',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`${ApiRoute.Offers}/${offerId}/nearby`);
    return data;
  }
);

const fetchFavourites = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance}>(
  'offers/fetchFavorites',
  async (_, { extra: api }) => {
    const { data } = await api.get<Offer[]>(ApiRoute.Favourites);
    return data;
  }
);

const toggleFavourite = createAsyncThunk<Offer, { offerId: string; status: number }, { extra: AxiosInstance }>(
  'offers/toggleFavorite',
  async ({ offerId, status }, { extra: api }) => {
    const { data } = await api.post<Offer>(`${ApiRoute.Favourites}/${offerId}/${status}`);
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
    },
    clearNearbyOffers: (state) => {
      state.nearbyCards = [];
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
      })
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.isNearbyLoading = true;
        state.error = null;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.isNearbyLoading = false;
        state.nearbyCards = action.payload;
      })
      .addCase(fetchNearbyOffers.rejected, (state, action) => {
        state.isNearbyLoading = false;
        state.error = action.error.message || 'Failed to load offers';
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.favourites = action.payload;
      })
      .addCase(fetchFavourites.rejected, (state) => {
        state.favourites = [];
      })
      .addCase(toggleFavourite.pending, (state, action) => {
        const { offerId, status } = action.meta.arg;
        const card = state.offers.find((item) => item.id === offerId);
        if (card) {
          card.isFavorite = status === 1;
        }
      })
      .addCase(toggleFavourite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const card = state.offers.find((item) => item.id === updatedOffer.id);
        if (card) {
          Object.assign(card, updatedOffer);
        }
        if (state.specificOffer?.id === updatedOffer.id) {
          Object.assign(state.specificOffer, updatedOffer);
        }
        if (updatedOffer.isFavorite) {
          state.favourites.push(updatedOffer);
        } else {
          state.favourites = state.favourites.filter(
            (item) => item.id !== updatedOffer.id
          );
        }
      })
      .addCase(toggleFavourite.rejected, (state, action) => {
        const { offerId, status } = action.meta.arg;
        const card = state.offers.find((item) => item.id === offerId);
        if (card) {
          card.isFavorite = status === 0;
        }
      });
  }
});

const offersReducer = offersSlice.reducer;
const { setCity, setSortType, clearSpecificOffer, clearNearbyOffers } = offersSlice.actions;

export {
  offersReducer,
  setCity,
  setSortType,
  fetchOffers,
  fetchOfferById,
  clearSpecificOffer,
  fetchNearbyOffers,
  clearNearbyOffers,
  toggleFavourite,
  fetchFavourites
};

