import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { Setting } from './const';
import { mockOffers } from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      rentalOffersCount = {Setting.RentalOffersCount}
      offers = {mockOffers}
    />
  </React.StrictMode>
);
