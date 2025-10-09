import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { REGISTER_PAGE_PATH } from '../Pages/Register/Path';
import { useAuth } from '../Common/Providers/useAuth';

export function ProtectedRoute() {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		return (
			<Navigate
				to={`/${REGISTER_PAGE_PATH}`}
				replace={true}
				state={{
					from: location.pathname,
				}}
			/>
		);
	}

	return <Outlet />;
}
