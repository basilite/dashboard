// AppRouter.jsx

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// pages
import OverviewPage from '../pages/Overview';
import LoginPage from '../pages/Login';
import NotFoundPage from '../pages/NotFound';
import SettingsPage from '../pages/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <OverviewPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

