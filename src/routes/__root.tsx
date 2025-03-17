import { Console } from '@/components';
import { canShowConsole } from '@/utils';
import { Navigate, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import logo from '/logo.svg';

export const Route = createRootRoute({
  component: () => (
    <>
      <nav>
        <div className="mx-auto max-w-8xl flex justify-between items-center py-5 px-16">
          <img src={logo} alt="Logo" className="h-8" />
          {canShowConsole() && <Console />}
        </div>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => <Navigate to="/" />,
});
