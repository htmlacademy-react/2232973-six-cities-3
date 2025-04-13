import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@/const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  isReverse?: boolean;
  children: JSX.Element;
}

export default function PrivateRoute({authorizationStatus, children, isReverse}: PrivateRouteProps) {
  return (
    authorizationStatus === (isReverse ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth)
      ? children
      : <Navigate to={isReverse ? AppRoute.Root : AppRoute.Login} />
  );
}
