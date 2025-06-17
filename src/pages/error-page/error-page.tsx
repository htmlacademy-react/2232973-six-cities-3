import { Link } from 'react-router-dom';

function ErrorPage(): JSX.Element {
  return (
    <main className="page__main page__main--index page__main--index-empty">
      <div className="cities__places-container cities__places-container--empty container">
        <div className="cities__status-wrapper tabs__content">
          <h1 className="cities__status">Fetch data error, try again later</h1>
          <Link className="cities__status-description" to="/" style={{ color: '#4481c3' }}>
            Back to main page
          </Link>
        </div>
      </div>
    </main>
  );
}

export { ErrorPage };
