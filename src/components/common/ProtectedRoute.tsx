import { Navigate, Outlet } from 'react-router-dom';
import { useGetMeQuery } from '../../app/api';
import {
    selectCurrentRole,
    selectIsLoggedIn,
    type UserRole,
} from '../../app/authSlice';
import { useAppSelector } from '../../app/hooks';
import { Spinner } from '../ui/Spinner';

interface ProtectedRouteProps {
  /** Roles allowed to access this route. Omit to allow any authenticated user. */
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const role       = useAppSelector(selectCurrentRole);

  // Hydrate user from /auth/me if we have a token but no user in state yet
  const { isLoading } = useGetMeQuery(undefined, { skip: !isLoggedIn || !!role });

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-secondary-50">
        <Spinner size="xl" />
      </div>
    );
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // Logged in but wrong role — send back to dashboard root
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
