import { MainPage } from '../../pages/main-page/main-page';

type AppProps = {
  rentalOffersCount: number;
};

export function App({ rentalOffersCount }: AppProps): JSX.Element {
  return (
    <MainPage rentalOffersCount={rentalOffersCount}/>
  );
}
