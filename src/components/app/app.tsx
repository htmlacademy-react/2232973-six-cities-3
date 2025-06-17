import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@/const';
import FavouritesPage from '@/pages/favourites-page';
import LoginPage from '@/pages/login-page';
import OfferPage from '@/pages/offer-page';
import MainPage from '@/pages/main-page';
import NotFoundPage from '@/pages/not-found-page';
import PrivateRoute from '@/components/private-route/private-route';
import Layout from '@/components/layout';
import { Offer } from '@/types/offers';
import { useAppSelector } from '@/hooks';
import { selectAuthStatus } from '@/store/selectors';

type AppProps = {
  offers: Offer[];
};

export default function App({ offers }: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthStatus);

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
              <MainPage />
            }
          />
          <Route
            path={AppRoute.Login}
            element={(
              <PrivateRoute
                condition={authorizationStatus === AuthorizationStatus.NoAuth}
                navigateTo={AppRoute.Root}
              >
                <LoginPage />
              </PrivateRoute>
            )}
          />
          <Route
            path={AppRoute.Favourites}
            element={
              <PrivateRoute
                condition={authorizationStatus === AuthorizationStatus.Auth}
                navigateTo={AppRoute.Login}
              >
                <FavouritesPage
                  offers={offers}
                />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={
              <OfferPage />
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
