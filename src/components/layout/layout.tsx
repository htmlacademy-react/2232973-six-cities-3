import { Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '@/const';
import { getLayoutState } from './utils';
import { memo } from 'react';
import Header from '../header/header';

export const Layout = memo((): JSX.Element => {
  const { pathname } = useLocation();
  const { rootClassName, shouldRenderFooter } = getLayoutState(pathname as AppRoute);

  return (
    <div className={`page${rootClassName}`}>
      <Header />
      <Outlet />
      {shouldRenderFooter ? (
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </a>
        </footer>
      ) : null}
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;
