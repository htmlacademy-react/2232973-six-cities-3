import { Link, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectAuthStatus, selectFavourites, selectUser } from '@/store/selectors';
import { logoutUser } from '@/store/user-slice';
import { memo } from 'react';

const Header = memo(() => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/login';
  const authorizationStatus = useAppSelector(selectAuthStatus);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const favouritesCount = useAppSelector(selectFavourites).length;

  const handleSignOutClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Root}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {!isLoginPage && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Favourites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      {authorizationStatus === AuthorizationStatus.Auth && user?.avatarUrl && (
                        <img
                          src={user.avatarUrl}
                          alt="User avatar"
                          className="header__avatar user__avatar"
                        />
                      )}
                    </div>
                    {authorizationStatus === AuthorizationStatus.Auth ? (
                      <>
                        <span className="header__user-name user__name">{user?.email}</span>
                        <span className="header__favorite-count">{favouritesCount}</span>
                      </>
                    ) : <span className="header__login">Sign in</span>}
                  </Link>
                </li>
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#" onClick={handleSignOutClick}>
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                ) : null}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
