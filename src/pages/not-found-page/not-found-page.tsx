import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';

export function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index page__main--index-empty">
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper">
                <b className="cities__status">404. Page not found</b>
                <p className="cities__status-description">
                  The page you&apos;re looking for doesn&apos;t exist.
                  <br />
                  <Link to="/" style={{ color: '#4481c3' }}>Go to main page</Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
