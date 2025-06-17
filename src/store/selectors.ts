import { createSelector } from '@reduxjs/toolkit';
import { State } from '@/types/state';

export const selectCity = (state: State) => state.offers.city;
export const selectOffers = (state: State) => state.offers.offers;
export const selectSortType = (state: State) => state.offers.sortType;
export const selectLoadingStatus = (state: State) => state.offers.isLoading;
export const selectErrorStatus = (state: State) => state.offers.error;
export const selectSpecificOffer = (state: State) => state.offers.specificOffer;
export const selectNearbyCards = (state: State) => state.offers.nearbyCards;
export const selectNearbyLoadingStatus = (state: State) => state.offers.isNearbyLoading;
export const selectAuthStatus = (state: State) => state.user.authorizationStatus;
export const selectUser = (state: State) => state.user.user;

export const selectCityOffers = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);

export const selectSortedOffers = createSelector(
  [selectCityOffers, selectSortType],
  (offers, sortType) => {
    switch (sortType) {
      case 'Price: low to high':
        return [...offers].sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return [...offers].sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return [...offers].sort((a, b) => b.rating - a.rating);
      default:
        return offers;
    }
  }
);

export const selectOfferPageData = createSelector(
  [selectSpecificOffer, selectNearbyCards, selectLoadingStatus, selectNearbyLoadingStatus],
  (specificOffer, nearbyOffers, isLoading, isNearbyLoading) => ({
    specificOffer,
    nearbyOffers,
    isLoading,
    isNearbyLoading})
);
