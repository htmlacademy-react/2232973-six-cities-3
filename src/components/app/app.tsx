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

type AppProps = {
  rentalOffersCount: number;
};

export default function App({ rentalOffersCount }: AppProps): JSX.Element {
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
            element={<MainPage rentalOffersCount={rentalOffersCount} />}
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
            element={<OfferPage authorizationStatus={authorizationStatus} />}
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
