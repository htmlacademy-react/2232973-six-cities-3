import { describe, it, expect } from 'vitest';
import { offersReducer, setCity, setSortType, clearSpecificOffer, clearNearbyOffers, fetchOffers, fetchOfferById, fetchNearbyOffers, fetchFavourites, toggleFavourite } from './offers-slice';
import { SIX_CITIES } from '@/const';
import { Offer, City } from '@/types/offers';

const mockOffer = (overrides: Partial<Offer> = {}): Offer => ({
  id: '1',
  title: 'Test Offer',
  type: 'apartment',
  city: SIX_CITIES[0],
  location: { latitude: 0, longitude: 0, zoom: 10 },
  isFavorite: false,
  isPremium: false,
  price: 100,
  rating: 4,
  description: '',
  bedrooms: 1,
  goods: [],
  host: { name: 'Host', avatarUrl: '', isPro: false },
  images: [],
  maxAdults: 2,
  previewImage: overrides.previewImage ?? '',
  ...overrides
});

const initialState = {
  city: SIX_CITIES[0],
  offers: [],
  specificOffer: null,
  sortType: 'Popular',
  favourites: [],
  isLoading: false,
  error: null,
  nearbyCards: [],
  isNearbyLoading: false
};

describe('offers-slice', () => {
  it('should return initial state with empty action', () => {
    const result = offersReducer(initialState, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should set city', () => {
    const city: City = SIX_CITIES[1];
    const result = offersReducer(initialState, setCity(city));
    expect(result.city).toEqual(city);
  });

  it('should set sortType', () => {
    const result = offersReducer(initialState, setSortType('Price: high to low'));
    expect(result.sortType).toBe('Price: high to low');
  });

  it('should clear specificOffer', () => {
    const state = { ...initialState, specificOffer: mockOffer() };
    const result = offersReducer(state, clearSpecificOffer());
    expect(result.specificOffer).toBeNull();
  });

  it('should clear nearbyCards', () => {
    const state = { ...initialState, nearbyCards: [mockOffer()] };
    const result = offersReducer(state, clearNearbyOffers());
    expect(result.nearbyCards).toEqual([]);
  });

  it('should set isLoading true on fetchOffers.pending', () => {
    const result = offersReducer(initialState, { type: fetchOffers.pending.type });
    expect(result.isLoading).toBe(true);
  });

  it('should set offers and isLoading false on fetchOffers.fulfilled', () => {
    const offers = [mockOffer({ id: '2' })];
    const result = offersReducer(initialState, { type: fetchOffers.fulfilled.type, payload: offers });
    expect(result.offers).toEqual(offers);
    expect(result.isLoading).toBe(false);
  });

  it('should set error and isLoading false on fetchOffers.rejected', () => {
    const result = offersReducer(initialState, { type: fetchOffers.rejected.type, error: { message: 'fail' } });
    expect(result.isLoading).toBe(false);
    expect(result.error).toBe('fail');
  });

  it('should set specificOffer on fetchOfferById.fulfilled', () => {
    const offer = mockOffer({ id: '3' });
    const result = offersReducer(initialState, { type: fetchOfferById.fulfilled.type, payload: offer });
    expect(result.specificOffer).toEqual(offer);
  });

  it('should set isNearbyLoading true on fetchNearbyOffers.pending', () => {
    const result = offersReducer(initialState, { type: fetchNearbyOffers.pending.type });
    expect(result.isNearbyLoading).toBe(true);
  });

  it('should set nearbyCards and isNearbyLoading false on fetchNearbyOffers.fulfilled', () => {
    const offers = [mockOffer({ id: '4' })];
    const result = offersReducer(initialState, { type: fetchNearbyOffers.fulfilled.type, payload: offers });
    expect(result.nearbyCards).toEqual(offers);
    expect(result.isNearbyLoading).toBe(false);
  });

  it('should set favourites on fetchFavourites.fulfilled', () => {
    const favs = [mockOffer({ id: '5', isFavorite: true })];
    const result = offersReducer(initialState, { type: fetchFavourites.fulfilled.type, payload: favs });
    expect(result.favourites).toEqual(favs);
  });

  it('should clear favourites on fetchFavourites.rejected', () => {
    const state = { ...initialState, favourites: [mockOffer({ id: '6', isFavorite: true })] };
    const result = offersReducer(state, { type: fetchFavourites.rejected.type });
    expect(result.favourites).toEqual([]);
  });

  it('should update isFavorite on toggleFavourite.pending', () => {
    const state = { ...initialState, offers: [mockOffer({ id: '7', isFavorite: false })] };
    const result = offersReducer(state, { type: toggleFavourite.pending.type, meta: { arg: { offerId: '7', status: 1 } } });
    expect(result.offers[0].isFavorite).toBe(true);
  });

  it('should update offer and favourites on toggleFavourite.fulfilled (add)', () => {
    const offer = mockOffer({ id: '8', isFavorite: true });
    const state = { ...initialState, offers: [mockOffer({ id: '8', isFavorite: false })], favourites: [] };
    const result = offersReducer(state, { type: toggleFavourite.fulfilled.type, payload: offer });
    expect(result.offers[0].isFavorite).toBe(true);
    expect(result.favourites).toContainEqual(offer);
  });

  it('should remove from favourites on toggleFavourite.fulfilled (remove)', () => {
    const offer = mockOffer({ id: '9', isFavorite: false });
    const state = { ...initialState, offers: [offer], favourites: [offer] };
    const result = offersReducer(state, { type: toggleFavourite.fulfilled.type, payload: offer });
    expect(result.favourites).not.toContainEqual(offer);
  });

  it('should revert isFavorite on toggleFavourite.rejected', () => {
    const state = { ...initialState, offers: [mockOffer({ id: '10', isFavorite: true })] };
    const result = offersReducer(state, { type: toggleFavourite.rejected.type, meta: { arg: { offerId: '10', status: 0 } } });
    expect(result.offers[0].isFavorite).toBe(true);
  });
});
