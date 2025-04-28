import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { AppRoute } from '@/const';
import FavouritesPage from '@/pages/favourites-page';
import LoginPage from '@/pages/login-page';
import OfferPage from '@/pages/offer-page';
import MainPage from '@/pages/main-page';
import NotFoundPage from '@/pages/not-found-page';
import PrivateRoute from '@/components/private-route/private-route';
import Layout from '@/components/layout';
import { getAuthorizationStatus } from '@/autharization-status';
import { Offer } from '@/types/offers';

type AppProps = {
  rentalOffersCount: number;
  offers: Offer[];
};

export default function App({ rentalOffersCount, offers }: AppProps): JSX.Element {
  const authorizationStatus = getAuthorizationStatus();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Layout />}
        >
          <Route
            index
            element={
              <MainPage
                rentalOffersCount={rentalOffersCount}
                offers={offers}
              />
            }
          />
          <Route
            path={AppRoute.Login}
            element={(
              <PrivateRoute
                authorizationStatus={authorizationStatus}
                isReverse
              >
                <LoginPage />
              </PrivateRoute>
            )}
          />
          <Route
            path={AppRoute.Favourites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <FavouritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={
              <OfferPage
                offers={offers}
                authorizationStatus={authorizationStatus}
              />
            }
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
