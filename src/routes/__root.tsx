import { Console, RequestCity } from '@/components';
import { canShowConsole } from '@/utils';
import { Navigate, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import logo from '/logo.svg';

export const Route = createRootRoute({
  component: () => (
    <>
      <nav>
        <div className="max-w-8xl mx-auto flex items-center justify-between px-16 py-5">
          <img src={logo} alt="Logo" className="h-8" />
          <div className="flex items-center gap-2">
            <RequestCity />
            {canShowConsole() && <Console />}
          </div>
        </div>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => <Navigate to="/" />,
});
