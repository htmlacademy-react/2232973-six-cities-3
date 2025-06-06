import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { Provider } from 'react-redux';
import { mockOffers } from './mocks/offers';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offers = {mockOffers}
      />
    </Provider>
  </React.StrictMode>
);
