import { Console, RequestCity } from '@/components';
import { canShowConsole } from '@/utils';
import { Navigate, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'sonner';
import logo from '/logo.svg';

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 right-0 left-0 z-50 bg-white">
        <div className="max-w-8xl mx-auto flex h-[86px] items-center justify-between px-16">
          <img src={logo} alt="Logo" className="h-8" />
          <div className="flex items-center gap-2">
            <RequestCity />
            {canShowConsole() && <Console />}
          </div>
        </div>
      </header>
      <main className="mt-[86px] flex-1">
        <Outlet />
      </main>
      <Toaster position="bottom-center" />
      <TanStackRouterDevtools />
    </div>
  ),
  notFoundComponent: () => <Navigate to="/" />,
});
