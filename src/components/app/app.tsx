import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { AppRoute } from '../../const';
import { FavouritesPage } from '../../pages/favourites-page/favourites-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { OfferPage } from '../../pages/offer-page/offer-page';
import { MainPage } from '../../pages/main-page/main-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';

type AppProps = {
  rentalOffersCount: number;
};

export function App({ rentalOffersCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage rentalOffersCount={rentalOffersCount} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Favourites}
          element={<FavouritesPage />}
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
