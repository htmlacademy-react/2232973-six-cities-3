import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@/const';
import FavouritesPage from '@/pages/favorites-page';
import LoginPage from '@/pages/login-page';
import OfferPage from '@/pages/offer-page';
import MainPage from '@/pages/main-page';
import NotFoundPage from '@/pages/not-found-page';
import PrivateRoute from '@/components/private-route/private-route';
import Layout from '@/components/layout';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectAuthStatus } from '@/store/selectors';
import { useEffect } from 'react';
import { checkUserStatus } from '@/store/user-slice';
import { fetchFavourites, fetchOffers } from '@/store/offers-slice';
import Loader from '../loader/loader';


export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthStatus);

  useEffect(() => {
    dispatch(checkUserStatus());
    dispatch(fetchOffers());
    dispatch(fetchFavourites());
  }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Loader />;
  }

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
                <FavouritesPage />
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
