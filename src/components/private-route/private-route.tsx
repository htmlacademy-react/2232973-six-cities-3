import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  condition: boolean;
  navigateTo: string;
  children: JSX.Element;
}

export default function PrivateRoute({ condition, children, navigateTo }: PrivateRouteProps) {

  return (
    condition ? children : <Navigate to={navigateTo} />
  );
}
