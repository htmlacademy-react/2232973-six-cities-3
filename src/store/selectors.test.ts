import { describe, it, expect } from 'vitest';
import {
  selectCity,
  selectOffers,
  selectSortType,
  selectLoadingStatus,
  selectErrorStatus,
  selectSpecificOffer,
  selectNearbyCards,
  selectNearbyLoadingStatus,
  selectAuthStatus,
  selectUser,
  selectComments,
  selectReviewSending,
  selectFavourites,
  selectCityOffers,
  selectSortedOffers,
  selectOfferPageData,
  selectSortedComments,
  selectCommentsData
} from './selectors';
import { AuthorizationStatus } from '@/const';

const cityParis = { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } };
const cityLondon = { name: 'London', location: { latitude: 1, longitude: 1, zoom: 10 } };
const offerBase = {
  location: { latitude: 0, longitude: 0, zoom: 10 },
  type: '',
  isPremium: false,
  title: '',
  description: '',
  bedrooms: 1,
  goods: [],
  host: { name: '', avatarUrl: '', isPro: false },
  images: [],
  maxAdults: 2,
  previewImage: '',
};

const mockState = {
  offers: {
    city: cityParis,
    offers: [
      { id: '1', city: cityParis, price: 100, rating: 4, isFavorite: false, ...offerBase },
      { id: '2', city: cityParis, price: 200, rating: 5, isFavorite: true, ...offerBase },
      { id: '3', city: cityLondon, price: 50, rating: 3, isFavorite: false, ...offerBase },
    ],
    specificOffer: { id: '1', city: cityParis, price: 100, rating: 4, isFavorite: false, ...offerBase },
    sortType: 'Popular',
    favorites: [{ id: '2', city: cityParis, isFavorite: true, price: 200, rating: 5, ...offerBase }],
    isLoading: false,
    error: null,
    nearbyCards: [{ id: '4', city: cityParis, isFavorite: false, price: 150, rating: 4, ...offerBase }],
    isNearbyLoading: false,
  },
  user: {
    authorizationStatus: AuthorizationStatus.Auth,
    user: { name: 'User', avatarUrl: '', isPro: false, email: '', token: '' },
    error: null,
  },
  comments: {
    comments: [
      { id: 'c1', date: '2023-01-02', comment: 'B', rating: 4, offerId: '1', user: { name: 'U', avatarUrl: '', isPro: false } },
      { id: 'c2', date: '2023-01-03', comment: 'A', rating: 5, offerId: '1', user: { name: 'U', avatarUrl: '', isPro: false } },
      { id: 'c3', date: '2023-01-01', comment: 'C', rating: 3, offerId: '1', user: { name: 'U', avatarUrl: '', isPro: false } },
    ],
    isSending: true,
  },
};

describe('selectors', () => {
  it('selectCity', () => {
    expect(selectCity(mockState)).toEqual(cityParis);
  });
  it('selectOffers', () => {
    expect(selectOffers(mockState)).toHaveLength(3);
  });
  it('selectSortType', () => {
    expect(selectSortType(mockState)).toBe('Popular');
  });
  it('selectLoadingStatus', () => {
    expect(selectLoadingStatus(mockState)).toBe(false);
  });
  it('selectErrorStatus', () => {
    expect(selectErrorStatus(mockState)).toBeNull();
  });
  it('selectSpecificOffer', () => {
    expect(selectSpecificOffer(mockState)).toEqual({ id: '1', city: cityParis, price: 100, rating: 4, isFavorite: false, ...offerBase });
  });
  it('selectNearbyCards', () => {
    expect(selectNearbyCards(mockState)).toHaveLength(1);
  });
  it('selectNearbyLoadingStatus', () => {
    expect(selectNearbyLoadingStatus(mockState)).toBe(false);
  });
  it('selectAuthStatus', () => {
    expect(selectAuthStatus(mockState)).toBe(AuthorizationStatus.Auth);
  });
  it('selectUser', () => {
    expect(selectUser(mockState)).toEqual({ name: 'User', avatarUrl: '', isPro: false, email: '', token: '' });
  });
  it('selectComments', () => {
    expect(selectComments(mockState)).toHaveLength(3);
  });
  it('selectReviewSending', () => {
    expect(selectReviewSending(mockState)).toBe(true);
  });
  it('selectFavourites', () => {
    expect(selectFavourites(mockState)).toHaveLength(1);
  });
  it('selectCityOffers', () => {
    const result = selectCityOffers(mockState);
    expect(result).toHaveLength(2);
    expect(result.every((o) => o.city.name === 'Paris')).toBe(true);
  });
  it('selectSortedOffers (Popular)', () => {
    const result = selectSortedOffers(mockState);
    expect(result).toHaveLength(2);
  });
  it('selectSortedOffers (Price: low to high)', () => {
    const state = { ...mockState, offers: { ...mockState.offers, sortType: 'Price: low to high' } };
    const result = selectSortedOffers(state);
    expect(result[0].price).toBeLessThanOrEqual(result[1].price);
  });
  it('selectSortedOffers (Price: high to low)', () => {
    const state = { ...mockState, offers: { ...mockState.offers, sortType: 'Price: high to low' } };
    const result = selectSortedOffers(state);
    expect(result[0].price).toBeGreaterThanOrEqual(result[1].price);
  });
  it('selectSortedOffers (Top rated first)', () => {
    const state = { ...mockState, offers: { ...mockState.offers, sortType: 'Top rated first' } };
    const result = selectSortedOffers(state);
    expect(result[0].rating).toBeGreaterThanOrEqual(result[1].rating);
  });
  it('selectOfferPageData', () => {
    const result = selectOfferPageData(mockState);
    expect(result).toHaveProperty('specificOffer');
    expect(result).toHaveProperty('nearbyOffers');
    expect(result).toHaveProperty('isLoading');
    expect(result).toHaveProperty('isNearbyLoading');
  });
  it('selectSortedComments', () => {
    const result = selectSortedComments(mockState);
    expect(result[0].date >= result[1].date).toBe(true);
    expect(result[1].date >= result[2].date).toBe(true);
  });
  it('selectCommentsData', () => {
    const result = selectCommentsData(mockState);
    expect(result).toHaveProperty('comments');
    expect(result).toHaveProperty('isSending');
    expect(result.comments).toHaveLength(3);
    expect(result.isSending).toBe(true);
  });
});
